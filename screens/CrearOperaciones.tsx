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

type CrearOperacionRouteProp = RouteProp<
  RootStackParamList,
  "CrearOperacion"
>;

export default function CrearOperacion() {
  const route = useRoute<CrearOperacionRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId, operacionId } = route.params || {};

  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [resultado, setResultado] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const API_BASE = "https://backendmaguey.onrender.com/api/operaciones";

  // 🟡 Si viene un ID, se carga la operación existente
  useEffect(() => {
    const fetchOperacion = async () => {
      if (!operacionId) return;
      setModoEditar(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/${operacionId}`);
        if (!res.ok) throw new Error("No se pudo obtener la operación.");
        const data = await res.json();

        setTipo(data.tipo || "");
        if (data.fecha) setFecha(new Date(data.fecha));
        setDescripcion(data.descripcion || "");
        setResultado(data.resultado || "");
        setVeterinario(data.veterinario || "");
      } catch (error: any) {
        console.error("❌ Error cargando operación:", error);
        Alert.alert("Error", "No se pudo cargar la información de la operación.");
      } finally {
        setLoading(false);
      }
    };
    fetchOperacion();
  }, [operacionId]);

  // 📩 Crear o actualizar
  const handleSubmit = async () => {
    if (!tipo.trim() || !fecha || !mascotaId) {
      Alert.alert("Campos requeridos", "Completa los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        mascotaId,
        tipo: tipo.trim(),
        fecha,
        descripcion: descripcion.trim(),
        resultado: resultado.trim(),
        veterinario: veterinario.trim(),
      };

      const res = await fetch(
        modoEditar ? `${API_BASE}/${operacionId}` : `${API_BASE}`,
        {
          method: modoEditar ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert(
          modoEditar ? "✅ Operación actualizada" : "✅ Operación registrada",
          modoEditar
            ? "Los cambios se guardaron correctamente."
            : "El registro se creó con éxito."
        );
        navigation.goBack();
      } else {
        console.error("❌ Error al guardar:", data);
        Alert.alert("Error", data.message || "No se pudo guardar la operación.");
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
        {modoEditar ? "Editar Operación" : "Registrar Operación"}
      </Text>

      {/* Tipo */}
      <Text style={styles.label}>🏥 Tipo de operación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Esterilización, cirugía dental, etc."
        value={tipo}
        onChangeText={setTipo}
      />

      {/* Fecha */}
      <Text style={styles.label}>📅 Fecha</Text>
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

      {/* Veterinario */}
      <Text style={styles.label}>👨‍⚕️ Veterinario (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del veterinario"
        value={veterinario}
        onChangeText={setVeterinario}
      />

      {/* Descripción */}
      <Text style={styles.label}>📝 Descripción (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Detalles adicionales de la operación"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Resultado */}
      <Text style={styles.label}>💬 Resultado (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Resultado o evolución postoperatoria"
        multiline
        value={resultado}
        onChangeText={setResultado}
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
            : "Guardar Operación"}
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
    backgroundColor: "#fff",
    color:"#000",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
    color:"#000",
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
