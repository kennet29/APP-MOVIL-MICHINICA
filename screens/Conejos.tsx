// screens/GuiaConejos.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function GuiaConejos() {
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
      <Text style={styles.title}>Guía Completa de Conejos Domésticos</Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/05/31/19/46/rabbit-2362214_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🐇 Introducción</Text>
      <Text style={styles.text}>
        Los conejos son animales dóciles, tiernos y muy inteligentes que cada vez
        son más populares como mascotas. Viven en promedio entre 8 y 12 años, y
        requieren cuidados específicos de alimentación, espacio y salud para
        mantenerse felices y activos.
      </Text>

      <Text style={styles.sectionTitle}>🌿 Razas Comunes de Conejos</Text>
      <Text style={styles.text}>
        - **Conejo enano (Netherland Dwarf)**: pequeño, activo y juguetón.{"\n"}
        - **Belier**: orejas largas caídas, tranquilo y sociable.{"\n"}
        - **Conejo Rex**: pelo corto y suave, tamaño mediano.{"\n"}
        - **Conejo Angora**: pelaje largo, requiere mucho cepillado.{"\n"}
      </Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/04/17/20/27/rabbit-3329725_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🥕 Alimentación</Text>
      <Text style={styles.text}>
        La dieta del conejo debe estar basada en:{"\n\n"}
        ✅ **Heno** (80% de su dieta, siempre disponible).{"\n"}
        ✅ **Verduras frescas** como zanahoria, lechuga romana, acelga, espinaca,
        apio.{"\n"}
        ✅ **Pellets de calidad** en pequeñas cantidades.{"\n"}
        ✅ **Frutas** (manzana, fresa, plátano) solo como premios ocasionales.{"\n"}
        🚫 Evita pan, dulces, lácteos o alimentos procesados.{"\n"}
      </Text>

      <Text style={styles.sectionTitle}>🏡 Hábitat y Espacio</Text>
      <Text style={styles.text}>
        - Necesitan un **espacio amplio** para moverse, saltar y ejercitarse.{"\n"}
        - La jaula debe ser grande, con un piso sólido (no de rejilla) para evitar
        lesiones en sus patas.{"\n"}
        - Coloca **escondites** y juguetes para su entretenimiento.{"\n"}
        - Pueden vivir libres en casa, pero se debe asegurar el ambiente (proteger
        cables, plantas tóxicas, objetos frágiles).{"\n"}
      </Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/03/27/22/16/rabbit-1283974_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>🏥 Salud y Cuidados</Text>
      <Text style={styles.text}>
        - Cepíllalos regularmente si tienen pelo largo.{"\n"}
        - Revisa sus dientes, ya que crecen constantemente y necesitan desgastarlos
        con heno o juguetes.{"\n"}
        - Esterilizarlos ayuda a prevenir enfermedades y comportamientos
        territoriales.{"\n"}
        - Vacunación y visitas al veterinario especializado son fundamentales.{"\n"}
      </Text>

      <Text style={styles.sectionTitle}>💡 Comportamiento</Text>
      <Text style={styles.text}>
        Los conejos son animales sociales y disfrutan la compañía. Pueden convivir
        con otros conejos, pero es importante una buena adaptación. Les gusta
        explorar y pueden aprender trucos sencillos, como usar una caja de arena
        para hacer sus necesidades.
      </Text>

      <Text style={styles.sectionTitle}>📌 Resumen</Text>
      <Text style={styles.text}>
        - Los conejos son mascotas longevas y cariñosas.{"\n"}
        - Necesitan una dieta basada en heno y verduras frescas.{"\n"}
        - Requieren espacio para ejercitarse y jugar.{"\n"}
        - Su salud depende del cuidado dental, cepillado y visitas al veterinario.{"\n"}
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
