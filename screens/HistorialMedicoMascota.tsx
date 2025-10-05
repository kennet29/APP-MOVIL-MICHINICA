import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type HistorialRouteProp = RouteProp<
  RootStackParamList,
  "HistorialMedicoMascota"
>;

type MascotaDetalle = {
  _id: string;
  nombre: string;
};

export default function HistorialMedicoMascota() {
  const route = useRoute<HistorialRouteProp>();
  const { mascotaId } = route.params;

  const [mascota, setMascota] = useState<MascotaDetalle | null>(null);
  const [vacunas, setVacunas] = useState<string[]>([]);
  const [operaciones, setOperaciones] = useState<string[]>([]);
  const [desparasitaciones, setDesparasitaciones] = useState<string[]>([]);
  const [enfermedades, setEnfermedades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Info general mascota
        const resMascota = await fetch(
          `https://backendmaguey.onrender.com/api/mascotas/${mascotaId}`
        );
        const dataMascota = await resMascota.json();
        setMascota(dataMascota);

        // 🔹 Vacunas
        const resVacunas = await fetch(
          `https://backendmaguey.onrender.com/api/vacunas/mascota/${mascotaId}`
        );
        setVacunas(await resVacunas.json());

        // 🔹 Operaciones
        const resOperaciones = await fetch(
          `https://backendmaguey.onrender.com/api/operaciones/mascota/${mascotaId}`
        );
        setOperaciones(await resOperaciones.json());

        // 🔹 Desparasitaciones
        const resDesparasitaciones = await fetch(
          `https://backendmaguey.onrender.com/api/desparacitaciones/mascota/${mascotaId}`
        );
        setDesparasitaciones(await resDesparasitaciones.json());

        // 🔹 Enfermedades
        const resEnfermedades = await fetch(
          `https://backendmaguey.onrender.com/api/enfermedades/mascota/${mascotaId}`
        );
        setEnfermedades(await resEnfermedades.json());

      } catch (error) {
        console.error("❌ Error cargando historial médico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      <Tabla titulo="Vacunas" datos={vacunas} />
      <Tabla titulo="Operaciones" datos={operaciones} />
      <Tabla titulo="Desparasitaciones" datos={desparasitaciones} />
      <Tabla titulo="Enfermedades crónicas" datos={enfermedades} />
    </ScrollView>
  );
}

// 📌 Tabla reutilizable
function Tabla({ titulo, datos }: { titulo: string; datos?: any[] }) {
  return (
    <View style={styles.table}>
      <Text style={styles.tableTitle}>{titulo}</Text>
      {datos && datos.length > 0 ? (
        datos.map((item, idx) => (
          <View key={idx} style={styles.row}>
            {/* 👇 Ajusta si la API devuelve objetos en vez de strings */}
            <Text style={styles.cell}>{item.nombre || item}</Text>
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
