import React, { useEffect, useState, useCallback } from "react";
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
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      _id: "demo1",
      mensaje: "Hora de alimentar a tus mascotas",
      leida: false,
      createdAt: new Date().toISOString(),
      mascotaId: { nombre: "Recordatorio" },
    },  {
      _id: "demo2",
      mensaje: "Hora de pasear a tus mascotas",
      leida: false,
      createdAt: new Date().toISOString(),
      mascotaId: { nombre: "Recordatorio" },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [soloPendientes, setSoloPendientes] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "MisMascotas" | "MisionVision" | "Notificaciones"
  >("Notificaciones");

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

  const fetchNotificaciones = useCallback(async () => {
    if (!usuarioId) return;
    setLoading(true);
    try {
      const url = soloPendientes
        ? `${API_BASE}/${usuarioId}/pendientes`
        : `${API_BASE}/${usuarioId}`;

      const res = await fetch(url);
      const data = await res.json();

      setNotificaciones([
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
  }, [usuarioId, soloPendientes]);

  useEffect(() => {
    if (usuarioId) fetchNotificaciones();
  }, [fetchNotificaciones, usuarioId]);

  // 🔹 Render de cada notificación
  const renderItem = ({ item, index }: { item: Notificacion; index: number }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: item.leida
            ? "#f5f6fa"
            : colors[index % colors.length] + "22",
          borderLeftColor: item.leida
            ? "#7f8c8d"
            : colors[index % colors.length],
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.mensaje}>
          <Text style={{ fontWeight: "bold" }}>
            {item.mascotaId?.nombre || "General"}:{" "}
          </Text>
          {item.mensaje}
        </Text>

        <Text style={styles.fecha}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>

        {/* 🔘 Botón individual para marcar como leída */}
        {!item.leida && (
          <TouchableOpacity
            style={styles.markButton}
            onPress={async () => {
              try {
                const res = await fetch(`${API_BASE}/${item._id}/leida`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                });

                if (res.ok) {
                  setNotificaciones((prev) =>
                    prev.map((n) =>
                      n._id === item._id ? { ...n, leida: true } : n
                    )
                  );
                }
              } catch (error) {
                console.error("Error al marcar notificación como leída:", error);
              }
            }}
          >
            <Text style={styles.markButtonText}>Marcar leída</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado */}
      <View style={styles.header}>
        <ZoonicaTitle size={42} />
      </View>

      {/* 🔹 Botón de filtro */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setSoloPendientes(!soloPendientes)}
      >
        <Text style={styles.filterText}>
          {soloPendientes ? "Ver todas" : "Ver solo pendientes"}
        </Text>
      </TouchableOpacity>

      {/* 🔹 Lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 5 }}
        />
      )}

      {/* 🔹 Menú inferior */}
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
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: { alignItems: "center", marginVertical: 10 },
  filterButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  filterText: { color: "#fff", fontWeight: "bold" },
  card: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 18,
    borderLeftWidth: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  mensaje: { fontSize: 16, color: "#2c3e50", marginBottom: 6 },
  fecha: { fontSize: 12, color: "#7f8c8d" },
  markButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  markButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  menuContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
