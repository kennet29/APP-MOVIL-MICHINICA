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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MascotasPerdidas({ navigation }: any) {
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Animación título
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
    fetchMascotas();
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true }).start();
  }, []);

  const fetchMascotas = async () => {
    try {
      const res = await fetch("https://backendmaguey.onrender.com/api/mascotas-perdidas");

      // Verificar tipo de respuesta
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setMascotas(data);
      } else {
        const text = await res.text();
        console.error("❌ Respuesta no JSON:", text);
      }
    } catch (error) {
      console.error("❌ Error cargando mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.texto}>📞 {item.contacto?.telefono}</Text>
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
      {/* ZooNica */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        {titleLetters.map((item, index) => (
          <Animated.Text
            key={index}
            style={[styles.titleZoo, { color: item.color, transform: [{ scale: titleScale }] }]}
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

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CrearMascotaPerdida")}
      >
        <FontAwesome5 name="dog" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

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
});
