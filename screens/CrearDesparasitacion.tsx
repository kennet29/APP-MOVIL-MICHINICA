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

type CrearDesparasitacionRouteProp = RouteProp<
  RootStackParamList,
  "CrearDesparasitacion"
>;

export default function CrearDesparasitacion() {
  const route = useRoute<CrearDesparasitacionRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId, desparasitacionId } = route.params || {};
  const [producto, setProducto] = useState("");
  const [dosis, setDosis] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [proxima, setProxima] = useState<Date | null>(null);
  const [notas, setNotas] = useState("");
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [mostrarPickerProxima, setMostrarPickerProxima] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const API_BASE = "https://backendmaguey.onrender.com/api/desparacitaciones";

  useEffect(() => {
    const fetchDesparasitacion = async () => {
      if (!desparasitacionId) return;
      setModoEditar(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/${desparasitacionId}`);
        if (!res.ok) throw new Error("No se pudo obtener el registro.");
        const data = await res.json();
        setProducto(data.producto || "");
        setDosis(data.dosis || "");
        setTipo(data.tipo || "");
        if (data.fecha) setFecha(new Date(data.fecha));
        if (data.proxima) setProxima(new Date(data.proxima));
        setNotas(data.notas || "");
      } catch (error: any) {
        console.error("❌ Error cargando desparasitación:", error);
        Alert.alert("Error", "No se pudo cargar la información del registro.");
      } finally {
        setLoading(false);
      }
    };
    fetchDesparasitacion();
  }, [desparasitacionId]);

  const handleSubmit = async () => {
    if (!producto.trim() || !dosis.trim() || !tipo.trim() || !fecha) {
      Alert.alert("Campos requeridos", "Completa todos los campos obligatorios.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        mascotaId,
        producto: producto.trim(),
        dosis: dosis.trim(),
        tipo: tipo.trim(),
        fecha,
        proxima,
        notas: notas.trim(),
      };
      const res = await fetch(
        modoEditar ? `${API_BASE}/${desparasitacionId}` : `${API_BASE}`,
        {
          method: modoEditar ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (res.ok) {
        Alert.alert(
          modoEditar ? "✅ Desparasitación actualizada" : "✅ Desparasitación registrada",
          modoEditar
            ? "Los cambios se guardaron correctamente."
            : "El registro se creó con éxito."
        );
        navigation.goBack();
      } else {
        console.error("❌ Error al guardar:", data);
        Alert.alert("Error", data.message || "No se pudo guardar el registro.");
      }
    } catch (error: any) {
      console.error("❌ Error al conectar:", error);
      Alert.alert("Error", "Ocurrió un problema al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };
  if (loading && modoEditar) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#673AB7" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {modoEditar ? "Editar Desparasitación" : "Registrar Desparasitación"}
      </Text>

      <Text style={styles.label}>🧴 Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Drontal, Ivermectina, etc."
        value={producto}
        onChangeText={setProducto}
      />
      <Text style={styles.label}>💊 Dosis</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 5 ml/kg o 1 tableta"
        value={dosis}
        onChangeText={setDosis}
      />
      <Text style={styles.label}>🧬 Tipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Interna, Externa o Mixta"
        value={tipo}
        onChangeText={setTipo}
      />
      <Text style={styles.label}>📅 Fecha de aplicación</Text>
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
      <Text style={styles.label}>📆 Próxima desparasitación (opcional)</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarPickerProxima(true)}
      >
        <Text style={styles.dateText}>
          {proxima
            ? proxima.toLocaleDateString("es-ES")
            : "Seleccionar fecha (opcional)"}
        </Text>
      </TouchableOpacity>

      {mostrarPickerProxima && (
        <DateTimePicker
          value={proxima || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setMostrarPickerProxima(false);
            if (selectedDate) setProxima(selectedDate);
          }}
        />
      )}

      {/* Notas */}
      <Text style={styles.label}>📝 Notas (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Detalles adicionales o recordatorios"
        multiline
        value={notas}
        onChangeText={setNotas}
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
            : "Guardar Desparasitación"}
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
    backgroundColor: "#673AB7",
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
