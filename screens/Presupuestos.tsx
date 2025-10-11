import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

type Mascota = {
  _id: string;
  nombre: string;
  especie: string;
};

type MascotaGasto = {
  mascotaId: string;
  nombre: string;
  especie: string;
  gastoTotal: number;
};

export default function Presupuestos({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [gastoTotalUsuario, setGastoTotalUsuario] = useState(0);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [mascotasGastos, setMascotasGastos] = useState<MascotaGasto[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const usuarioData = await AsyncStorage.getItem("usuario");
      if (!usuarioData) {
        Alert.alert("Error", "No se encontró información del usuario");
        setLoading(false);
        return;
      }

      const usuario = JSON.parse(usuarioData);
      setUsuarioId(usuario._id);

      // 🐾 Obtener mascotas del usuario
      const resMascotas = await fetch(
        `https://backendmaguey.onrender.com/api/mascotas/usuario/${usuario._id}`
      );
      const dataMascotas = await resMascotas.json();
      if (!resMascotas.ok) {
        Alert.alert("Error", "No se pudieron obtener las mascotas");
        setLoading(false);
        return;
      }

      setMascotas(dataMascotas);
      // 💰 Obtener presupuesto después de tener mascotas
      await obtenerPresupuesto(usuario._id, dataMascotas);
    } catch (error) {
      console.error("Error al obtener usuario y mascotas:", error);
      setLoading(false);
    }
  };

  const obtenerPresupuesto = async (idUsuario: string, listaMascotas: Mascota[]) => {
    try {
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/presupuesto/usuario/${idUsuario}/total`
      );
      const text = await res.text();
      if (!text.startsWith("{") && !text.startsWith("[")) {
        console.error("Respuesta no JSON:", text);
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      if (res.ok) {
        setGastoTotalUsuario(data.gastoTotalUsuario || 0);
        const lista: MascotaGasto[] = listaMascotas.map((m) => ({
          mascotaId: m._id,
          nombre: m.nombre,
          especie: m.especie,
          gastoTotal: data.gastoPorMascota?.[m._id] || 0,
        }));
        setMascotasGastos(lista);
      }
    } catch (error) {
      console.error("Error al obtener presupuesto:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Cargando presupuestos...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Presupuestos</Text>

        <View style={[styles.card, { backgroundColor: "#4C5FD7" }]}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="wallet" size={30} color="#fff" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Gasto Total del Usuario</Text>
            <Text style={styles.amount}>C${gastoTotalUsuario.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Mis Mascotas</Text>

        {mascotasGastos.length === 0 ? (
          <Text style={styles.noData}>No hay mascotas registradas o gastos aún.</Text>
        ) : (
          mascotasGastos.map((m, index) => (
            <View
              key={m.mascotaId}
              style={[styles.card, { backgroundColor: colors[index % colors.length] }]}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="paw" size={30} color="#fff" />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{m.nombre}</Text>
                <Text style={styles.cardSub}>{m.especie}</Text>
                <Text style={styles.amount}>C${m.gastoTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#fff" }]}
                  onPress={() => navigation.navigate("AgregarGasto", { mascotaId: m.mascotaId })}
                >
                  <FontAwesome5 name="plus" size={14} color="#333" />
                  <Text style={styles.buttonText}>Añadir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#333" }]}
                  onPress={() =>
                    navigation.navigate("PresupuestoMascota", { mascotaId: m.mascotaId })
                  }
                >
                  <FontAwesome5 name="list" size={14} color="#fff" />
                  <Text style={[styles.buttonText, { color: "#fff" }]}>Ver</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
}

const colors = ["#e87170", "#f49953", "#9d7bb6", "#00BFFF"];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF", paddingTop: 60, paddingHorizontal: 20 },
  loading: { flex: 1, backgroundColor: "#329bd7", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30, fontFamily: "Poppins_Bold", color: "#333", textAlign: "center", marginBottom: 20 },
  subtitle: { fontSize: 20, fontFamily: "Poppins_Bold", color: "#444", marginTop: 10, marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", padding: 20, borderRadius: 12, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center", marginRight: 15 },
  cardInfo: { flex: 1 },
  cardTitle: { fontFamily: "Poppins_Bold", color: "#fff", fontSize: 16 },
  cardSub: { fontFamily: "Poppins_Regular", color: "#fff", fontSize: 13, marginBottom: 4 },
  amount: { fontFamily: "Poppins_Regular", color: "#fff", fontSize: 18, marginTop: 3 },
  actions: { flexDirection: "column", gap: 8, alignItems: "center" },
  button: { flexDirection: "row", alignItems: "center", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  buttonText: { fontFamily: "Poppins_Regular", fontSize: 13, marginLeft: 5 },
  noData: { fontFamily: "Poppins_Regular", color: "#777", textAlign: "center", marginTop: 20 },
  fab: { position: "absolute", right: 20, bottom: 30, backgroundColor: "#329bd7", width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
});
