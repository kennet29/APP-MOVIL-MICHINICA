// screens/GuiaTortugas.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function GuiaTortugas() {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Guía Completa de Tortugas Domésticas</Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/11/23/13/45/turtle-1850195_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🐢 Introducción</Text>
      <Text style={styles.text}>
        Las tortugas son reptiles muy populares como mascotas por su apariencia
        tranquila y longevidad. Pueden vivir entre 20 y 50 años (algunas especies
        incluso más), por lo que son una responsabilidad a largo plazo. Existen
        tortugas acuáticas, semiacuáticas y terrestres, y cada una tiene
        necesidades de hábitat específicas.
      </Text>

      <Text style={styles.sectionTitle}>🌿 Tipos de Tortugas Domésticas</Text>
      <Text style={styles.text}>
        - **Tortugas acuáticas**: como la de orejas rojas. Necesitan un acuaterrario
        con agua para nadar y una zona seca para descansar.{"\n"}
        - **Tortugas terrestres**: como la rusa o mediterránea. Requieren un
        terrario amplio con sustrato y lámpara de calor.{"\n"}
        - **Tortugas semiacuáticas**: combinan ambos entornos y disfrutan tanto
        del agua como de la tierra.{"\n"}
      </Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/04/22/19/19/turtle-1341516_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🥬 Alimentación</Text>
      <Text style={styles.text}>
        La dieta depende del tipo de tortuga, pero en general:{"\n\n"}
        - **Acuáticas**: peces pequeños, camarones secos, pellets especiales,
        además de verduras de hoja verde.{"\n"}
        - **Terrestres**: verduras frescas (lechuga, espinaca, col rizada,
        zanahoria), frutas en menor cantidad (manzana, melón, fresa).{"\n"}
        - Evita darles pan, lácteos o carne procesada, ya que no lo digieren
        bien.{"\n"}
      </Text>

      <Text style={styles.sectionTitle}>🏡 Hábitat y Terrario</Text>
      <Text style={styles.text}>
        - **Tortugas acuáticas**: necesitan agua limpia, un filtro y una lámpara
        UVB que imite la luz solar.{"\n"}
        - **Tortugas terrestres**: deben tener acceso a un terrario con tierra,
        piedras, escondites y calor artificial (30°C aprox).{"\n"}
        - Es fundamental que todas tengan acceso a **rayos UVB**, ya que esto les
        ayuda a producir vitamina D3 y absorber calcio, evitando enfermedades
        óseas.{"\n"}
      </Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/02/19/11/38/turtle-1209726_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🏥 Salud y Cuidados</Text>
      <Text style={styles.text}>
        - Mantén siempre limpio el agua o el terrario.{"\n"}
        - Revisa su caparazón: debe estar duro y sin grietas.{"\n"}
        - Evita manipularlas en exceso, ya que el estrés afecta su salud.{"\n"}
        - Llévalas a un veterinario especializado en reptiles para chequeos.{"\n"}
      </Text>

      <Text style={styles.sectionTitle}>📌 Resumen</Text>
      <Text style={styles.text}>
        - Las tortugas son mascotas longevas que requieren compromiso.{"\n"}
        - Cada tipo (acuática, semiacuática, terrestre) necesita un hábitat
        específico.{"\n"}
        - Su dieta debe ser balanceada y variada.{"\n"}
        - El acceso a rayos UVB y un entorno limpio son clave para su salud.{"\n"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins_Bold",
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
});
