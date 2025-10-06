import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootStackParamList } from "../App";

type HistorialRouteProp = RouteProp<
  RootStackParamList,
  "HistorialMedicoMascota"
>;

type MascotaDetalle = {
  _id: string;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  cumpleaños?: string;
  descripcion?: string;
  fotoPerfilId?: string | null;
};

export default function HistorialMedicoMascota() {
  const route = useRoute<HistorialRouteProp>();
  const navigation = useNavigation<any>();
  const { mascotaId } = route.params;

  const [mascota, setMascota] = useState<MascotaDetalle | null>(null);
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [operaciones, setOperaciones] = useState<any[]>([]);
  const [desparasitaciones, setDesparasitaciones] = useState<any[]>([]);
  const [enfermedades, setEnfermedades] = useState<any[]>([]);
  const [visitas, setVisitas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = {
        mascota: `https://backendmaguey.onrender.com/api/mascotas/${mascotaId}`,
        vacunas: `https://backendmaguey.onrender.com/api/vacunas/mascota/${mascotaId}`,
        operaciones: `https://backendmaguey.onrender.com/api/operaciones/mascota/${mascotaId}`,
        desparasitaciones: `https://backendmaguey.onrender.com/api/desparacitaciones/mascota/${mascotaId}`,
        enfermedades: `https://backendmaguey.onrender.com/api/enfermedades/mascota/${mascotaId}`,
        visitas: `https://backendmaguey.onrender.com/api/visitas/mascota/${mascotaId}`,
      };

      const fetchSafe = async (key: string, url: string) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return [];
          const type = res.headers.get("content-type");
          if (!type?.includes("application/json")) return [];
          const data = await res.json();
          return Array.isArray(data) ? data : [data];
        } catch {
          return [];
        }
      };

      try {
        const [
          dataMascota,
          dataVacunas,
          dataOperaciones,
          dataDesparas,
          dataEnfer,
          dataVisitas,
        ] = await Promise.all([
          fetchSafe("mascota", endpoints.mascota),
          fetchSafe("vacunas", endpoints.vacunas),
          fetchSafe("operaciones", endpoints.operaciones),
          fetchSafe("desparasitaciones", endpoints.desparasitaciones),
          fetchSafe("enfermedades", endpoints.enfermedades),
          fetchSafe("visitas", endpoints.visitas),
        ]);

        setMascota(dataMascota[0] || null);
        setVacunas(dataVacunas);
        setOperaciones(dataOperaciones);
        setDesparasitaciones(dataDesparas);
        setEnfermedades(dataEnfer);
        setVisitas(dataVisitas);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mascotaId]);

  const calcularEdad = (cumpleaños?: string) => {
    if (!cumpleaños) return "N/D";
    const hoy = new Date();
    const cumple = new Date(cumpleaños);
    const edad = hoy.getFullYear() - cumple.getFullYear();
    return edad > 0 ? `${edad} años` : "Menos de 1 año";
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando historial médico...</Text>
      </View>
    );

  if (!mascota)
    return (
      <View style={styles.errorContainer}>
        <FontAwesome5 name="exclamation-triangle" size={40} color="#ff4444" />
        <Text style={styles.errorText}>No se encontró la mascota</Text>
      </View>
    );

  const fotoUrl = mascota.fotoPerfilId
    ? `https://backendmaguey.onrender.com/api/mascotas/foto/${mascota.fotoPerfilId}`
    : "https://via.placeholder.com/300x200.png?text=Sin+Foto";

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Historial médico de {mascota.nombre}</Text>

      {/* 📸 Información general */}
      <View style={styles.card}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <Text style={styles.petName}>{mascota.nombre}</Text>
        <Text style={styles.petData}>🐾 Especie: {mascota.especie}</Text>
        <Text style={styles.petData}>🧬 Raza: {mascota.raza || "N/D"}</Text>
        <Text style={styles.petData}>⚧ Sexo: {mascota.sexo}</Text>
        <Text style={styles.petData}>🎂 Edad: {calcularEdad(mascota.cumpleaños)}</Text>
        {mascota.descripcion ? (
          <Text style={styles.description}>📝 {mascota.descripcion}</Text>
        ) : null}
      </View>

      {/* 🔹 Historial */}
      <Tabla
        titulo="💉 Vacunas"
        datos={vacunas}
        color="#4CAF50"
        onAgregar={() => navigation.navigate("CrearVacuna", { mascotaId })}
        onEditar={(id) => navigation.navigate("EditarVacuna", { id, mascotaId })}
      />
      <Tabla
        titulo="🏥 Operaciones"
        datos={operaciones}
        color="#FF9800"
        onAgregar={() => navigation.navigate("CrearOperacion", { mascotaId })}
        onEditar={(id) => navigation.navigate("EditarOperacion", { id, mascotaId })}
      />
      <Tabla
        titulo="🪱 Desparasitaciones"
        datos={desparasitaciones}
        color="#673AB7"
        onAgregar={() => navigation.navigate("CrearDesparasitacion", { mascotaId })}
        onEditar={(id) => navigation.navigate("EditarDesparasitacion", { id, mascotaId })}
      />
      <Tabla
        titulo="⚕️ Enfermedades crónicas"
        datos={enfermedades}
        color="#E91E63"
        onAgregar={() => navigation.navigate("CrearEnfermedad", { mascotaId })}
        onEditar={(id) => navigation.navigate("EditarEnfermedad", { id, mascotaId })}
      />
      <Tabla
        titulo="🩺 Visitas médicas"
        datos={visitas}
        color="#03A9F4"
        onAgregar={() => navigation.navigate("CrearVisita", { mascotaId })}
        onEditar={(id) => navigation.navigate("EditarVisita", { id, mascotaId })}
      />
    </ScrollView>
  );
}

