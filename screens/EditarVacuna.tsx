import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootStackParamList } from "../App";

type EditarVacunaRouteProp = RouteProp<RootStackParamList, "EditarVacuna">;

export default function EditarVacuna() {
  const route = useRoute<EditarVacunaRouteProp>();
  const navigation = useNavigation<any>();
  const { vacunaId, mascotaId } = route.params; // ✅ nombre correcto y tipado consistente

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ✅ Validar si vacunaId existe (previene GET /undefined)
  if (!vacunaId) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome5 name="exclamation-triangle" size={40} color="#ff4444" />
        <Text style={styles.errorText}>ID de vacuna no válido</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={14} color="#007bff" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const API_URL = `https://backendmaguey.onrender.com/api/vacunas/${vacunaId}`;

  // 🔹 Cargar vacuna existente
  useEffect(() => {
    const fetchVacuna = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener la vacuna");
        const data = await res.json();
        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        if (data.fecha) setFecha(new Date(data.fecha));
      } catch (error) {
        Alert.alert("❌ Error", "No se pudo cargar la vacuna");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVacuna();
  }, [vacunaId]);

  // 🔹 Actualizar vacuna
  const handleActualizar = async () => {
    if (!nombre.trim()) {
      Alert.alert("⚠️ Campo requerido", "El nombre de la vacuna es obligatorio");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          fecha,
          mascotaId,
        }),
      });

      if (!res.ok) throw new Error("No se pudo actualizar la vacuna");

      Alert.alert("✅ Éxito", "La vacuna se actualizó correctamente", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("HistorialMedicoMascota", {
              mascotaId,
              refresh: true,
            }),
        },
      ]);
    } catch (error: any) {
      Alert.alert("❌ Error", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando vacuna...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Vacuna</Text>

      {/* 🧾 Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Vacuna antirrábica"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* 📝 Descripción */}
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalles adicionales..."
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* 📅 Fecha */}
      <Text style={styles.label}>Fecha de aplicación</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <FontAwesome5 name="calendar-alt" size={16} color="#007bff" />
        <Text style={styles.dateText}>{fecha.toLocaleDateString("es-ES")}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      {/* 💾 Guardar cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={handleActualizar}>
        <FontAwesome5 name="save" size={16} color="#fff" />
        <Text style={styles.saveText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* ↩️ Volver */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={14} color="#007bff" />
        <Text style={styles.cancelText}>Volver</Text>
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
    marginBottom: 25,
    textAlign: "center",
    color: "#222",
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 15,
    marginLeft: 8,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cancelText: {
    color: "#007bff",
    fontSize: 15,
    marginLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  backText: {
    color: "#007bff",
    marginLeft: 6,
    fontSize: 15,
  },
});