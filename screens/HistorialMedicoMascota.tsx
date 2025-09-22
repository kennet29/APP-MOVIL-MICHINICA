import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App"; // 👈 tipo del stack

type HistorialRouteProp = RouteProp<
  RootStackParamList,
  "HistorialMedicoMascota"
>;

type MascotaDetalle = {
  _id: string;
  nombre: string;
  vacunas?: string[];
  operaciones?: string[];
  visitasMedicas?: string[];
  desparasitaciones?: string[];
  enfermedades?: string[];
};

export default function HistorialMedicoMascota() {
  const route = useRoute<HistorialRouteProp>();
  const { mascotaId } = route.params;

  const [mascota, setMascota] = useState<MascotaDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const res = await fetch(
          `https://backendmaguey.onrender.com/api/mascotas/${mascotaId}`
        );
        const data = await res.json();
        setMascota(data);
      } catch (error) {
        console.error("❌ Error cargando historial médico:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [mascotaId]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={{ flex: 1 }} />
    );
  }

  if (!mascota) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No se encontró la mascota
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial médico de {mascota.nombre}</Text>

      <Tabla titulo="Vacunas" datos={mascota.vacunas} />
      <Tabla titulo="Operaciones" datos={mascota.operaciones} />
      <Tabla titulo="Visitas al veterinario" datos={mascota.visitasMedicas} />
      <Tabla titulo="Desparasitaciones" datos={mascota.desparasitaciones} />
      <Tabla titulo="Enfermedades crónicas" datos={mascota.enfermedades} />
    </ScrollView>
  );
}

// 📌 Tabla reutilizable
function Tabla({ titulo, datos }: { titulo: string; datos?: string[] }) {
  return (
    <View style={styles.table}>
      <Text style={styles.tableTitle}>{titulo}</Text>
      {datos && datos.length > 0 ? (
        datos.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.cell}>{item}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No hay registros</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  table: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  tableTitle: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  row: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  cell: { fontSize: 14, color: "#333" },
  noData: { padding: 10, textAlign: "center", color: "#777" },
});
