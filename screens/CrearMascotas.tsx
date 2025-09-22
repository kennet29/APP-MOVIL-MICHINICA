import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // 👈 importamos el tipo del stack

type Mascota = {
  _id: string;
  nombre: string;
  especie: string;
  raza?: string;
  sexo: string;
  cumpleaños?: string;
  fotoPerfilId?: string;
};

type MisMascotasNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "MisMascotas"
>;

export default function MisMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<MisMascotasNavProp>();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await fetch(
          "https://backendmaguey.onrender.com/api/mascotas/usuario/66f5a53a6b8f59e71cc12345"
        );
        const data = await res.json();
        setMascotas(data);
      } catch (error) {
        console.error("❌ Error cargando mascotas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, []);

  const renderCard = ({ item }: { item: Mascota }) => {
    const edadTexto = item.cumpleaños
      ? calcularEdad(item.cumpleaños)
      : "N/D";

    return (
      <View style={styles.card}>
        {/* Foto perfil */}
        <View style={styles.imageWrapper}>
          {item.fotoPerfilId ? (
            <Image
              source={{
                uri: `https://backendmaguey.onrender.com/api/mascotas/foto/${item.fotoPerfilId}`,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{
                uri: "https://via.placeholder.com/100x100.png?text=Mascota",
              }}
              style={styles.image}
            />
          )}
        </View>

        {/* Datos */}
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{item.nombre}</Text>
          <Text style={styles.text}>Especie: {item.especie}</Text>
          <Text style={styles.text}>Raza: {item.raza || "N/D"}</Text>
          <Text style={styles.text}>Sexo: {item.sexo}</Text>
          <Text style={styles.text}>Edad: {edadTexto}</Text>
        </View>

        {/* Botón historial */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("HistorialMedicoMascota", {
              mascotaId: item._id,
            })
          }
        >
          <Text style={styles.buttonText}>Ver historial médico</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Mascotas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#e87170" />
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item._id}
          renderItem={renderCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

// 📌 Función utilitaria para calcular edad
function calcularEdad(fechaIso: string): string {
  const cumpleaños = new Date(fechaIso);
  const hoy = new Date();

  let años = hoy.getFullYear() - cumpleaños.getFullYear();
  let meses = hoy.getMonth() - cumpleaños.getMonth();
  let dias = hoy.getDate() - cumpleaños.getDate();

  if (dias < 0) {
    meses -= 1;
    dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }
  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  if (años > 0) return `${años} año${años > 1 ? "s" : ""}`;
  if (meses > 0) return `${meses} mes${meses > 1 ? "es" : ""}`;
  return `${dias} día${dias > 1 ? "s" : ""}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#f87171",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageWrapper: { alignItems: "center", marginBottom: 10 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  infoWrapper: { marginBottom: 10 },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  text: { fontSize: 14, color: "#fff", marginBottom: 2, textAlign: "center" },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
