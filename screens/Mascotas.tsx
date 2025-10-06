import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MisMascotas({ navigation }: any) {
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);

  const titleScale = useRef(new Animated.Value(0)).current;
  const cardColors = ["#e87170", "#f49953", "#9d7bb6", "#00BFFF", "#FFA500"];

  useEffect(() => {
    loadUsuario();
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true }).start();
  }, []);

  const loadUsuario = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsuario(user);
        fetchMascotas(user._id);
      } else {
        console.warn("⚠️ No se encontró usuario en AsyncStorage");
        setLoading(false);
      }
    } catch (error) {
      console.error("❌ Error cargando usuario:", error);
      setLoading(false);
    }
  };

  const fetchMascotas = async (usuarioId: string) => {
    try {
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/mascotas/usuario/${usuarioId}`
      );
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("❌ Error cargando mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: any) => {
    const bgColor = cardColors[index % cardColors.length];
    const fotoUrl = item.fotoPerfilId
      ? `https://backendmaguey.onrender.com/api/mascotas/foto/${item.fotoPerfilId}`
      : "https://via.placeholder.com/300x200.png?text=Sin+Foto";

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre || "Sin nombre"}</Text>
          <Text style={styles.texto}>Especie: {item.especie}</Text>
          <Text style={styles.texto}>Raza: {item.raza || "N/D"}</Text>
          <Text style={styles.texto}>Sexo: {item.sexo}</Text>

          {/* 🔹 Botón "Más información" */}
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() =>
              navigation.navigate("HistorialMedicoMascota", {
                mascotaId: item._id,
              })
            }
          >
            <Text style={styles.infoButtonText}>Más información</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 50 }} />
    );

  return (
    <View style={styles.container}>
      {usuario && <Text style={styles.title}>Mis Mascotas</Text>}

      {mascotas.length === 0 ? (
        <Text style={styles.empty}>No tienes mascotas registradas</Text>
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CrearMascota")}
      >
        <FontAwesome5 name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    color: "#333",
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: { width: "100%", height: 180, borderRadius: 10, marginBottom: 10 },
  info: { paddingHorizontal: 5 },
  nombre: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  texto: { fontSize: 14, color: "#fff" },
  empty: { fontSize: 18, color: "#666", textAlign: "center", marginTop: 50 },
  infoButton: {
    marginTop: 10,
    backgroundColor: "#ffffffaa",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  infoButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#28a745",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
