import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function TerminosYCondiciones() {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Zoónica</Text>
      </View>

      <Text style={styles.title}>Términos y Condiciones</Text>

      <Text style={styles.text}>
        En Zoónica creemos en el bienestar, la confianza y el respeto hacia las
        personas y sus mascotas. Al utilizar nuestros servicios, aceptas que tu
        experiencia sea guiada por principios de transparencia y cuidado responsable.{"\n\n"}
        Nuestra plataforma busca mantener la información accesible y organizada,
        siempre con el propósito de acompañarte en cada etapa de la vida de tus
        animales, brindando herramientas prácticas que fortalezcan el vínculo entre
        familias, comunidad y profesionales de la salud animal.{"\n\n"}
        El uso de Zoónica implica el compromiso de valorar la armonía y el equilibrio
        como parte esencial de la relación humano–animal. Garantizamos que la información
        compartida será tratada con seriedad y en un ambiente confiable, en el que se
        promueva la educación, la empatía y el respeto mutuo.{"\n\n"}
        Reconocemos la importancia de crear un espacio seguro, pensado para que cada
        usuario se sienta acompañado en su proceso de cuidado y disfrute de su experiencia
        de manera positiva y clara.{"\n\n"}
        Al continuar en nuestra plataforma, aceptas estas condiciones diseñadas con un
        enfoque amigable y comunitario. Nuestro compromiso es mantener una comunicación
        cercana, simple y transparente, asegurando que las herramientas y recursos
        ofrecidos estén siempre orientados al bienestar integral.{"\n\n"}
        Zoónica es más que un servicio: es un lazo que conecta a las personas con sus
        mascotas bajo un mismo propósito de responsabilidad, confianza y equilibrio.
      </Text>

      <Text style={styles.footer}>© 2025 Zoónica</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontFamily: "Poppins_Bold",
    color: "#2a9d8f",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    lineHeight: 24,
    color: "#333",
    textAlign: "justify",
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    textAlign: "center",
    color: "#888",
  },
});
