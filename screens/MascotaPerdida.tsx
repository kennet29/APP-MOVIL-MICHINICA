// screens/MascotasPerdidas.tsx
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
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; // ✅ import normal

interface JwtPayload {
  id: string;   // ⚠️ tu backend puede devolver "id", "_id" o "userId"
  email: string;
  exp?: number;
}

export default function MascotasPerdidas({ navigation }: any) {
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // Animación del título
  const titleScale = useRef(new Animated.Value(0)).current;
  const cardColors = ["#e87170", "#f49953", "#9d7bb6", "#00BFFF", "#FFA500"];
  const titleLetters = [
    { letter: "Z", color: cardColors[0] },
    { letter: "O", color: cardColors[1] },
    { letter: "O", color: cardColors[2] },
    { letter: "N", color: cardColors[3] },
    { letter: "I", color: cardColors[4] },
    { letter: "C", color: "#9d7bb6" },
    { letter: "A", color: "#00BFFF" },
  ];

  useEffect(() => {
    obtenerUsuario();
    fetchMascotas();
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true }).start();
  }, []);

  // 👉 Decodificar token
  const obtenerUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // 👇 Workaround: usar as any para evitar error de TS
        const decoded = (jwt_decode as any)(token) as JwtPayload;
        setUsuarioId(decoded.id); // ⚠️ ajusta si tu backend usa "_id" o "userId"
        console.log("👤 Usuario logueado:", decoded);
      }
    } catch (error) {
      console.error("❌ Error obteniendo usuario:", error);
    }
  };

  // 👉 Obtener mascotas perdidas
  const fetchMascotas = async () => {
    try {
      const res = await fetch("https://backendmaguey.onrender.com/api/mascotas-perdidas");
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("❌ Error cargando mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Marcar mascota como encontrada
  const marcarEncontrada = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/mascotas-perdidas/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ encontrada: true }),
        }
      );

      if (res.ok) {
        Alert.alert("✅ Éxito", "La mascota ha sido marcada como encontrada");
        fetchMascotas();
      } else {
        const err = await res.json();
        Alert.alert("❌ Error", err.message || "No se pudo actualizar la mascota");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  // 👉 Render de cada card
  const renderItem = ({ item, index }: any) => {
    const bgColor = cardColors[index % cardColors.length];
    const fotoUrl = item.fotos?.length
      ? `https://backendmaguey.onrender.com/api/mascotas-perdidas/foto/${item.fotos[0]}`
      : "https://via.placeholder.com/300x200.png?text=Sin+Foto";

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre || "Sin nombre"}</Text>
          <Text style={styles.texto}>{item.descripcion}</Text>
          <Text style={styles.texto}>📍 {item.lugarPerdida}</Text>
          <Text style={styles.texto}>
            📅 {new Date(item.fechaPerdida).toLocaleDateString()}
          </Text>
          <Text style={styles.texto}>📞 {item.contacto?.telefono || "No disponible"}</Text>
          <Text style={styles.texto}>📧 {item.contacto?.email || "No disponible"}</Text>

          {/* 👇 Botón solo si el dueño es el usuario actual */}
          {usuarioId === item.usuarioId && !item.encontrada && (
            <TouchableOpacity
              style={styles.btnEncontrada}
              onPress={() => marcarEncontrada(item._id)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Marcar Encontrada
              </Text>
            </TouchableOpacity>
          )}

          {/* ✅ Mostrar si ya fue encontrada */}
          {item.encontrada && (
            <Text style={{ marginTop: 5, color: "#00ffcc", fontWeight: "bold" }}>
              ✅ Encontrada
            </Text>
          )}
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
      {/* Título ZooNica animado */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        {titleLetters.map((item, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.titleZoo,
              { color: item.color, transform: [{ scale: titleScale }] },
            ]}
          >
            {item.letter}
          </Animated.Text>
        ))}
      </View>

      <FlatList
        data={mascotas}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botón flotante para nueva mascota perdida */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CrearMascotaPerdida")}
      >
        <FontAwesome5 name="dog" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// 👉 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  titleZoo: { fontSize: 36, fontWeight: "bold", marginBottom: 10 },
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
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#1DB954",
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
  btnEncontrada: {
    marginTop: 10,
    backgroundColor: "#1DB954",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
});
