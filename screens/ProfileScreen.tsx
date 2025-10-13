import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function Perfil({ navigation }: any) {
  const [usuario, setUsuario] = useState<{ _id: string; nombre: string; email: string } | null>(null);
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // 🔹 Cargar datos del usuario
  useEffect(() => {
    const cargarUsuario = async () => {
      const data = await AsyncStorage.getItem("usuario");
      if (data) setUsuario(JSON.parse(data));
    };
    cargarUsuario();
  }, []);

  // 🔹 Cambiar contraseña
  const cambiarContrasena = async () => {
    if (!nueva || !confirmar) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }

    if (nueva.length < 6) {
      Alert.alert("Contraseña corta", "Debe tener al menos 6 caracteres.");
      return;
    }

    if (nueva !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Sesión expirada", "Vuelve a iniciar sesión.");
        navigation.replace("Login");
        return;
      }

      const res = await fetch(
        `https://apitammy-closset.fra1.zeabur.app/api/users/${usuario?._id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: nueva }),
        }
      );

      // 🔹 Leer la respuesta como texto
      const text = await res.text();

      // 🔹 Intentar parsear como JSON
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        Alert.alert("Error", data?.message || "No se pudo cambiar la contraseña.");
      } else {
        Alert.alert("Éxito ✅", data?.message || "Contraseña actualizada correctamente.");
        setNueva("");
        setConfirmar("");
      }
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);
      Alert.alert("Error", error.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cerrar sesión
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("usuario");
    navigation.replace("Login");
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      {usuario ? (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.infoText}>{usuario.nombre}</Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.infoText}>{usuario.email}</Text>
          </View>

          <Text style={[styles.title, { marginTop: 30 }]}>Cambiar Contraseña</Text>

          <Text style={styles.label}>Nueva contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa una nueva contraseña"
            secureTextEntry
            value={nueva}
            onChangeText={setNueva}
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirma la nueva contraseña"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={cambiarContrasena}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Guardar cambios</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c", marginTop: 15 }]}
            onPress={cerrarSesion}
          >
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="#2196F3" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  infoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontFamily: "Poppins_400Regular",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});
