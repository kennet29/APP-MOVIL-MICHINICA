// screens/CrearMascotaPerdida.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Animated,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CrearMascotaPerdida({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("perro");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("macho");
  const [descripcion, setDescripcion] = useState("");
  const [fechaPerdida, setFechaPerdida] = useState(new Date());
  const [lugarPerdida, setLugarPerdida] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const usuarioId = "66f5a53a6b8f59e71cc12345"; // ⚠️ reemplazar con el real

  // Animación ZooNica
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
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true }).start();
  }, []);

  // 📷 Seleccionar imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  // 📤 Enviar formulario
  const handleSubmit = async () => {
    if (!nombre || nombre.trim().length < 2) {
      Alert.alert("Error", "El nombre debe tener al menos 2 caracteres.");
      return;
    }
    if (!descripcion || descripcion.trim().length < 10) {
      Alert.alert("Error", "La descripción debe tener al menos 10 caracteres.");
      return;
    }
    if (!lugarPerdida || lugarPerdida.trim().length < 2) {
      Alert.alert("Error", "El lugar de pérdida es obligatorio.");
      return;
    }
    if (!telefono.trim()) {
      Alert.alert("Error", "El teléfono es obligatorio.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      formData.append("especie", especie);
      formData.append("raza", raza);
      formData.append("sexo", sexo);
      formData.append("descripcion", descripcion.trim());
      formData.append("fechaPerdida", fechaPerdida.toISOString());
      formData.append("lugarPerdida", lugarPerdida.trim());
      // ⚡ El backend mete estos en contacto
      formData.append("telefono", telefono.trim());
      if (email) formData.append("email", email.trim());
      formData.append("usuarioId", usuarioId);

      if (foto) {
        const filename = foto.split("/").pop();
        const type = filename?.split(".").pop();
        formData.append("fotos", {
          uri: foto,
          name: filename,
          type: `image/${type}`,
        } as any);
      }

      const res = await fetch("https://backendmaguey.onrender.com/api/mascotas-perdidas", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("📥 Respuesta backend:", data);

      if (res.ok) {
        Alert.alert("Éxito", "Mascota perdida registrada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "No se pudo crear la publicación");
      }
    } catch (error) {
      console.error("❌ Error frontend:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar la mascota");
    }
  };

  return (
    <ScrollView style={styles.container}>
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

      <Text style={styles.subtitle}>Registrar Mascota Perdida</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Especie (perro, gato...)" value={especie} onChangeText={setEspecie} />
      <TextInput style={styles.input} placeholder="Raza" value={raza} onChangeText={setRaza} />
      <TextInput style={styles.input} placeholder="Sexo (macho/hembra)" value={sexo} onChangeText={setSexo} />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Fecha */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <FontAwesome5 name="calendar-alt" size={18} color="#fff" />
        <Text style={styles.dateText}>{fechaPerdida.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaPerdida}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setFechaPerdida(date);
          }}
        />
      )}

      <TextInput style={styles.input} placeholder="Lugar de pérdida" value={lugarPerdida} onChangeText={setLugarPerdida} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />

      {/* Subir foto */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <FontAwesome5 name="camera" size={18} color="#fff" />
        <Text style={styles.uploadText}> Subir Foto</Text>
      </TouchableOpacity>
      {foto && <Image source={{ uri: foto }} style={styles.preview} />}

      {/* Guardar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Mascota</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titleZoo: { fontSize: 40, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  subtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  dateButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#1DB954", padding: 12, borderRadius: 8, marginBottom: 12 },
  dateText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  uploadButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginBottom: 12 },
  uploadText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  preview: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },
  submitButton: { backgroundColor: "#e87170", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
