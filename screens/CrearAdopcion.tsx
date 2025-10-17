import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function CrearAdopcion({ navigation }: any) {
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    edad: "",
    sexo: "",
    descripcion: "",
    telefono: "",
    correo: "",
  });

  const [fotos, setFotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    obtenerUsuario();
  }, []);

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

  // 📸 Seleccionar imágenes
  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const nuevas = result.assets || [result];
      setFotos([...fotos, ...nuevas]);
    }
  };

  // 🧾 Enviar datos al backend
  const handleSubmit = async () => {
    if (!usuarioId) {
      Alert.alert("Error", "No se encontró el usuario logueado.");
      return;
    }

    if (!form.nombre || !form.especie || !form.sexo || !form.telefono) {
      Alert.alert("Error", "Por favor llena todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      // Añadir texto
      for (const key in form) {
        formData.append(key, form[key as keyof typeof form]);
      }
      formData.append("usuarioId", usuarioId);

      // Añadir imágenes
      fotos.forEach((foto: any, index) => {
        formData.append("fotos", {
          uri: foto.uri,
          name: `foto_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });

      const response = await fetch("https://backendmaguey.onrender.com/api/adopciones", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await response.json();
      console.log("📦 Respuesta del backend:", data);

      if (response.ok) {
        Alert.alert("✅ Éxito", "Solicitud de adopción creada correctamente");
        navigation.replace("Adopciones");
      } else {
        Alert.alert("Error", data.message || "No se pudo crear la adopción");
      }
    } catch (error: any) {
      console.error("❌ Error al crear adopción:", error);
      Alert.alert("Error", "No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva Adopción 🐾</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del animal"
        placeholderTextColor="#888"
        value={form.nombre}
        onChangeText={(t) => setForm({ ...form, nombre: t })}
      />

      {/* 🐶 Selector de especie */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.especie}
          onValueChange={(value) => setForm({ ...form, especie: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona la especie" value="" />
          <Picker.Item label="Perro" value="perro" />
          <Picker.Item label="Gato" value="gato" />
          <Picker.Item label="Conejo" value="conejo" />
          <Picker.Item label="Pez" value="pez" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={form.edad}
        onChangeText={(t) => setForm({ ...form, edad: t })}
      />

      {/* ⚥ Selector de sexo */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.sexo}
          onValueChange={(value) => setForm({ ...form, sexo: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el sexo" value="" />
          <Picker.Item label="Macho" value="macho" />
          <Picker.Item label="Hembra" value="hembra" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Descripción"
        placeholderTextColor="#888"
        value={form.descripcion}
        onChangeText={(t) => setForm({ ...form, descripcion: t })}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        placeholderTextColor="#888"
        value={form.telefono}
        onChangeText={(t) => setForm({ ...form, telefono: t })}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico (opcional)"
        keyboardType="email-address"
        placeholderTextColor="#888"
        value={form.correo}
        onChangeText={(t) => setForm({ ...form, correo: t })}
      />

      {/* 🖼️ Previsualización de imágenes */}
      <View style={styles.previewContainer}>
        {fotos.map((foto, index) => (
          <Image key={index} source={{ uri: foto.uri }} style={styles.previewImage} />
        ))}
      </View>

      {/* 📸 Botón para agregar fotos */}
      <TouchableOpacity style={styles.btnFoto} onPress={seleccionarImagen}>
        <Text style={styles.btnFotoTexto}>📸 Agregar Fotos</Text>
      </TouchableOpacity>

      {/* ✅ Botón de guardar */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar Adopción</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: "#1DB954",
    fontFamily: "Poppins_Bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.2,
    borderColor: "#b0b0b0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1.2,
    borderColor: "#b0b0b0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    color: "#333",
    fontFamily: "Poppins_Regular",
  },
  button: {
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Bold",
    fontSize: 16,
  },
  btnFoto: {
    backgroundColor: "#9d7bb6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnFotoTexto: { color: "#fff", fontWeight: "bold" },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "center",
  },
  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
});
