// screens/TratamientoPeces.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import Menu from "./Menu";

export default function TratamientoPeces({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  >("Mascotas");

  const handleTabPress = (
    tab: "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  ) => {
    setActiveTab(tab);
  };

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  const COLUMN_WIDTH = 160;
  const CellHeader = ({ children }: any) => (
    <Text style={[styles.cellHeader, { width: COLUMN_WIDTH }]}>{children}</Text>
  );
  const Cell = ({ children }: any) => (
    <Text style={[styles.cell, { width: COLUMN_WIDTH }]}>{children}</Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🐠 Tratamiento y Cuidado de Peces de Acuario</Text>
        <Text style={styles.paragraph}>
          Mantener peces saludables requiere controlar el agua, una alimentación
          adecuada, entender sus ciclos de reproducción y prevenir enfermedades.
          Esta guía resume los aspectos clave para acuarios domésticos.
        </Text>

        {/* 📋 Parámetros del agua */}
        <Text style={styles.section}>📋 Parámetros del Agua</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Parámetro</CellHeader>
              <CellHeader>Rango Ideal</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Temperatura</Cell>
              <Cell>24°C - 28°C</Cell>
              <Cell>Varía según especie (tropicales vs. frías)</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>pH</Cell>
              <Cell>6.5 - 7.5</Cell>
              <Cell>Controlar con test kits</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Oxígeno</Cell>
              <Cell>≈ 5 mg/L</Cell>
              <Cell>Usar aireadores o plantas acuáticas</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 💊 Alimentación */}
        <Text style={styles.section}>💊 Alimentación</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Tipo</CellHeader>
              <CellHeader>Frecuencia</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Comida seca</Cell>
              <Cell>1-2 veces al día</Cell>
              <Cell>No sobrealimentar, retirar excedente</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Comida viva</Cell>
              <Cell>Ocasional</Cell>
              <Cell>Proteínas y estimula comportamiento natural</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Comida congelada</Cell>
              <Cell>2-3 veces por semana</Cell>
              <Cell>Alternativa nutritiva y segura</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 🐟 Reproducción */}
        <Text style={styles.section}>🐟 Reproducción</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Tipo</CellHeader>
              <CellHeader>Condiciones</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Ovíparos</Cell>
              <Cell>Plantas, rocas o sustratos</Cell>
              <Cell>Separar huevos de adultos</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Ovovivíparos</Cell>
              <Cell>Acuario maternidad</Cell>
              <Cell>Ej: Guppys, Mollies</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Vivíparos</Cell>
              <Cell>Espacios amplios</Cell>
              <Cell>Alevines nacen desarrollados</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Factores clave</Cell>
              <Cell>Temperatura 26°C - 28°C</Cell>
              <Cell>Luz controlada y alimentación rica en proteínas</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 🦠 Enfermedades */}
        <Text style={styles.section}>🦠 Enfermedades Comunes</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Enfermedad</CellHeader>
              <CellHeader>Síntomas</CellHeader>
              <CellHeader>Prevención</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Ich (punto blanco)</Cell>
              <Cell>Puntos blancos, frotarse contra objetos</Cell>
              <Cell>Cuarentena, buena filtración</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Podredumbre de aletas</Cell>
              <Cell>Aletas deshilachadas</Cell>
              <Cell>Cambios de agua regulares</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Hongos</Cell>
              <Cell>Manchas algodonosas</Cell>
              <Cell>Evitar heridas y agua sucia</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Hidropesía</Cell>
              <Cell>Vientre hinchado, escamas levantadas</Cell>
              <Cell>Buena dieta y baja densidad de peces</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Parásitos intestinales</Cell>
              <Cell>Heces largas, pérdida de peso</Cell>
              <Cell>Alimentación de calidad y cuarentena</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 💉 Tratamientos */}
        <Text style={styles.section}>💉 Tratamientos Básicos</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Problema</CellHeader>
              <CellHeader>Tratamiento</CellHeader>
              <CellHeader>Notas</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Ich</Cell>
              <Cell>Subir temperatura, medicamentos comerciales</Cell>
              <Cell>Acuario hospital recomendado</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Podredumbre de aletas</Cell>
              <Cell>Antibacterianos, cambios de agua</Cell>
              <Cell>Mejorar filtración</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Hongos</Cell>
              <Cell>Antifúngicos, sal marina sin yodo</Cell>
              <Cell>Retirar peces enfermos</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Parásitos</Cell>
              <Cell>Antiparasitarios líquidos</Cell>
              <Cell>Respetar dosis exacta</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Hidropesía</Cell>
              <Cell>Aislamiento + antibióticos</Cell>
              <Cell>Difícil de curar, actuar rápido</Cell>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      {/* 👇 Menú inferior */}
      <Menu activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  paragraph: { fontSize: 16, lineHeight: 22, marginBottom: 20, textAlign: "justify", color: "#333" },
  section: { fontSize: 20, fontWeight: "700", marginVertical: 12, color: "#333" },
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
