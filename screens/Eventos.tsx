import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";

import ZoonicaTitle from "./Titulo";
import BottomMenu from "./Menu";

export default function EventosActivos({ navigation }: any) {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  >("Home");

  const API_URL = "https://backendmaguey.onrender.com/api/eventos/activos";
  const fetchEventos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const eventosActivos = data.eventos.filter(
        (e: any) => e.estado !== "finalizado"
      );

      setEventos(eventosActivos);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleTabPress = (
    tab: "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  ) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (eventos.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar hidden />
        <View style={styles.center}>
          <ZoonicaTitle size={40} />
          <Text style={styles.emptyText}>No hay eventos activos</Text>
        </View>
        <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />
      <View style={styles.header}>
        <ZoonicaTitle size={40} />
        <Text style={styles.headerSubtitle}>Eventos Activos</Text>
      </View>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchEventos();
            }}
            colors={["#1DB954"]}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.desc}>{item.descripcion}</Text>
            <Text style={styles.info}>
              📍 {item.ubicacion} | ⏰{" "}
              {new Date(item.fechaInicio).toLocaleDateString()}
            </Text>
            <Text style={styles.estado}>Estado: {item.estado}</Text>
            <Text style={styles.participantes}>
              Participantes: {item.cantidadParticipantes || 0}
            </Text>
          </TouchableOpacity>
        )}
      />

      <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#333",
    marginTop: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1DB954",
  },
  desc: {
    fontSize: 14,
    color: "#444",
    marginVertical: 5,
  },
  info: {
    fontSize: 13,
    color: "#777",
  },
  estado: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
  participantes: {
    fontSize: 12,
    color: "#333",
    marginTop: 3,
  },
});
