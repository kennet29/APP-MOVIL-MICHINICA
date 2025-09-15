import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import BottomMenu from "./Menu";
import ZoonicaTitle from "./Titulo"; // Importamos el título con colores

export default function MisionVisionScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<"Home" | "Profile" | "Mascota" | "MisionVision">("MisionVision");

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View>
      
      </View>
    );
  }

  const handleTabPress = (tab: "Home" | "Profile" | "Mascota" | "MisionVision") => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} style={{ marginBottom: 80 }}>
        
        {/* Título Zoonica */}
        <View style={{ marginBottom: 20 }}>
          <ZoonicaTitle
            size={48}
            colors={["#1DB954", "#329bd7", "#F39C12", "#E74C3C", "#8E44AD", "#16A085", "#D35400"]}
          />
        </View>

        {/* Misión */}
        <View style={[styles.card, { borderColor: "#1DB954" }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }}
              style={styles.image}
            />
          </View>
          <Text style={[styles.title, { color: "#1DB954" }]}>Misión</Text>
          <Text style={styles.text}>
            Ser líder en la promoción del bienestar animal, brindando un espacio
            digital inclusivo que facilite el control y seguimiento responsable
            de la alimentación, genética, sanidad y manejo de nuestras mascotas,
            conectando a las familias con profesionales veterinarios y fomentando
            una comunidad donde se comparten experiencias, aprendizajes y acciones
            que fortalecen el respeto, el amor y la protección hacia todos los animales.
          </Text>
        </View>

        {/* Visión */}
        <View style={[styles.card, { borderColor: "#329bd7" }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
              style={styles.image}
            />
          </View>
          <Text style={[styles.title, { color: "#329bd7" }]}>Visión</Text>
          <Text style={styles.text}>
            Ser un referente digital del bienestar animal en Nicaragua y la
            región, inspirando a una sociedad más consciente, responsable y
            empática con los animales, donde la tecnología, la educación y la
            comunidad se unen para garantizar un futuro más digno y saludable
            para nuestra fauna.
          </Text>
        </View>
      </ScrollView>

      {/* BottomMenu fijo */}
      <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 3,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_Bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    color: "#555",
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});