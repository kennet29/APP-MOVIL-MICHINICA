import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomMenu from "./Menu";
import ZoonicaTitle from "./Titulo";

interface Mascota {
  nombre: string;
}

interface Notificacion {
  _id: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
  mascotaId?: Mascota;
}

export default function Notificaciones() {
  const API_BASE = "https://backendmaguey.onrender.com/api/notificaciones";

  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // 🔹 Estado inicial ya trae la notificación de prueba
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      _id: "demo-peces",
      mensaje: "Hora de alimentar a tus peces 🐟",
      leida: false,
      createdAt: new Date().toISOString(),
      mascotaId: { nombre: "Peces" },
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [soloPendientes, setSoloPendientes] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  >("Notificaciones");

  // 🔹 Cargar usuario desde AsyncStorage
  useEffect(() => {
    const loadUsuario = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem("usuario");
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          setUsuarioId(usuario._id);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };
    loadUsuario();
  }, []);

  const fetchNotificaciones = async () => {
    if (!usuarioId) return;
    setLoading(true);
    try {
      const url = soloPendientes
        ? `${API_BASE}/${usuarioId}/pendientes`
        : `${API_BASE}/${usuarioId}`;

      const res = await fetch(url);
      const data = await res.json();

      // 🔹 Agregamos la demo al inicio de la lista, sin tocar el backend
      setNotificaciones((prev) => [
        {
          _id: "demo-peces",
          mensaje: "Hora de alimentar a tus peces 🐟",
          leida: false,
          createdAt: new Date().toISOString(),
          mascotaId: { nombre: "Peces" },
        },
        ...data,
      ]);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      fetchNotificaciones();
    }
  }, [soloPendientes, usuarioId]);

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado con Zoonica */}
      <View style={styles.header}>
        <ZoonicaTitle size={40} />
      </View>

      {/* Botón de filtro */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setSoloPendientes(!soloPendientes)}
      >
        <Text style={styles.filterText}>
          {soloPendientes ? "Ver todas" : "Ver solo pendientes"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: item.leida
                    ? "#ecf0f1"
                    : colors[index % colors.length] + "33",
                  borderLeftWidth: 6,
                  borderLeftColor: item.leida
                    ? "#7f8c8d"
                    : colors[index % colors.length],
                },
              ]}
            >
              <View>
                <Text style={styles.mensaje}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.mascotaId?.nombre || "General"}:{" "}
                  </Text>
                  {item.mensaje}
                </Text>
                <Text style={styles.fecha}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Menú inferior centrado */}
      <View style={styles.menuContainer}>
        <BottomMenu activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </View>
  );
}

const colors = [
  "#1DB954",
  "#329bd7",
  "#F39C12",
  "#E74C3C",
  "#8E44AD",
  "#16A085",
  "#D35400",
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { alignItems: "center", marginBottom: 15 },
  filterButton: {
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  filterText: { color: "#fff", fontWeight: "bold" },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  mensaje: { fontSize: 16, marginBottom: 5 },
  fecha: { fontSize: 12, color: "#666" },
  menuContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
