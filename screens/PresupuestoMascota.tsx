import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

type PresupuestoMascotaRouteProp = RouteProp<
  RootStackParamList,
  "PresupuestoMascota"
>;

type Gasto = {
  _id: string;
  tipo: string;
  descripcion?: string;
  monto: number;
  fecha: string;
};

export default function PresupuestoMascota() {
  const route = useRoute<PresupuestoMascotaRouteProp>();
  const { mascotaId } = route.params;

  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [total, setTotal] = useState(0);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const data = await AsyncStorage.getItem("usuario");
      if (!data) {
        Alert.alert("Error", "No se encontró información del usuario");
        return;
      }
      const usuario = JSON.parse(data);
      setUsuarioId(usuario._id);
      obtenerPresupuesto(usuario._id);
    } catch (error) {
      console.error("❌ Error al obtener usuario:", error);
    }
  };

  const obtenerPresupuesto = async (idUsuario: string) => {
    try {
      const res = await fetch(
        `https://backendmaguey.onrender.com/api/presupuesto/mascota/${idUsuario}/${mascotaId}`
      );

      const text = await res.text();

      // Si el backend devuelve HTML (404), evita el crash
      if (!text.startsWith("{") && !text.startsWith("[")) {
        console.error("Respuesta no JSON:", text);
        Alert.alert("Error", "No se encontró presupuesto para esta mascota.");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);

      if (res.ok) {
        setGastos(data.gastos || []);
        setTotal(data.total || 0);
      } else {
        console.warn("Error al obtener datos:", res.status);
      }
    } catch (error) {
      console.error("Error al obtener presupuesto por mascota:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando gastos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Presupuesto Detallado</Text>

      <View style={styles.totalCard}>
        <FontAwesome5 name="paw" size={30} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.totalTitle}>Gasto Total</Text>
          <Text style={styles.totalAmount}>C${total.toFixed(2)}</Text>
        </View>
      </View>

      {gastos.length === 0 ? (
        <Text style={styles.noData}>No hay gastos registrados para esta mascota.</Text>
      ) : (
        gastos.map((gasto) => (
          <View key={gasto._id} style={styles.gastoCard}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="coins" size={20} color="#329bd7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipo}>
                {gasto.tipo.charAt(0).toUpperCase() + gasto.tipo.slice(1)}
              </Text>
              <Text style={styles.descripcion}>
                {gasto.descripcion || "Sin descripción"}
              </Text>
              <Text style={styles.monto}>C${gasto.monto.toFixed(2)}</Text>
              <Text style={styles.fecha}>
                {new Date(gasto.fecha).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    padding: 20,
    paddingTop: 60,
  },
  loading: {
    flex: 1,
    backgroundColor: "#329bd7",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins_Bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },
  totalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#329bd7",
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  totalTitle: {
    color: "#fff",
    fontFamily: "Poppins_Bold",
    fontSize: 16,
  },
  totalAmount: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    fontSize: 22,
  },
  gastoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(50,155,215,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  tipo: {
    fontFamily: "Poppins_Bold",
    fontSize: 15,
    color: "#333",
  },
  descripcion: {
    fontFamily: "Poppins_Regular",
    color: "#555",
    fontSize: 13,
  },
  monto: {
    fontFamily: "Poppins_Bold",
    color: "#329bd7",
    fontSize: 16,
    marginTop: 4,
  },
  fecha: {
    fontFamily: "Poppins_Regular",
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  noData: {
    textAlign: "center",
    color: "#777",
    fontFamily: "Poppins_Regular",
    marginTop: 20,
  },
});
