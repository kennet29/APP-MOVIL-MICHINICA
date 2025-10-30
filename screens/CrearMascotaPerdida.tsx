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
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CrearMascotaPerdida({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaPerdida, setFechaPerdida] = useState(new Date());
  const [lugarPerdida, setLugarPerdida] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🟢 Cargar usuario guardado desde AsyncStorage
  useEffect(() => {
    const loadUsuario = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuario");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUsuarioId(parsed._id);
          console.log("👤 Usuario encontrado:", parsed);
        } else {
          console.warn("⚠️ No se encontró usuario en AsyncStorage");
          Alert.alert("Sesión expirada", "Por favor inicia sesión nuevamente");
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("❌ Error al cargar usuario:", error);
      }
    };
    loadUsuario();
  }, []);

  // Animación ZooNica
  const titleScale = useRef(new Animated.Value(0)).current;
  const titleLetters = [
    { letter: "Z", color: "#e87170" },
    { letter: "O", color: "#f49953" },
    { letter: "O", color: "#9d7bb6" },
    { letter: "N", color: "#00BFFF" },
    { letter: "I", color: "#FFA500" },
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
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  // 📤 Enviar formulario
  const handleSubmit = async () => {
    if (!usuarioId) {
      Alert.alert("Error", "No se ha encontrado tu usuario, vuelve a iniciar sesión.");
      return;
    }
    if (!nombre.trim() || !especie || !sexo || !lugarPerdida.trim() || !telefono.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      formData.append("especie", especie);
      formData.append("raza", raza);
      formData.append("sexo", sexo);
      formData.append("descripcion", descripcion.trim());
      formData.append("fechaPerdida", fechaPerdida.toISOString());
      formData.append("lugarPerdida", lugarPerdida.trim());
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
        Alert.alert("Éxito", "Mascota perdida registrada correctamente 🎉");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "No se pudo crear la publicación");
      }
    } catch (error) {
      console.error("❌ Error frontend:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar la mascota");
    } finally {
      setLoading(false);
    }
  };

  if (!usuarioId) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#329bd7" />
        <Text style={{ marginTop: 10, color: "#555" }}>Cargando usuario...</Text>
      </View>
    );
  }

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

      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* 🐶 Picker de especie */}
      <Text style={styles.label}>Especie</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={especie}
          onValueChange={setEspecie}
          style={styles.picker}
          dropdownIconColor="#329bd7"
        >
          <Picker.Item label="Selecciona especie..." value="" color="#888" />
          <Picker.Item label="Perro" value="perro" color="#000" />
          <Picker.Item label="Gato" value="gato" color="#000" />
          <Picker.Item label="Conejo" value="conejo" color="#000" />
          <Picker.Item label="Pez" value="pez" color="#000" />
          <Picker.Item label="Ave" value="ave" color="#000" />
          <Picker.Item label="Otro" value="otro" color="#000" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Raza (opcional)"
        value={raza}
        onChangeText={setRaza}
      />

      {/* 🚻 Picker de sexo */}
      <Text style={styles.label}>Sexo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sexo}
          onValueChange={setSexo}
          style={styles.picker}
          dropdownIconColor="#329bd7"
        >
          <Picker.Item label="Selecciona sexo..." value="" color="#888" />
          <Picker.Item label="Macho" value="macho" color="#000" />
          <Picker.Item label="Hembra" value="hembra" color="#000" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción (opcional)"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* 📅 Fecha */}
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

      <TextInput
        style={styles.input}
        placeholder="Lugar de pérdida"
        value={lugarPerdida}
        onChangeText={setLugarPerdida}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono de contacto"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico (opcional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* 📸 Subir foto */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <FontAwesome5 name="camera" size={18} color="#fff" />
        <Text style={styles.uploadText}>{foto ? " Cambiar Foto" : " Subir Foto"}</Text>
      </TouchableOpacity>

      {foto && <Image source={{ uri: foto }} style={styles.preview} />}

      {/* 💾 Guardar */}
      <TouchableOpacity
        style={[styles.submitButton, loading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Guardar Mascota</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  titleZoo: { fontSize: 40, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  subtitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1.2,
    borderColor: "#b0b0b0",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1.2,
    borderColor: "#b0b0b0",
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    color: "#000",
    height: 50,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  dateText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  preview: { width: "100%", height: 200, borderRadius: 8, marginVertical: 10 },
  submitButton: { backgroundColor: "#e87170", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
