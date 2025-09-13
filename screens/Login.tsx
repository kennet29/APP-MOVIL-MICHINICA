import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa todos los campos");
      return;
    }


      navigation.replace("Home");
   
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
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
    backgroundColor: "#FFFF" 
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 5000,
    marginTop:-90,
  },
  title: { 
    fontSize: 41, 
    marginBottom: 40, 
    color:"#f49953",
    fontFamily: "Poppins_Bold" 
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
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontFamily: "Poppins_Bold" 
  },
  link: { 
    marginTop: 15, 
    color: "#007BFF", 
    fontFamily: "Poppins_Regular"
  },
});
