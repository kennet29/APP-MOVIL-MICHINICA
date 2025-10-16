import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function AgregarGasto({ route, navigation }: any) {
  const { mascotaId } = route.params;
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(false);
  const [mascotas, setMascotas] = useState<{ _id: string; nombre: string }[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<string>(mascotaId || "");

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  const tiposGasto = [
    "alimentacion",
    "veterinario",
    "medicamentos",
    "accesorios",
    "higiene",
    "recreacion",
    "transporte",
    "seguros",
    "entrenamiento",
    "guarderia",
    "otros",
  ];

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const usuarioData = await AsyncStorage.getItem("usuario");
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        setUsuarioId(usuario._id);
        if (!mascotaId) {
          obtenerMascotas(usuario._id);
        }
      }
    } catch (error) {
      console.error("❌ Error al obtener usuario:", error);
    }
  };

  const obtenerMascotas = async (idUsuario: string) => {
    try {
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/mascotas/usuario/${idUsuario}`
      );
      const data = await res.json();
      if (res.ok) setMascotas(data);
    } catch (error) {
      console.error("❌ Error al obtener mascotas:", error);
    }
  };

  const handleGuardar = async () => {
    if (!tipo || !monto) {
      Alert.alert("Campos requeridos", "Selecciona un tipo de gasto e ingresa el monto");
      return;
    }

    if (!usuarioId) {
      Alert.alert("Error", "No se encontró el usuario. Inicia sesión nuevamente.");
      return;
    }

    if (!selectedMascota) {
      Alert.alert("Mascota requerida", "Selecciona una mascota para registrar el gasto.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://backendmaguey.onrender.com/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId,
          mascotaId: selectedMascota,
          tipo,
          descripcion,
          monto: parseFloat(monto),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Gasto registrado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar el gasto");
      }
    } catch (error) {
      console.error("❌ Error al guardar gasto:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Añadir Gasto</Text>

      <View style={styles.form}>
        {/* 🐾 Selector de Mascota */}
        {!mascotaId && (
          <>
            <Text style={styles.label}>Mascota</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMascota}
                onValueChange={(value) => setSelectedMascota(value)}
                style={styles.picker}
                itemStyle={{ fontSize: 18 }}
              >
                <Picker.Item label="Selecciona una mascota" value="" />
                {mascotas.map((m) => (
                  <Picker.Item key={m._id} label={m.nombre} value={m._id} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <Text style={styles.label}>Tipo de gasto</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
            style={styles.picker}
            itemStyle={{ fontSize: 18 }}
          >
            <Picker.Item label="Selecciona un tipo" value="" />
            {tiposGasto.map((t) => (
              <Picker.Item key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} value={t} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Consulta veterinaria o comida premium"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Text style={styles.label}>Monto (C$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 850.00"
          value={monto}
          onChangeText={setMonto}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleGuardar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Guardar Gasto</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFF",
    padding: 25,
    paddingTop: 80,
  },
  loading: {
    flex: 1,
    backgroundColor: "#329bd7",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_Bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontFamily: "Poppins_Bold",
    color: "#555",
    marginBottom: 5,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontFamily: "Poppins_Regular",
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    height: 60, // 📏 Más alto
    justifyContent: "center",
  },
  picker: {
    fontFamily: "Poppins_Regular",
    height: 60, // 📏 Más alto para mejor UX
  },
  button: {
    backgroundColor: "#329bd7",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Bold",
    fontSize: 16,
  },
  cancelButton: {
    alignItems: "center",
  },
  cancelText: {
    fontFamily: "Poppins_Regular",
    color: "#888",
  },
});
