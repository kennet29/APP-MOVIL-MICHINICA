import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// ✅ Importa el menú como componente
import BottomMenu from "./Menu";

export default function Guia({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  // 👇 Aquí cambiamos para que use los mismos tabs que tu menú
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  >("Home");

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const handleTabPress = (
    tab: "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  ) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  // 🔹 Lista de animales (Hámster → Peces)
  const animals = [
    { name: "Perro", route: "VacunasPerros", icon: "dog", color: "#f49953" },
    { name: "Gato", route: "VacunasGatos", icon: "cat", color: "#9d7bb6" },
    { name: "Conejo", route: "Conejos", icon: "rabbit", color: "#e87170" },
    { name: "Peces", route: "Peces", icon: "fish", color: "#329bd7" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Guía de Animales Domésticos</Text>

        {/* 🔹 Tarjetas */}
        <View style={styles.cardsContainer}>
          {animals.map((animal, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: animal.color }]}
              onPress={() => navigation.navigate(animal.route)}
            >
              <MaterialCommunityIcons
                name={animal.icon as any}
                size={60}
                color="#fff"
              />
              <Text style={styles.cardText}>{animal.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ✅ Menú importado */}
      <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    fontFamily: "Poppins_Bold",
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    width: "47%",
    height: 170,
    borderRadius: 18,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  cardText: {
    marginTop: 14,
    fontFamily: "Poppins_Bold",
    color: "#fff",
    fontSize: 20,
  },
});
