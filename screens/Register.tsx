import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Register({ navigation }: any) {
  const [nombre, setNombre] = useState("");   // 👈 Nuevo estado
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#329bd7" />
      </View>
    );
  }

  const handleRegister = async () => {
    if (!nombre || !username || !email || !password) {
      Alert.alert("Error", "Por favor ingresa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://backendmaguey.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, username, email, password }), // 👈 Se envía nombre
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Error al registrar usuario");
      } else {
        // Guardamos el token en AsyncStorage
        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
          console.log("Token guardado:", data.token);
        }

        Alert.alert("Éxito", "Usuario registrado correctamente");

        // Redirigimos a Home o Login
        navigation.replace("Home");
      }
    } catch (error: any) {
      Alert.alert("Error", "No se pudo conectar al servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./Logotipo Ranas-04.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Crear Cuenta</Text>

      {/* 👇 Nuevo campo Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrarse</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#FFFF" },
  logo: { width: 250, height: 250, borderRadius: 5000, marginTop:-90 },
  title: { fontSize: 41, marginBottom: 40, color:"#f49953", fontFamily: "Poppins_Bold" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginVertical: 10, fontFamily: "Poppins_Regular" },
  button: { backgroundColor: "#329bd7", padding: 15, borderRadius: 8, width: "100%", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontFamily: "Poppins_Bold" },
  link: { marginTop: 15, color: "#007BFF", fontFamily: "Poppins_Regular" },
});
