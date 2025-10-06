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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function CrearMascota({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [cumpleaños, setCumpleaños] = useState<Date | null>(null);
  const [sexo, setSexo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tarjetaVeterinaria, setTarjetaVeterinaria] = useState(false);
  const [foto, setFoto] = useState<any>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 🔹 Obtener usuario guardado
  useEffect(() => {
    const loadUsuario = async () => {
      const userData = await AsyncStorage.getItem("usuario");
      if (userData) {
        const parsed = JSON.parse(userData);
        setUsuarioId(parsed._id);
        console.log("👤 Usuario encontrado:", parsed);
      } else {
        console.warn("⚠️ No se encontró usuario guardado en AsyncStorage");
      }
    };
    loadUsuario();
  }, []);

  // 🔹 Elegir foto
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  // 🔹 Crear mascota
  const handleCrearMascota = async () => {
    if (!nombre || !especie || !sexo || !usuarioId) {
      Alert.alert("Error", "Completa todos los campos obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("especie", especie);
    formData.append("raza", raza);
    formData.append("sexo", sexo);
    formData.append("descripcion", descripcion);
    formData.append("tarjetaVeterinaria", String(tarjetaVeterinaria));
    formData.append("usuarioId", usuarioId);
    if (cumpleaños) formData.append("cumpleaños", cumpleaños.toISOString());
    if (foto) {
      formData.append("fotos", {
        uri: foto.uri,
        name: "foto_mascota.jpg",
        type: "image/jpeg",
      } as any);
    }

    // 👀 Mostrar el JSON enviado sin usar _parts (evita error TS)
    const debugData: Record<string, any> = {
      nombre,
      especie,
      raza,
      sexo,
      descripcion,
      tarjetaVeterinaria,
      usuarioId,
      cumpleaños: cumpleaños ? cumpleaños.toISOString() : null,
      foto: foto ? "IMAGEN" : "Sin foto",
    };
    console.log("📦 Datos enviados al backend:", debugData);

    try {
      setLoading(true);
      const res = await fetch("https://backendmaguey.onrender.com/api/mascotas", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      console.log("📬 Respuesta del backend:", data);

      if (!res.ok) {
        Alert.alert("Error", data.message || "No se pudo crear la mascota");
      } else {
        Alert.alert("Éxito", "Mascota creada correctamente 🎉");
        navigation.goBack();
      }
    } catch (error) {
      console.error("❌ Error al guardar mascota:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Mascota 🐾</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Especie</Text>
      <Picker
        selectedValue={especie}
        onValueChange={(value) => setEspecie(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona especie..." value="" />
        <Picker.Item label="Perro" value="perro" />
        <Picker.Item label="Gato" value="gato" />
        <Picker.Item label="Ave" value="ave" />
        <Picker.Item label="Roedor" value="roedor" />
        <Picker.Item label="Tortuga" value="tortuga" />
        <Picker.Item label="Conejo" value="conejo" />
        <Picker.Item label="Otro" value="otro" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Raza (opcional)"
        value={raza}
        onChangeText={setRaza}
      />

      <Text style={styles.label}>Sexo</Text>
      <Picker
        selectedValue={sexo}
        onValueChange={(value) => setSexo(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona sexo..." value="" />
        <Picker.Item label="Macho" value="macho" />
        <Picker.Item label="Hembra" value="hembra" />
      </Picker>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>
          {cumpleaños
            ? `Cumpleaños: ${cumpleaños.toLocaleDateString()}`
            : "Seleccionar cumpleaños"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={cumpleaños || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setCumpleaños(date);
          }}
        />
      )}

      <TouchableOpacity
        style={[
          styles.vetButton,
          { backgroundColor: tarjetaVeterinaria ? "#28a745" : "#aaa" },
        ]}
        onPress={() => setTarjetaVeterinaria(!tarjetaVeterinaria)}
      >
        <Text style={styles.vetButtonText}>
          {tarjetaVeterinaria ? "✅ Tiene tarjeta veterinaria" : "❌ No tiene tarjeta"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      {foto && <Image source={{ uri: foto.uri }} style={styles.preview} />}

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoText}>
          {foto ? "Cambiar foto" : "Seleccionar foto 📷"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleCrearMascota}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Guardar Mascota</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
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
  },
  label: { fontSize: 16, marginTop: 10, fontWeight: "bold" },
  picker: { backgroundColor: "#f5f5f5", borderRadius: 8, marginVertical: 5 },
  dateButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  dateText: { textAlign: "center" },
  vetButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  vetButtonText: { color: "#fff", fontWeight: "bold" },
  photoButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  photoText: { color: "#fff", fontWeight: "bold" },
  preview: {
    width: "100%",
    height: 200,
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
