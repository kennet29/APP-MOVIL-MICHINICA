import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type CrearVacunaRouteProp = RouteProp<RootStackParamList, "CrearVacuna">;

export default function CrearVacuna() {
  const route = useRoute<CrearVacunaRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId, vacunaId } = route.params || {}; // puede venir opcional

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const API_BASE = "https://backendmaguey.onrender.com/api/vacunas";

  // 🟡 Si viene vacunaId, cargamos los datos para editar
  useEffect(() => {
    const fetchVacuna = async () => {
      if (!vacunaId) return;
      setModoEditar(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/${vacunaId}`);
        if (!res.ok) throw new Error("No se pudo cargar la vacuna.");
        const data = await res.json();

        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        if (data.fecha) setFecha(new Date(data.fecha));
      } catch (error: any) {
        console.error("❌ Error cargando vacuna:", error);
        Alert.alert("Error", "No se pudo cargar la información de la vacuna.");
      } finally {
        setLoading(false);
      }
    };

    fetchVacuna();
  }, [vacunaId]);

  // 🧩 Guardar o editar
  const handleSubmit = async () => {
    if (!nombre.trim() || !fecha) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nombre: nombre.trim(),
        fecha,
        descripcion: descripcion.trim(),
        mascotaId,
      };

      const res = await fetch(
        modoEditar ? `${API_BASE}/${vacunaId}` : `${API_BASE}`,
        {
          method: modoEditar ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert(
          modoEditar ? "✅ Vacuna actualizada" : "✅ Vacuna registrada",
          modoEditar
            ? "Los cambios se guardaron correctamente."
            : "La vacuna se creó con éxito."
        );
        navigation.goBack();
      } else {
        console.error("❌ Error en backend:", data);
        Alert.alert("Error", data.message || "Ocurrió un error al guardar.");
      }
    } catch (error: any) {
      console.error("❌ Error al conectar:", error);
      Alert.alert("Error", "Ocurrió un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && modoEditar) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Cargando datos de la vacuna...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {modoEditar ? "Editar Vacuna" : "Registrar Vacuna"}
      </Text>

      {/* Nombre */}
      <Text style={styles.label}>💉 Nombre de la vacuna</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Rabia, Parvovirus, etc."
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Fecha */}
      <Text style={styles.label}>📅 Fecha de aplicación</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarPicker(true)}
      >
        <Text style={styles.dateText}>{fecha.toLocaleDateString("es-ES")}</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      {/* Descripción */}
      <Text style={styles.label}>📝 Descripción (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Detalles adicionales sobre la vacuna"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Guardar */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Guardando..."
            : modoEditar
            ? "Guardar Cambios"
            : "Guardar Vacuna"}
        </Text>
      </TouchableOpacity>

      {/* Cancelar */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextSecondary}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonTextSecondary: {
    color: "#555",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
