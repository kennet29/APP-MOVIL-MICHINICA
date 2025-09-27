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

export default function MisMascotas({ navigation }: any) {
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      const usuarioId = "66f5a53a6b8f59e71cc12345"; // ⚠️ reemplazar por dinámico
      const res = await fetch(`https://backendmaguey.onrender.com/api/mascotas/usuario/${usuarioId}`);
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

    console.log("📷 Foto URL:", fotoUrl);

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre || "Sin nombre"}</Text>
          <Text style={styles.texto}>Especie: {item.especie}</Text>
          <Text style={styles.texto}>Raza: {item.raza || "N/D"}</Text>
          <Text style={styles.texto}>Sexo: {item.sexo}</Text>
        </View>
      </View>
    );
  };

  if (loading)
    return <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("CrearMascota")}>
        <FontAwesome5 name="plus" size={24} color="#fff" />
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
  empty: { fontSize: 18, color: "#666", textAlign: "center", marginTop: 50 },
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
