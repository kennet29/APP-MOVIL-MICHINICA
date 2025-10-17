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

export default function Adopciones({ navigation }: any) {
  const [adopciones, setAdopciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [mostrandoMisAdopciones, setMostrandoMisAdopciones] = useState(false);

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
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (usuarioId) fetchAdopciones();
  }, [usuarioId, mostrandoMisAdopciones]);

  const obtenerUsuario = async () => {
    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        setUsuarioId(usuario._id);
      }
    } catch (error) {
      console.error("❌ Error al obtener usuario:", error);
    }
  };

  const fetchAdopciones = async () => {
    try {
      setLoading(true);
      const url = mostrandoMisAdopciones
        ? `https://backendmaguey.onrender.com/api/adopciones/usuario/${usuarioId}`
        : `https://backendmaguey.onrender.com/api/adopciones`;

      const res = await fetch(url);
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setAdopciones(Array.isArray(data) ? data : []);
      } catch {
        console.warn("⚠️ El backend no devolvió JSON válido.");
        setAdopciones([]);
      }
    } catch (error) {
      console.error("❌ Error al obtener adopciones:", error);
      setAdopciones([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMisAdopciones = () => {
    setMostrandoMisAdopciones(!mostrandoMisAdopciones);
  };

  // 🟢 Marcar como adoptada
  const marcarComoAdoptado = async (id: string) => {
    Alert.alert("Confirmar", "¿Deseas marcar esta mascota como adoptada?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, marcar",
        onPress: async () => {
          try {
            const res = await fetch(
              `https://backendmaguey.onrender.com/api/adopciones/${id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: "aprobada" }),
              }
            );
            const data = await res.json();
            if (res.ok) {
              Alert.alert("🎉 Listo", "Mascota marcada como adoptada.");
              fetchAdopciones();
            } else {
              Alert.alert("Error", data.message || "No se pudo actualizar.");
            }
          } catch (error) {
            console.error("❌ Error al marcar adopción:", error);
            Alert.alert("Error", "No se pudo conectar al servidor.");
          }
        },
      },
    ]);
  };

  // ❌ Eliminar adopción
  const eliminarAdopcion = async (id: string) => {
    Alert.alert("Eliminar", "¿Deseas eliminar esta adopción?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(
              `https://backendmaguey.onrender.com/api/adopciones/${id}`,
              { method: "DELETE" }
            );
            const data = await res.json();
            if (res.ok) {
              Alert.alert("🗑️ Eliminada", "La adopción fue eliminada correctamente.");
              fetchAdopciones();
            } else {
              Alert.alert("Error", data.message || "No se pudo eliminar.");
            }
          } catch (error) {
            console.error("❌ Error al eliminar adopción:", error);
            Alert.alert("Error", "No se pudo conectar al servidor.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item, index }: any) => {
    const bgColor = cardColors[index % cardColors.length];
    const fotoUrl =
      item.fotosIds && item.fotosIds.length > 0
        ? `https://backendmaguey.onrender.com/api/adopciones/imagen/${item.fotosIds[0]}`
        : "https://via.placeholder.com/300x200.png?text=Sin+Foto";

    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.texto}>
            🐾 {item.especie?.toUpperCase()} - {item.sexo}
          </Text>
          <Text style={styles.texto}>📅 Edad: {item.edad || "Desconocida"}</Text>
          <Text style={styles.texto}>📞 {item.telefono}</Text>
          <Text style={styles.texto}>📧 {item.correo || "No especificado"}</Text>
          <Text style={styles.texto}>📖 {item.descripcion || "Sin descripción"}</Text>
          <Text
            style={{
              marginTop: 5,
              color: item.estado === "aprobada" ? "#00FF99" : "#FFD700",
              fontWeight: "bold",
            }}
          >
            Estado: {item.estado.toUpperCase()}
          </Text>

          {usuarioId === item.usuarioId && (
            <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
              {item.estado === "pendiente" && (
                <TouchableOpacity
                  style={[styles.btnAccion, { backgroundColor: "#1DB954" }]}
                  onPress={() => marcarComoAdoptado(item._id)}
                >
                  <FontAwesome5 name="check" size={16} color="#fff" />
                  <Text style={styles.btnTexto}>Adoptado</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.btnAccion, { backgroundColor: "#e74c3c" }]}
                onPress={() => eliminarAdopcion(item._id)}
              >
                <FontAwesome5 name="trash" size={16} color="#fff" />
                <Text style={styles.btnTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
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
            style={[
              styles.titleZoo,
              { color: item.color, transform: [{ scale: titleScale }] },
            ]}
          >
            {item.letter}
          </Animated.Text>
        ))}
      </View>

      <TouchableOpacity style={styles.filtroBtn} onPress={toggleMisAdopciones}>
        <FontAwesome5
          name={mostrandoMisAdopciones ? "users" : "user"}
          size={18}
          color="#fff"
        />
        <Text style={styles.filtroTexto}>
          {mostrandoMisAdopciones ? "Ver todas" : "Ver mis adopciones"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={adopciones}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CrearAdopcion")}
      >
        <FontAwesome5 name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos
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
  image: { width: "100%", height: 300, borderRadius: 10, marginBottom: 10 },
  info: { paddingHorizontal: 5 },
  nombre: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  texto: { fontSize: 14, color: "#fff" },
  btnAccion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btnTexto: { color: "#fff", marginLeft: 6, fontWeight: "bold" },
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
  filtroBtn: {
    flexDirection: "row",
    backgroundColor: "#9d7bb6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  filtroTexto: { color: "#fff", marginLeft: 8, fontWeight: "bold" },
});
