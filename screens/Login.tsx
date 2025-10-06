import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    setCheckingToken(false);
  }, []);

  if (!fontsLoaded || checkingToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#329bd7" />
      </View>
    );
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://backendmaguey.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📦 Respuesta del backend:", data);

      if (!response.ok) {
        Alert.alert("Error", data.message || "Credenciales inválidas");
      } else {
        // ✅ Guardar token y datos del usuario
        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
          await AsyncStorage.setItem("userEmail", email);

          // 👇 Crear un objeto usuario basado en la respuesta del backend
          const usuario = {
            _id: data._id, // viene directamente del backend
            email,
          };

          await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

          console.log("✅ Usuario guardado en AsyncStorage:", usuario);
          console.log("✅ Token guardado:", data.token);
        }

        Alert.alert("Éxito", "Inicio de sesión correcto");
        navigation.replace("Home");
      }
    } catch (error: any) {
      Alert.alert("Error", "No se pudo conectar al servidor");
      console.error("❌ Error en login:", error);
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

      <Text style={styles.title}>Iniciar Sesión</Text>

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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFF",
  },
  logo: { width: 250, height: 250, borderRadius: 5000, marginTop: -90 },
  title: {
    fontSize: 41,
    marginBottom: 40,
    color: "#f49953",
    fontFamily: "Poppins_Bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontFamily: "Poppins_Regular",
  },
  button: {
    backgroundColor: "#329bd7",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontFamily: "Poppins_Bold" },
  link: { marginTop: 15, color: "#007BFF", fontFamily: "Poppins_Regular" },
});
