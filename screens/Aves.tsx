// screens/GuiaAves.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function GuiaAves() {
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
      <Text style={styles.title}>Guía Completa de Aves Domésticas</Text>

      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2016/02/19/11/53/parrot-1209750_1280.jpg" }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🐦 Introducción</Text>
      <Text style={styles.text}>
        Las aves domésticas como los chocoyos, loras y canarios son muy queridas
        en Nicaragua. Su canto alegre, plumaje colorido y comportamiento social
        las convierten en excelentes mascotas. Sin embargo, requieren cuidados
        especiales para garantizar su bienestar físico y emocional.
      </Text>

      {/* CHOCOYOS */}
      <Text style={styles.sectionTitle}>🟢 Chocoyos</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2017/09/26/13/34/parakeet-2785503_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Los chocoyos (periquitos verdes) son aves pequeñas, muy sociables y
        juguetonas. Necesitan una jaula amplia donde puedan moverse y espacio
        para volar fuera de ella de forma segura. Su alimentación debe incluir
        semillas, frutas frescas como manzana y papaya, y verduras como zanahoria
        o espinaca. Les encanta convivir en pareja o grupos, ya que son muy
        sociales.
      </Text>

      {/* LORAS */}
      <Text style={styles.sectionTitle}>🦜 Loras</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2016/03/27/19/40/parrot-1286440_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Las loras son aves más grandes, con gran capacidad de imitar sonidos y
        palabras. Son inteligentes y requieren estimulación mental constante.
        Necesitan juguetes, interacción diaria y una dieta variada con frutas,
        verduras y pienso especial para aves grandes. Una lora aburrida puede
        desarrollar comportamientos como arrancarse plumas o volverse agresiva,
        por lo que su cuidado requiere compromiso.
      </Text>

      {/* CANARIOS */}
      <Text style={styles.sectionTitle}>🎶 Canarios</Text>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2017/09/03/08/59/canary-2714841_1280.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Los canarios son aves pequeñas conocidas por su canto melodioso. No son
        tan sociales como los chocoyos o loras, pero disfrutan de un ambiente
        tranquilo. Su dieta debe estar basada en semillas, complementada con
        frutas y vegetales. Requieren jaulas limpias, baños de agua fresca y
        buena ventilación. Los machos suelen cantar más que las hembras.
      </Text>

      <Text style={styles.sectionTitle}>🏥 Salud y Cuidados Generales</Text>
      <Text style={styles.text}>
        - Mantener la jaula limpia evita enfermedades.{"\n"}
        - Proveer agua fresca a diario.{"\n"}
        - Evitar corrientes de aire frío.{"\n"}
        - Ofrecer baños de agua o arena según la especie.{"\n"}
        - Visitas regulares al veterinario especializado en aves.{"\n"}
      </Text>

      <Text style={styles.sectionTitle}>📌 Resumen</Text>
      <Text style={styles.text}>
        - Los chocoyos son sociables y activos.{"\n"}
        - Las loras requieren mucha interacción y estimulación.{"\n"}
        - Los canarios son tranquilos y destacan por su canto.{"\n"}
        - Todas las aves necesitan espacio, alimentación variada y atención
        veterinaria.{"\n"}
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
