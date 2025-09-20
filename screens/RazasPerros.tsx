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
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  weight: { metric: string };
  height: { metric: string };
  bred_for?: string;
  breed_group?: string;
  image?: { url: string };
};

const traducciones: { [key: string]: string } = {
  Friendly: "Amigable",
  Energetic: "Energético",
  Docile: "Dócil",
  Stubborn: "Testarudo",
  Active: "Activo",
  Protective: "Protector",
  Alert: "Alerta",
  Gentle: "Gentil",
  Loyal: "Leal",
  Independent: "Independiente",
  Playful: "Juguetón",
  Intelligent: "Inteligente",
  Calm: "Tranquilo",
  Courageous: "Valiente",
  Affectionate: "Cariñoso",
  Sporting: "Deportivo",
  Hound: "Sabueso",
  Working: "Trabajo",
  Terrier: "Terrier",
  Toy: "Miniatura",
  "Non-Sporting": "No deportivo",
  Herding: "De pastoreo",
};

// 🎨 Colores de cards
const colores = ["#329bd7", "#f49953", "#e87170", "#60b55d", "#9d7bb6"];

export default function RazasPerros() {
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascota" | "MisionVision"
  >("Mascota");

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(10);

  const handleTabPress = (tab: "Home" | "Profile" | "Mascota" | "MisionVision") => {
    setActiveTab(tab);
  };

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data: Breed[] = await res.json();

      const breedsWithImages = await Promise.all(
        data.map(async (breed) => {
          if (!breed.image?.url) {
            try {
              const imgRes = await fetch(
                `https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}`
              );
              const imgData = await imgRes.json();
              if (imgData[0]?.url) {
                breed.image = { url: imgData[0].url };
              }
            } catch (err) {
              console.warn(`No se encontró imagen para ${breed.name}`);
            }
          }
          return breed;
        })
      );

      setBreeds(breedsWithImages);
    } catch (err) {
      console.error("Error cargando razas", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleShowMore = () => {
    setVisible((prev) => prev + 10);
  };

  const traducirTemperamento = (temperament: string | undefined) => {
    if (!temperament) return "N/A";
    return temperament
      .split(", ")
      .map((t) => traducciones[t] || t)
      .join(", ");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🐶 Razas de Perros</Text>
        {loading && <Text style={styles.loading}>Cargando razas...</Text>}

        <FlatList
          data={breeds.slice(0, visible)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: colores[index % colores.length] },
              ]}
            >
              {item.image?.url ? (
                <Image source={{ uri: item.image.url }} style={styles.image} />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>Sin imagen</Text>
                </View>
              )}

              <Text style={styles.cardTitle}>{item.name}</Text>

              {item.breed_group && (
                <Text style={styles.cardInfo}>
                  <Text style={styles.bold}>Grupo:</Text>{" "}
                  {traducciones[item.breed_group] || item.breed_group}
                </Text>
              )}

              {item.bred_for && (
                <Text style={styles.cardInfo}>
                  <Text style={styles.bold}>Criado para:</Text> {item.bred_for}
                </Text>
              )}

              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Temperamento:</Text>{" "}
                {traducirTemperamento(item.temperament)}
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Altura:</Text> {item.height.metric} cm
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Peso:</Text> {item.weight.metric} kg
              </Text>
              <Text style={styles.cardInfo}>
                <Text style={styles.bold}>Esperanza de vida:</Text>{" "}
                {item.life_span}
              </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#222",
  },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#555" },
  loading: { textAlign: "center", marginTop: 20, fontSize: 16 },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
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
  cardTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#fff" },
  cardInfo: { fontSize: 14, marginBottom: 5, color: "#fff" },
  bold: { fontWeight: "bold", color: "#fff" },
  button: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
