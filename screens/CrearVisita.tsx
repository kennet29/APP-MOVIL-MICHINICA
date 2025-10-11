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

type CrearVisitaRouteProp = RouteProp<RootStackParamList, "CrearVisita">;

export default function CrearVisita() {
  const route = useRoute<CrearVisitaRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId, visitaId } = route.params || {}; // 📩 Recibe mascotaId como parámetro

  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const API_BASE = "https://backendmaguey.onrender.com/api/visitas";

  // 📌 Si hay visitaId => modo edición
  useEffect(() => {
    const fetchVisita = async () => {
      if (!visitaId) return;
      setModoEditar(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/${visitaId}`);
        if (!res.ok) throw new Error("No se pudo obtener la visita.");
        const data = await res.json();
        setMotivo(data.motivo || "");
        if (data.fecha) setFecha(new Date(data.fecha));
      } catch (error: any) {
        console.error("❌ Error cargando visita:", error);
        Alert.alert("Error", "No se pudo cargar la información de la visita.");
      } finally {
        setLoading(false);
      }
    };
    fetchVisita();
  }, [visitaId]);

  // 📌 Crear o actualizar visita
  const handleSubmit = async () => {
    if (!motivo.trim() || !fecha) {
      Alert.alert("Campos requeridos", "Completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        motivo: motivo.trim(),
        fecha,
        mascotaId,
      };

      const res = await fetch(
        modoEditar ? `${API_BASE}/${visitaId}` : `${API_BASE}`,
        {
          method: modoEditar ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert(
          modoEditar ? "✅ Visita actualizada" : "✅ Visita registrada",
          modoEditar
            ? "Los cambios se guardaron correctamente."
            : "La visita se registró con éxito."
        );
        navigation.goBack();
      } else {
        console.error("❌ Error al guardar:", data);
        Alert.alert("Error", data.message || "No se pudo guardar la visita.");
      }
    } catch (error: any) {
      console.error("❌ Error al conectar:", error);
      Alert.alert("Error", "Ocurrió un problema al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 📍 Loading si está editando
  if (loading && modoEditar) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A9F4" />
        <Text style={{ marginTop: 10 }}>Cargando visita...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {modoEditar ? "Editar Visita Médica" : "Registrar Nueva Visita"}
      </Text>

      {/* Campo motivo */}
      <Text style={styles.label}>🩺 Motivo de la visita</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Ej. Control general, revisión postoperatoria, chequeo anual..."
        multiline
        value={motivo}
        onChangeText={setMotivo}
      />

      {/* Campo fecha */}
      <Text style={styles.label}>📅 Fecha de la visita</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarPickerFecha(true)}
      >
        <Text style={styles.dateText}>{fecha.toLocaleDateString("es-ES")}</Text>
      </TouchableOpacity>

      {mostrarPickerFecha && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setMostrarPickerFecha(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      {/* Botones */}
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
            : "Guardar Visita"}
        </Text>
      </TouchableOpacity>

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
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 25,
  },
  label: { fontSize: 16, color: "#333", marginBottom: 8, marginTop: 12 },
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
  dateText: { fontSize: 15, color: "#333" },
  button: {
    backgroundColor: "#03A9F4",
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
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
