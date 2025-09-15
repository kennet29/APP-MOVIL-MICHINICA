// screens/GuiaGato.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function GuiaGato() {
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
      <Text style={styles.title}>Guía Completa de Gatos</Text>

      <Image
        source={{ uri: "https://placekitten.com/800/400" }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🐱 Introducción</Text>
      <Text style={styles.text}>
        Los gatos son una de las mascotas más populares del mundo. Su carácter
        independiente, su elegancia y su capacidad de adaptarse tanto a espacios
        pequeños como grandes los convierten en compañeros ideales. Cuidar de un
        gato implica entender sus necesidades físicas, emocionales y sociales.
      </Text>

      <Text style={styles.sectionTitle}>🍽️ Alimentación</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2017/01/06/19/15/cat-1950939_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Los gatos son carnívoros estrictos. Su dieta debe estar basada en
        proteínas animales de calidad. Es recomendable darles alimento balanceado
        (pienso seco o húmedo) diseñado específicamente para gatos, ya que estos
        productos contienen taurina, un aminoácido esencial para su salud. Evita
        darles comida casera como chocolate, cebolla, ajo o huesos, ya que pueden
        ser tóxicos.
      </Text>

      <Text style={styles.sectionTitle}>🏥 Salud y Cuidados</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2016/02/19/11/19/cat-1209748_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Es fundamental llevar a tu gato al veterinario de forma regular para
        aplicar vacunas, desparasitación y revisiones. La esterilización es
        recomendable para prevenir problemas de salud y evitar la sobrepoblación
        felina. Además, los gatos necesitan revisiones dentales y cuidado de sus
        uñas, que puedes mantener cortas con un rascador adecuado.
      </Text>

      <Text style={styles.sectionTitle}>🏡 Entorno y Bienestar</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2016/11/29/05/08/adorable-1866475_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Los gatos disfrutan de tener espacios donde trepar, esconderse y
        observar. Un rascador, estantes o camas altas ayudan a que tu gato se
        sienta seguro y estimulado. El arenero debe estar limpio y ubicado en un
        lugar tranquilo. También es importante dedicar tiempo al juego diario con
        juguetes interactivos para mantener su mente activa.
      </Text>

      <Text style={styles.sectionTitle}>❤️ Convivencia</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Aunque los gatos son independientes, también necesitan cariño y
        atención. Respetar su espacio y entender su lenguaje corporal (movimiento
        de cola, orejas y maullidos) es esencial para una buena relación. Algunos
        gatos disfrutan de la compañía constante, mientras que otros prefieren
        momentos de soledad. La clave está en respetar sus tiempos.
      </Text>

      <Text style={styles.sectionTitle}>📌 Resumen</Text>
      <Text style={styles.text}>
        - Los gatos son carnívoros estrictos: aliméntalos con pienso de calidad.{"\n"}
        - Necesitan revisiones veterinarias y vacunas regulares.{"\n"}
        - Mantén un entorno limpio, con arenero y rascador.{"\n"}
        - Juega con ellos a diario para estimularlos.{"\n"}
        - Bríndales cariño y respeto por su espacio.{"\n"}
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
