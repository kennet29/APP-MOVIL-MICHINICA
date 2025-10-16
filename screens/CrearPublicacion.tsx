import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CrearPublicacion({ navigation }: any) {
  const [contenido, setContenido] = useState("");
  const [imagenes, setImagenes] = useState<any[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuario");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUsuarioId(parsed._id);
          console.log("👤 Usuario encontrado:", parsed);
        }
      } catch (error) {
        console.error("⚠️ Error al obtener usuario:", error);
      }
    };
    loadUser();
  }, []);

 
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagenes(result.assets);
    }
  };


  const handleCrearPublicacion = async () => {
    if (!contenido.trim()) {
      Alert.alert("Error", "El contenido no puede estar vacío.");
      return;
    }

    if (!usuarioId) {
      Alert.alert("Error", "No se pudo identificar al usuario.");
      return;
    }

    if (imagenes.length === 0) {
      Alert.alert("Aviso", "Selecciona al menos una imagen antes de publicar.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("usuarioId", usuarioId);
      formData.append("contenido", contenido);

      imagenes.forEach((img, index) => {
        const uri = img.uri.startsWith("file://") ? img.uri : `file://${img.uri}`;
        formData.append("imagenes", {
          uri,
          name: img.fileName || `imagen_${index}.jpg`,
          type: img.mimeType || "image/jpeg",
        } as any);
      });

      console.log("📦 Enviando al backend:", {
        contenido,
        usuarioId,
        imagenes: imagenes.map((i) => i.fileName || "sin nombre"),
      });

      const response = await fetch("https://backendmaguey.onrender.com/api/publicaciones", {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();
      console.log("📬 Respuesta del backend:", data);

      if (!response.ok) {
        Alert.alert("Error", data.message || "Error al crear publicación");
      } else {
        Alert.alert("Éxito", "Publicación creada correctamente 🎉");
        setContenido("");
        setImagenes([]);
        navigation.goBack();
      }
    } catch (error) {
      console.error("❌ Error al enviar publicación:", error);
      Alert.alert("Error", "No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Publicación 🐾</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        multiline
        value={contenido}
        onChangeText={setContenido}
      />

      {/* Vista previa de imágenes */}
      {imagenes.length > 0 ? (
        <View style={styles.previewContainer}>
          {imagenes.map((img, idx) => (
            <Image key={idx} source={{ uri: img.uri }} style={styles.previewImage} />
          ))}
        </View>
      ) : (
        <View style={styles.placeholder}>
          <FontAwesome5 name="image" size={40} color="#ccc" />
          <Text style={styles.placeholderText}>Sin imagen seleccionada</Text>
        </View>
      )}

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <FontAwesome5 name="plus" size={16} color="#fff" />
        <Text style={styles.photoText}>Agregar Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.publishButton, loading && { opacity: 0.6 }]}
        onPress={handleCrearPublicacion}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.publishText}>Publicar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#329bd7",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    minHeight: 100,
    marginBottom: 15,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BFFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  photoText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  previewContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 5,
  },
  placeholder: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 10,
  },
  placeholderText: {
    color: "#888",
    marginTop: 5,
  },
  publishButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  publishText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
