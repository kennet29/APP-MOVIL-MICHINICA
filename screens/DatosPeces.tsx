// screens/DatosPeces.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DatosPeces() {
  const [peces, setPeces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Peces comunes de acuario dulce
  const especies = ["Guppy", "Betta", "Goldfish", "Corydoras", "Angelfish"];

  useEffect(() => {
    const fetchPeces = async () => {
      try {
        const resultados: any[] = [];

        for (let especie of especies) {
          const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            especie
          )}`;
          const res = await fetch(url);

          // ⚡ Validar que sea JSON
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.warn(`No hay datos en Wikipedia para: ${especie}`);
            continue; // saltar este pez
          }

          const data = await res.json();

          resultados.push({
            nombre: data.title,
            descripcion: data.description,
            extracto: data.extract,
            imagen: data.thumbnail?.source
              ? data.thumbnail.source.replace("http:", "https:")
              : null,
          });
        }

        setPeces(resultados);
      } catch (err) {
        console.error("Error al obtener peces:", err);
        setError("No se pudieron cargar los peces.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeces();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#329bd7" />
        <Text>Cargando datos de peces...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🐠 Peces de Acuario Dulce</Text>

      {peces.map((pez, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="fish" size={28} color="#fff" />
            <Text style={styles.cardTitle}>{pez.nombre}</Text>
          </View>

          {/* Imagen */}
          {pez.imagen ? (
            <Image source={{ uri: encodeURI(pez.imagen) }} style={styles.image} />
          ) : (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
              }}
              style={styles.image}
            />
          )}

          <Text style={styles.cardText}>
            <Text style={styles.bold}>Descripción:</Text>{" "}
            {pez.descripcion || "No disponible"}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>Detalles:</Text>{" "}
            {pez.extracto?.slice(0, 200) || "No hay información"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#329bd7",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
  cardText: { fontSize: 15, marginBottom: 6, color: "#333" },
  bold: { fontWeight: "bold" },
});
