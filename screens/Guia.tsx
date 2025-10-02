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

import BottomMenu from "./Menu";
import ZoonicaTitle from "./Titulo";

export default function Guia({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

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
        <ZoonicaTitle size={42} />

        <Text style={styles.subtitle}>Guía de Animales Domésticos</Text>
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
  subtitle: {
    fontSize: 22,
    marginTop: 10,
    fontFamily: "Poppins_Bold",
    textAlign: "center",
    color: "#333",
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