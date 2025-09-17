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
import ZoonicaTitle from "./Titulo"; 

export default function MisionVisionScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<"Home" | "Profile" | "Mascota" | "MisionVision">(
    "MisionVision"
  );

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const handleTabPress = (tab: "Home" | "Profile" | "Mascota" | "MisionVision") => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} style={{ marginBottom: 10 }}>

        <View style={{ marginBottom: 5, alignItems: "center", marginTop: 50 }}>
          <ZoonicaTitle
            size={48}
            colors={["#e87170", "#f49953", "#9d7bb6", "#00BFFF", "#FFA500"]}
          />

          <Image
            source={require("./QuinesSomos.png")}
            style={{ width: "100%", height: 320, resizeMode: "contain", marginTop: 15 }}
          />
        </View>

        <View style={[styles.card, { borderColor: "#e87170" }]}>
          <View style={styles.imageContainer}>
            <Image
           
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }}
              style={styles.image}
            />
          </View>
          <Text style={[styles.title, { color: "#e87170" }]}>Misión</Text>
          <Text style={styles.text}>
            Ser líder en la promoción del bienestar animal, brindando un espacio
            digital inclusivo que facilite el control y seguimiento responsable
            de la alimentación, genética, sanidad y manejo de nuestras mascotas,
            conectando a las familias con profesionales veterinarios y fomentando
            una comunidad donde se comparten experiencias, aprendizajes y acciones
            que fortalecen el respeto, el amor y la protección hacia todos los animales.
          </Text>
        </View>

        <View style={[styles.card, { borderColor: "#9d7bb6" }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
              style={styles.image}
            />
          </View>
          <Text style={[styles.title, { color: "#9d7bb6" }]}>Visión</Text>
          <Text style={styles.text}>
            Ser un referente digital del bienestar animal en Nicaragua y la
            región, inspirando a una sociedad más consciente, responsable y
            empática con los animales, donde la tecnología, la educación y la
            comunidad se unen para garantizar un futuro más digno y saludable
            para nuestra fauna.
          </Text>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Image
            source={require("./Valores.png")}
            style={{ width: 500, height: 250, resizeMode: "contain", marginBottom: 50 }}
          />
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
