import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function RegistroVeterinario({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [tituloFoto, setTituloFoto] = useState<string | null>(null);
  const [cedulaFoto, setCedulaFoto] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    cedulaNumero: "",
    nivel: "",
    codigoIPSA: "",
    correo: "",
    telefono: "",
  });

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
  }, [fontsLoaded]);

  const pickImage = async (type: "titulo" | "cedula") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      type === "titulo" ? setTituloFoto(uri) : setCedulaFoto(uri);
    }
  };

  const handleRegister = async () => {
    const { nombres, apellidos, cedulaNumero, nivel, codigoIPSA, correo, telefono } = form;

    if (!nombres || !apellidos || !cedulaNumero || !nivel || !codigoIPSA || !correo || !telefono) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      // Enviar datos al backend
      const response = await fetch("https://backendmaguey.onrender.com/api/Veterinarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombres,
          apellidos,
          cedulaNumero,
          nivel,
          codigoIPSA,
          correo,
          telefono,
          tituloFoto,
          cedulaFoto,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("❌ Error del servidor:", errorData);
        throw new Error("No se pudo registrar el veterinario");
      }

      const data = await response.json();
      console.log("✅ Veterinario registrado:", data);
      Alert.alert(
        "Registro enviado",
        "Nuestro equipo verificará tus datos en un plazo de 5 a 7 días hábiles."
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar veterinario:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar los datos");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#329bd7" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("./Logotipo Ranas-04.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Registro Veterinario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        placeholderTextColor="#888"
        value={form.nombres}
        onChangeText={(text) => setForm({ ...form, nombres: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        placeholderTextColor="#888"
        value={form.apellidos}
        onChangeText={(text) => setForm({ ...form, apellidos: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Cédula Número"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={form.cedulaNumero}
        onChangeText={(text) => setForm({ ...form, cedulaNumero: text })}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage("titulo")}>
        <Text style={styles.uploadText}>
          {tituloFoto ? "📸 Título cargado" : "Subir foto del Título"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage("cedula")}>
        <Text style={styles.uploadText}>
          {cedulaFoto ? "📸 Cédula cargada" : "Subir foto de la Cédula"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nivel (Técnico o Universitario)"
        placeholderTextColor="#888"
        value={form.nivel}
        onChangeText={(text) => setForm({ ...form, nivel: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Código Veterinario Único IPSA"
        placeholderTextColor="#888"
        value={form.codigoIPSA}
        onChangeText={(text) => setForm({ ...form, codigoIPSA: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.correo}
        onChangeText={(text) => setForm({ ...form, correo: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={form.telefono}
        onChangeText={(text) => setForm({ ...form, telefono: text })}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar registro</Text>}
      </TouchableOpacity>

      <Text style={styles.notice}>
        Una vez enviados los datos, nuestro equipo realizará la verificación en un plazo de{" "}
        <Text style={{ fontWeight: "bold" }}>5 a 7 días hábiles.</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 220,
    height: 220,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 25,
    color: "#f49953",
    fontFamily: "Poppins_Bold",
  },
  input: {
    width: "100%",
    borderWidth: 1.2,
    borderColor: "#b0b0b0",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    color: "#000000ff",
    backgroundColor: "#fdfdfdff",
  },
  uploadButton: {
    width: "100%",
    backgroundColor: "#e6f2fb",
    borderColor: "#329bd7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  uploadText: {
    color: "#329bd7",
    fontFamily: "Poppins_Bold",
  },
  button: {
    backgroundColor: "#329bd7",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_Bold",
  },
  notice: {
    textAlign: "center",
    marginTop: 15,
    fontFamily: "Poppins_Regular",
    color: "#555",
    fontSize: 14,
  },
});
