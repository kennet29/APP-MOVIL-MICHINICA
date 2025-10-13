import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import ZoonicaTitle from "../screens/Titulo";

const { width } = Dimensions.get("window");

type Usuario = {
  username?: string;
  email?: string;
  _id?: string;
};

type Comentario = {
  comentario: string;
  usuarioId: Usuario;
  fecha?: string;
};

type Publicacion = {
  _id: string;
  contenido?: string;
  imagenes?: string[];
  usuarioId?: Usuario;
  likes?: string[];
  comentarios?: Comentario[];
  fecha?: string;
};

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [comentariosVisibles, setComentariosVisibles] = useState<string | null>(null);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    obtenerUsuario();
    cargarPublicaciones();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUsuarioId(parsed._id);
      }
    } catch (error) {
      console.error("❌ Error al obtener usuario:", error);
    }
  };

  const cargarPublicaciones = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://backendmaguey.onrender.com/api/publicaciones");
      const data = await res.json();
      setPublicaciones(data);
    } catch (error) {
      console.error("❌ Error al obtener publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarPublicaciones();
    setRefreshing(false);
  };

  // ❤️ Like / Unlike
  const handleLike = async (id: string) => {
    if (!usuarioId) {
      Alert.alert("Inicia sesión", "Debes iniciar sesión para dar like.");
      return;
    }
    try {
      const payload = { usuarioId };
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/publicaciones/${id}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        setPublicaciones((prev) =>
          prev.map((p) => {
            if (p._id === id) {
              const yaDioLike = p.likes?.map(String).includes(String(usuarioId));
              return {
                ...p,
                likes: yaDioLike
                  ? p.likes?.filter((uid) => String(uid) !== String(usuarioId))
                  : [...(p.likes || []), String(usuarioId)],
              };
            }
            return p;
          })
        );
      }
    } catch (error) {
      console.error("❌ Error al dar like:", error);
    }
  };

  // 💬 Mostrar / Ocultar comentarios
  const toggleComentarios = (id: string) => {
    setComentariosVisibles((prev) => (prev === id ? null : id));
  };

  // 📝 Enviar nuevo comentario
  const enviarComentario = async (pubId: string) => {
    if (!usuarioId || nuevoComentario.trim() === "") return;
    try {
      const payload = { usuarioId, comentario: nuevoComentario };
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/publicaciones/${pubId}/comentarios`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        setNuevoComentario("");
        await cargarPublicaciones();
      }
    } catch (error) {
      console.error("❌ Error al enviar comentario:", error);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text style={{ color: "#555", marginTop: 10 }}>Cargando publicaciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ZoonicaTitle size={42} />
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {publicaciones.length === 0 ? (
          <Text style={styles.noPosts}>No hay publicaciones todavía 🐾</Text>
        ) : (
          publicaciones.map((pub) => (
            <View key={pub._id} style={styles.postContainer}>
              <View style={styles.header}>
                <FontAwesome5 name="user-circle" size={35} color="#444" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.username}>
                    {pub.usuarioId?.username || "Usuario desconocido"}
                  </Text>
                  <Text style={styles.date}>
                    {pub.fecha ? new Date(pub.fecha).toLocaleDateString() : ""}
                  </Text>
                </View>
              </View>

              {pub.imagenes && pub.imagenes.length > 0 ? (
                <Image
                  source={{
                    uri: `https://backendmaguey.onrender.com/api/publicaciones/foto/${pub.imagenes[0]}`,
                  }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.placeholderImage}>
                  <FontAwesome5 name="image" size={40} color="#ccc" />
                  <Text style={styles.placeholderText}>Sin imagen</Text>
                </View>
              )}

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(pub._id)}>
                  <FontAwesome5
                    name="heart"
                    size={22}
                    color={
                      pub.likes?.map(String).includes(String(usuarioId))
                        ? "#e74c3c"
                        : "#aaa"
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleComentarios(pub._id)}
                >
                  <FontAwesome5 name="comment" size={22} color="#555" />
                </TouchableOpacity>
              </View>

              <Text style={styles.likesText}>
                {pub.likes?.length || 0} {pub.likes?.length === 1 ? "like" : "likes"}
              </Text>

              {pub.contenido && (
                <Text style={styles.caption}>
                  <Text style={{ fontFamily: "Poppins_Bold" }}>
                    {pub.usuarioId?.username || "Usuario"}:{" "}
                  </Text>
                  {pub.contenido}
                </Text>
              )}

              {/* 🔽 Sección de comentarios visible */}
              {comentariosVisibles === pub._id && (
                <View style={styles.commentSection}>
                  {pub.comentarios && pub.comentarios.length > 0 ? (
                    pub.comentarios.map((c, i) => (
                      <Text key={i} style={styles.commentText}>
                        <Text style={{ fontFamily: "Poppins_Bold" }}>
                          {c.usuarioId?.username || "Anon"}:{" "}
                        </Text>
                        {c.comentario}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.noComments}>No hay comentarios aún</Text>
                  )}

                  {usuarioId && (
                    <View style={styles.commentInputRow}>
                      <TextInput
                        placeholder="Escribe un comentario..."
                        style={styles.commentInput}
                        value={nuevoComentario}
                        onChangeText={setNuevoComentario}
                      />
                      <TouchableOpacity onPress={() => enviarComentario(pub._id)}>
                        <FontAwesome5 name="paper-plane" size={20} color="#329bd7" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  titleContainer: { marginTop: 25, alignItems: "center" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  noPosts: { textAlign: "center", marginTop: 40, fontFamily: "Poppins_Regular", color: "#777" },

  postContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 30,
    backgroundColor: "#fafafa",
    overflow: "hidden",
    elevation: 3,
  },
  header: { flexDirection: "row", alignItems: "center", padding: 10 },
  username: { fontFamily: "Poppins_Bold", fontSize: 15, color: "#333" },
  date: { fontFamily: "Poppins_Regular", fontSize: 12, color: "#777" },
  postImage: { width: "100%", height: width * 0.9, backgroundColor: "#ddd" },

  placeholderImage: {
    width: "100%",
    height: width * 0.9,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "#aaa", fontFamily: "Poppins_Regular", marginTop: 5 },

  actions: { flexDirection: "row", paddingHorizontal: 15, paddingTop: 10 },
  actionButton: { marginRight: 20 },
  likesText: { paddingHorizontal: 15, paddingTop: 5, fontFamily: "Poppins_Bold", color: "#222" },
  caption: { paddingHorizontal: 15, paddingVertical: 8, fontFamily: "Poppins_Regular", color: "#333" },

  commentSection: { borderTopWidth: 1, borderTopColor: "#ddd", padding: 10 },
  commentText: { fontFamily: "Poppins_Regular", color: "#333", marginBottom: 4 },
  noComments: { fontFamily: "Poppins_Regular", color: "#888", fontStyle: "italic" },
  commentInputRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    fontFamily: "Poppins_Regular",
    height: 36,
    marginRight: 10,
  },
});
