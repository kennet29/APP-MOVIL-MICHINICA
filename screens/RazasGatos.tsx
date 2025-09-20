import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Menu from "./Menu";

type Breed = {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  weight: { metric: string };
  origin: string;
  description: string;
  image?: { url: string };
};

export default function RazasGatos() {
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascota" | "MisionVision"
  >("Mascota");

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(8);

  const handleTabPress = (tab: "Home" | "Profile" | "Mascota" | "MisionVision") => {
    setActiveTab(tab);
  };

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/breeds");
      const data: Breed[] = await res.json();

      // 🔹 Aseguramos que todas tengan imagen
      const breedsWithImages = await Promise.all(
        data.map(async (breed) => {
          if (!breed.image?.url) {
            try {
              const imgRes = await fetch(
                `https://api.thecatapi.com/v1/images/search?breed_id=${breed.id}`
              );
              const imgData = await imgRes.json();
              if (imgData[0]?.url) {
                breed.image = { url: imgData[0].url };
              }
            } catch (err) {
              console.warn("Sin imagen para:", breed.name);
            }
          }
          return breed;
        })
      );

      setBreeds(breedsWithImages);
    } catch (err) {
      console.error("Error cargando razas de gatos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleShowMore = () => {
    setVisible((prev) => prev + 8);
  };

  const cardColors = ["#329bd7", "#f49953", "#e87170", "#60b55d", "#9d7bb6"];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🐱 Razas de Gatos 🐱</Text>
        {loading && <Text style={styles.loading}>Cargando razas...</Text>}

        <FlatList
          data={breeds.slice(0, visible)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: cardColors[index % cardColors.length] },
              ]}
            >
              {/* Imagen asegurada */}
              {item.image?.url ? (
                <Image source={{ uri: item.image.url }} style={styles.image} />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>Sin imagen</Text>
                </View>
              )}

              {/* Info */}
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Origen:</Text> {item.origin || "N/A"}
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Esperanza de vida:</Text>{" "}
                {item.life_span} años
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Peso:</Text> {item.weight.metric} kg
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Temperamento:</Text>{" "}
                {item.temperament || "N/A"}
              </Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
          scrollEnabled={false}
        />

        {visible < breeds.length && (
          <TouchableOpacity style={styles.button} onPress={handleShowMore}>
            <Text style={styles.buttonText}>Mostrar más razas</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Menu activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15, marginBottom: 75 },
  title: {
    marginTop: 50,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#222",
  },
  loading: { textAlign: "center", marginTop: 20, fontSize: 16 },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  noImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  noImageText: { color: "#555", fontSize: 14 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  cardInfo: { fontSize: 14, marginBottom: 5, color: "#fff" },
  cardDescription: {
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
    textAlign: "justify",
    color: "#f9f9f9",
  },
  bold: { fontWeight: "bold" },
  button: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