// 📋 Tabla con 3 columnas y desplazamiento lateral
function Tabla({
  titulo,
  datos,
  color,
  onAgregar,
  onEditar,
}: {
  titulo: string;
  datos?: any[];
  color: string;
  onAgregar: () => void;
  onEditar: (id: string) => void;
}) {
  const formatearFecha = (f?: string) => {
    if (!f) return "Sin fecha";
    try {
      return new Date(f).toLocaleDateString("es-ES");
    } catch {
      return f;
    }
  };

  return (
    <View style={styles.table}>
      <View style={[styles.tableHeader, { backgroundColor: color }]}>
        <Text style={styles.tableTitle}>{titulo}</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAgregar}>
          <FontAwesome5 name="plus" size={14} color="#fff" />
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: "100%" }}>
          {datos && datos.length > 0 ? (
            datos.map((item, idx) => (
              <View key={idx} style={styles.row}>
                <View style={styles.column1}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.cell}
                  >
                    {item.motivo || item.nombre || item.descripcion || "Sin descripción"}
                  </Text>
                </View>

                <View style={styles.column2}>
                  <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
                </View>

                <View style={styles.column3}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEditar(item._id)}
                  >
                    <FontAwesome5 name="edit" size={16} color="#007bff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>
              Aún no hay registros para esta sección
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#222",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: { width: 170, height: 170, borderRadius: 85, marginBottom: 10 },
  petName: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  petData: { fontSize: 16, color: "#444", marginVertical: 2 },
  description: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
  table: {
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tableTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000033",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  addButtonText: { color: "#fff", fontSize: 13, marginLeft: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 5,
    width: 325, // 🔹 ancho total desplazable
  },
  column1: { flex: 2, paddingRight: 2, minWidth: 50 },
  column2: { flex: 1, alignItems: "center", minWidth: 50 },
  column3: { flex: 0.5, alignItems: "center", minWidth: 50 },
  cell: { fontSize: 14, color: "#333" },
  fecha: { fontSize: 13, color: "#777" },
  editButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#e6f0ff",
  },
  noData: {
    padding: 10,
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: {
    marginTop: 10,
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});
