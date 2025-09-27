// screens/GuiaConejos.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import BottomMenu from "./Menu";

export default function GuiaConejos({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  >("Mascotas");

  if (!fontsLoaded) {
    return (
      <View style={styles.center}>
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

  const COLUMN_WIDTH = 140;
  const CellHeader = ({ children }: any) => (
    <Text style={[styles.cellHeader, { width: COLUMN_WIDTH }]}>{children}</Text>
  );
  const Cell = ({ children }: any) => (
    <Text style={[styles.cell, { width: COLUMN_WIDTH }]}>{children}</Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>Guía Completa de Conejos Domésticos</Text>


        <Image
  source={require("./Conejo.jpg")}
  style={styles.image}
  resizeMode="cover"
/>


        {/* Introducción */}
        <Text style={styles.sectionTitle}>🐇 Introducción</Text>
        <Text style={styles.text}>
          Los conejos son animales dóciles, tiernos y muy inteligentes que cada vez son más populares como mascotas...
        </Text>

        {/* Alimentación */}
        <Text style={styles.sectionTitle}>🥕 Alimentación</Text>
        <Text style={styles.text}>
          La dieta del conejo debe estar basada en heno, verduras frescas, pellets de calidad y frutas como premio ocasional.
        </Text>

        {/* Tabla alimentación */}
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Alimento</CellHeader>
              <CellHeader>Frecuencia</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>
            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Heno</Cell>
              <Cell>Todos los días</Cell>
              <Cell>Base de la dieta, fibra esencial</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Verduras frescas</Cell>
              <Cell>Diario</Cell>
              <Cell>Ej: zanahoria, espinaca, apio</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Frutas</Cell>
              <Cell>2-3 veces por semana</Cell>
              <Cell>Premio ocasional, evitar exceso</Cell>
            </View>
          </View>
        </ScrollView>

        {/* Desparasitación */}
        <Text style={styles.sectionTitle}>💊 Desparasitación</Text>
        <Text style={styles.text}>
          Los conejos pueden sufrir parásitos internos (lombrices, coccidios) y externos (ácaros, pulgas).
        </Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Tipo</CellHeader>
              <CellHeader>Frecuencia</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>
            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Interna</Cell>
              <Cell>Cada 6 meses</Cell>
              <Cell>Productos específicos para lagomorfos</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Externa</Cell>
              <Cell>Según exposición</Cell>
              <Cell>Control de pulgas y ácaros</Cell>
            </View>
          </View>
        </ScrollView>

        {/* Vacunas */}
        <Text style={styles.sectionTitle}>💉 Vacunas</Text>
        <Text style={styles.text}>
          Dependiendo del país, se recomienda vacunar contra enfermedades virales graves.
        </Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Vacuna</CellHeader>
              <CellHeader>Edad</CellHeader>
              <CellHeader>Refuerzo</CellHeader>
            </View>
            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Mixomatosis</Cell>
              <Cell>Desde 6 semanas</Cell>
              <Cell>Anual</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Enfermedad hemorrágica viral (RHD)</Cell>
              <Cell>Desde 6-8 semanas</Cell>
              <Cell>Anual</Cell>
            </View>
          </View>
        </ScrollView>

        {/* Hábitat */}
        <Text style={styles.sectionTitle}>🏡 Hábitat y Espacio</Text>
        <Text style={styles.text}>
          - Necesitan un espacio amplio para moverse y ejercitarse.{"\n"}
          - La jaula debe tener piso sólido para evitar lesiones.{"\n"}
          - Coloca escondites y juguetes para entretenerlos.{"\n"}
          - Si viven libres en casa, protege cables y plantas tóxicas.
        </Text>

        {/* Salud */}
        <Text style={styles.sectionTitle}>🏥 Salud y Cuidados</Text>
        <Text style={styles.text}>
          Cepillado, cuidado dental, esterilización y visitas al veterinario son esenciales para mantener su salud.
        </Text>

        {/* Comportamiento */}
        <Text style={styles.sectionTitle}>💡 Comportamiento</Text>
        <Text style={styles.text}>
          Los conejos disfrutan la compañía y pueden convivir con otros conejos tras adaptación. Son exploradores y aprenden trucos sencillos.
        </Text>

        {/* Resumen */}
        <Text style={styles.sectionTitle}>📌 Resumen</Text>
        <Text style={styles.text}>
          - Mascotas longevas y cariñosas.{"\n"}
          - Dieta basada en heno y verduras.{"\n"}
          - Necesitan espacio y entretenimiento.{"\n"}
          - Cuidados en dientes, pelaje y chequeos veterinarios.
        </Text>
      </ScrollView>

      <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontFamily: "Poppins_Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontFamily: "Poppins_Bold",
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
    color: "#27ae60",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  text: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    color: "#444",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 12,
    marginBottom: 20,
  },
  table: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 20 },
  rowHeader: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" },
  row: { flexDirection: "row", borderTopWidth: 1, borderColor: "#ccc" },
  cellHeader: {
    padding: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#d9e3f0",
  },
  cell: {
    padding: 10,
    textAlign: "center",
    fontSize: 13,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
