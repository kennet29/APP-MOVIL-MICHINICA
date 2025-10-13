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

type CrearEnfermedadCronicaRouteProp = RouteProp<
  RootStackParamList,
  "CrearEnfermedad"
>;

export default function CrearEnfermedadCronica() {
  const route = useRoute<CrearEnfermedadCronicaRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId, enfermedadId } = route.params || {};

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [diagnosticadaEn, setDiagnosticadaEn] = useState<Date>(new Date());
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const API_BASE = "https://backendmaguey.onrender.com/api/enfermedades";

  // 🟡 Si viene un ID, se carga la enfermedad existente
  useEffect(() => {
    const fetchEnfermedad = async () => {
      if (!enfermedadId) return;
      setModoEditar(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/${enfermedadId}`);
        if (!res.ok) throw new Error("No se pudo obtener la enfermedad.");
        const data = await res.json();

        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        setTratamiento(data.tratamiento || "");
        if (data.diagnosticadaEn) setDiagnosticadaEn(new Date(data.diagnosticadaEn));
      } catch (error: any) {
        console.error("❌ Error cargando enfermedad:", error);
        Alert.alert("Error", "No se pudo cargar la información de la enfermedad.");
      } finally {
        setLoading(false);
      }
    };
    fetchEnfermedad();
  }, [enfermedadId]);

  // 📩 Crear o actualizar enfermedad crónica
  const handleSubmit = async () => {
    if (!nombre.trim() || !mascotaId) {
      Alert.alert("Campos requeridos", "Debes ingresar el nombre de la enfermedad.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        mascotaId,
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        tratamiento: tratamiento.trim(),
        diagnosticadaEn,
      };

      const res = await fetch(
        modoEditar ? `${API_BASE}/${enfermedadId}` : `${API_BASE}`,
        {
          method: modoEditar ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert(
          modoEditar ? "✅ Enfermedad actualizada" : "✅ Enfermedad registrada",
          modoEditar
            ? "Los cambios se guardaron correctamente."
            : "El registro se creó con éxito."
        );
        navigation.goBack();
      } else {
        console.error("❌ Error al guardar:", data);
        Alert.alert("Error", data.message || "No se pudo guardar la enfermedad.");
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
        <ActivityIndicator size="large" color="#FF9800" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {modoEditar ? "Editar Enfermedad Crónica" : "Registrar Enfermedad Crónica"}
      </Text>

      {/* Nombre */}
      <Text style={styles.label}>🧬 Nombre de la enfermedad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Diabetes, Insuficiencia renal, etc."
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Fecha diagnosticada */}
      <Text style={styles.label}>📅 Fecha de diagnóstico</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarPickerFecha(true)}
      >
        <Text style={styles.dateText}>{diagnosticadaEn.toLocaleDateString("es-ES")}</Text>
      </TouchableOpacity>

      {mostrarPickerFecha && (
        <DateTimePicker
          value={diagnosticadaEn}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setMostrarPickerFecha(false);
            if (selectedDate) setDiagnosticadaEn(selectedDate);
          }}
        />
      )}

      {/* Descripción */}
      <Text style={styles.label}>🩺 Descripción (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Descripción breve de la enfermedad"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Tratamiento */}
      <Text style={styles.label}>💊 Tratamiento (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Tratamiento o cuidados necesarios"
        multiline
        value={tratamiento}
        onChangeText={setTratamiento}
      />

      {/* Botón Guardar */}
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
            : "Guardar Enfermedad"}
        </Text>
      </TouchableOpacity>

      {/* Botón Cancelar */}
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
    backgroundColor: "#FF9800",
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
