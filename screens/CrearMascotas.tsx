// screens/CrearMascota.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Image,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker"; // ✅ expo-image-picker
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type CrearMascotaNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "CrearMascota"
>;

export default function CrearMascota() {
  const navigation = useNavigation<CrearMascotaNavProp>();

  // Estados
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState<"macho" | "hembra" | "">("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [tarjetaVeterinaria, setTarjetaVeterinaria] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const usuarioId = "66f5a53a6b8f59e71cc12345"; // ⚠️ reemplazar con el real

  // 📷 Seleccionar imagen
  const pickImage = async () => {
    if (fotos.length >= 5) {
      Alert.alert("Límite alcanzado", "Solo puedes subir hasta 5 fotos.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita permiso para acceder a las fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // 📤 Enviar formulario
  const handleSubmit = async () => {
    if (!nombre.trim() || !especie.trim() || !sexo) {
      Alert.alert("Error", "Nombre, especie y sexo son obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      formData.append("especie", especie.trim());
      if (raza) formData.append("raza", raza.trim());
      formData.append("sexo", sexo);
      formData.append("cumpleaños", fechaNacimiento.toISOString());
      if (descripcion) formData.append("descripcion", descripcion.trim());
      formData.append("tarjetaVeterinaria", tarjetaVeterinaria.toString());
      formData.append("usuarioId", usuarioId);

      // 📌 Fotos
      fotos.forEach((foto, index) => {
        const filename = foto.split("/").pop() || `foto${index}.jpg`;
        const ext = filename.split(".").pop();
        const type = ext ? `image/${ext}` : "image/jpeg";

        formData.append("fotos", {
          uri: foto,
          name: filename,
          type,
        } as any);
      });

      console.log("📤 Fotos a enviar:", fotos);

      const res = await fetch("https://backendmaguey.onrender.com/api/mascotas", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await res.json();
      console.log("📥 Respuesta backend:", data);

      if (res.ok) {
        Alert.alert("✅ Éxito", "Mascota registrada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar la mascota");
      }
    } catch (error) {
      console.error("❌ Error frontend:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar la mascota");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Mascota</Text>

      {/* 📷 Subir fotos */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <FontAwesome5 name="camera" size={18} color="#fff" />
        <Text style={styles.uploadText}> Subir Foto</Text>
      </TouchableOpacity>

      {/* Preview de fotos */}
      <View style={styles.previewContainer}>
        {fotos.map((foto, idx) => (
          <Image key={idx} source={{ uri: foto }} style={styles.preview} />
        ))}
      </View>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Especie (perro, gato, ave...)"
        style={styles.input}
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        placeholder="Raza"
        style={styles.input}
        value={raza}
        onChangeText={setRaza}
      />

      {/* ⚧ Sexo con Picker */}
      <Text style={styles.label}>Sexo</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue: "macho" | "hembra" | "") => setSexo(itemValue)}
        >
          <Picker.Item label="Selecciona el sexo" value="" />
          <Picker.Item label="Macho" value="macho" />
          <Picker.Item label="Hembra" value="hembra" />
        </Picker>
      </View>

      {/* 📅 Fecha de nacimiento */}
      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <FontAwesome5 name="calendar-alt" size={18} color="#fff" />
        <Text style={styles.dateText}>
          {fechaNacimiento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setFechaNacimiento(date);
          }}
        />
      )}

      <TextInput
        placeholder="Descripción"
        style={[styles.input, { height: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Tarjeta Veterinaria</Text>
        <Switch
          value={tarjetaVeterinaria}
          onValueChange={setTarjetaVeterinaria}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Mascota</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  label: { fontSize: 16, color: "#333", marginBottom: 5 },
  pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12 },
  dateButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#1DB954", padding: 12, borderRadius: 8, marginBottom: 12 },
  dateText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  switchRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, justifyContent: "space-between" },
  uploadButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginBottom: 12 },
  uploadText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  previewContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  preview: { width: 100, height: 100, borderRadius: 8, marginRight: 10, marginBottom: 10 },
  submitButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
