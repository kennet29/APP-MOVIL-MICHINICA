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
} from "react-native";
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
};

type Comentario = {
  comentario: string;
  usuarioId: Usuario;
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

export default function Publicaciones({ navigation }: any) {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://backendmaguey.onrender.com/api/publicaciones"
      );
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

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text style={{ color: "#555", marginTop: 10 }}>
          Cargando publicaciones...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ZoonicaTitle size={42} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
                <TouchableOpacity style={styles.actionButton}>
                  <FontAwesome5 name="heart" size={22} color="#e74c3c" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate("Comentarios", { id: pub._id })
                  }
                >
                  <FontAwesome5 name="comment" size={22} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <FontAwesome5 name="share" size={22} color="#555" />
                </TouchableOpacity>
              </View>

              <Text style={styles.likesText}>
                {pub.likes?.length || 0}{" "}
                {pub.likes?.length === 1 ? "like" : "likes"}
              </Text>

              {pub.contenido ? (
                <Text style={styles.caption}>
                  <Text style={{ fontFamily: "Poppins_Bold" }}>
                    {pub.usuarioId?.username || "Usuario"}:{" "}
                  </Text>
                  {pub.contenido}
                </Text>
              ) : null}

              {pub.comentarios && pub.comentarios.length > 0 && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comentarios", { id: pub._id })
                  }
                >
                  <Text style={styles.commentLink}>
                    Ver los {pub.comentarios.length} comentarios
                  </Text>
                </TouchableOpacity>
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

  titleContainer: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" },

  noPosts: {
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Poppins_Regular",
    color: "#777",
  },

  postContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 30, // ⬅️ más espacio entre publicaciones
    backgroundColor: "#fafafa",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  username: { fontFamily: "Poppins_Bold", fontSize: 15, color: "#333" },
  date: { fontFamily: "Poppins_Regular", fontSize: 12, color: "#777" },

  postImage: {
    width: "100%",
    height: width * 0.9,
    backgroundColor: "#ddd",
  },

  placeholderImage: {
    width: "100%",
    height: width * 0.9,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: { color: "#aaa", fontFamily: "Poppins_Regular", marginTop: 5 },

  actions: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  actionButton: { marginRight: 20 },

  likesText: {
    paddingHorizontal: 15,
    paddingTop: 5,
    fontFamily: "Poppins_Bold",
    color: "#222",
  },

  caption: {
    paddingHorizontal: 15,
    paddingTop: 3,
    paddingBottom: 10,
    fontFamily: "Poppins_Regular",
    color: "#333",
  },

  commentLink: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontFamily: "Poppins_Regular",
    color: "#777",
  },
});
