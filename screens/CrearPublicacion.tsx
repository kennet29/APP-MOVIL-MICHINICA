import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function CrearPublicacion({ navigation }: any) {
  const [contenido, setContenido] = useState("");
  const [foto, setFoto] = useState<any>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener usuario guardado
  useEffect(() => {
    const loadUsuario = async () => {
      const userData = await AsyncStorage.getItem("usuario");
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed._id) {
          setUsuarioId(parsed._id);
          console.log("👤 Usuario encontrado:", parsed);
        } else {
          console.warn("⚠️ No se encontró _id en usuario guardado:", parsed);
        }
      }
    };
    loadUsuario();
  }, []);

  // 🔹 Elegir imagen desde galería
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFoto(result.assets[0]);
    }
  };

  // 🔹 Crear publicación
  const handleCrearPublicacion = async () => {
    if (!contenido.trim() || !usuarioId) {
      Alert.alert("Error", "Debes escribir algo antes de publicar");
      return;
    }

    const formData = new FormData();
    formData.append("contenido", contenido);
    formData.append("usuarioId", usuarioId); // ✅ tu ID está correcto

    if (foto) {
      formData.append("imagenes", {
        uri: foto.uri,
        name: "publicacion.jpg",
        type: "image/jpeg",
      } as any);
    }

    console.log("📦 Datos enviados al backend:", {
      usuarioId,
      contenido,
      foto: foto ? "IMAGEN" : "Sin imagen",
    });

    try {
      setLoading(true);
      const res = await fetch("https://backendmaguey.onrender.com/api/publicaciones", {
        method: "POST",
        body: formData, // ✅ sin headers manuales
      });

      const data = await res.json();
      console.log("📬 Respuesta del backend:", data);

      if (!res.ok) {
        Alert.alert("Error", data.message || "No se pudo crear la publicación");
      } else {
        Alert.alert("Éxito", "Publicación creada correctamente 🎉");
        navigation.goBack();
      }
    } catch (error) {
      console.error("❌ Error al guardar publicación:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Publicación 📝</Text>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="¿Qué quieres compartir?"
        value={contenido}
        onChangeText={setContenido}
        multiline
      />

      {foto && <Image source={{ uri: foto.uri }} style={styles.preview} />}

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoText}>
          {foto ? "Cambiar imagen" : "Seleccionar imagen 📷"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleCrearPublicacion}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Publicar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#329bd7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    textAlignVertical: "top",
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  photoText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  preview: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
