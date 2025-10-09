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
          if (!res.ok) {
            console.warn(`⚠️ [${key}] devolvió status ${res.status}`);
            return [];
          }
          const contentType = res.headers.get("content-type");
          if (!contentType?.includes("application/json")) {
            console.warn(`⚠️ [${key}] devolvió contenido no JSON`);
            return [];
          }
          const data = await res.json();
          return Array.isArray(data) ? data : [data];
        } catch (err: any) {
          console.warn(`⚠️ Error al obtener ${key}:`, err.message);
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
      } catch (error) {
        console.error("❌ Error general al cargar historial:", error);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando historial médico...</Text>
      </View>
    );
  }

  if (!mascota) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome5 name="exclamation-triangle" size={40} color="#ff4444" />
        <Text style={styles.errorText}>No se encontró la mascota</Text>
      </View>
    );
  }

  const fotoUrl = mascota.fotoPerfilId
    ? `https://backendmaguey.onrender.com/api/mascotas/foto/${mascota.fotoPerfilId}`
    : "https://via.placeholder.com/300x200.png?text=Sin+Foto";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={styles.title}>Historial médico de {mascota.nombre}</Text>

      {/* 📸 Información de la mascota */}
      <View style={styles.card}>
        <Image source={{ uri: fotoUrl }} style={styles.image} />
        <Text style={styles.petName}>{mascota.nombre}</Text>
        <Text style={styles.petData}>🐾 Especie: {mascota.especie}</Text>
        <Text style={styles.petData}>🧬 Raza: {mascota.raza || "N/D"}</Text>
        <Text style={styles.petData}>⚧ Sexo: {mascota.sexo}</Text>
        <Text style={styles.petData}>
          🎂 Edad: {calcularEdad(mascota.cumpleaños)}
        </Text>
        {mascota.descripcion ? (
          <Text style={styles.description}>📝 {mascota.descripcion}</Text>
        ) : null}
      </View>

      {/* 🔹 Secciones médicas */}
      <Tabla
        titulo="💉 Vacunas"
        datos={vacunas}
        color="#4CAF50"
        onAgregar={() => navigation.navigate("CrearVacuna", { mascotaId })}
      />

      <Tabla
        titulo="🏥 Operaciones"
        datos={operaciones}
        color="#FF9800"
        onAgregar={() => navigation.navigate("CrearOperacion", { mascotaId })}
      />

      <Tabla
        titulo="🪱 Desparasitaciones"
        datos={desparasitaciones}
        color="#673AB7"
        onAgregar={() =>
          navigation.navigate("CrearDesparasitacion", { mascotaId })
        }
      />

      <Tabla
        titulo="⚕️ Enfermedades crónicas"
        datos={enfermedades}
        color="#E91E63"
        onAgregar={() => navigation.navigate("CrearEnfermedad", { mascotaId })}
      />

      <Tabla
        titulo="🩺 Visitas médicas"
        datos={visitas}
        color="#03A9F4"
        onAgregar={() => navigation.navigate("CrearVisita", { mascotaId })}
      />
    </ScrollView>
  );
}

// 📋 Tabla reutilizable
function Tabla({
  titulo,
  datos,
  color,
  onAgregar,
}: {
  titulo: string;
  datos?: any[];
  color: string;
  onAgregar: () => void;
}) {
  const formatearFecha = (f: string) => {
    try {
      const d = new Date(f);
      return d.toLocaleDateString("es-ES");
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

      {datos && datos.length > 0 ? (
        datos.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.cell}>
              {item.nombre ||
                item.motivo ||
                item.producto ||
                item.tipo ||
                (item.fecha ? formatearFecha(item.fecha) : "") ||
                item.descripcion ||
                "Registro sin descripción"}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>Aún no hay registros en esta sección</Text>
      )}
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
  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginBottom: 10,
  },
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  petData: {
    fontSize: 16,
    color: "#444",
    marginVertical: 2,
  },
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
  tableTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000033",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 5,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: { fontSize: 14, color: "#333" },
  noData: {
    padding: 10,
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
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
  },
  errorText: {
    marginTop: 10,
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});
