import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Menu from "./Menu";

export default function VacunasAves() {
  const [activeTab, setActiveTab] = useState<
    "Home" | "Profile" | "Mascota" | "MisionVision"
  >("Mascota");

  const handleTabPress = (tab: "Home" | "Profile" | "Mascota" | "MisionVision") => {
    setActiveTab(tab);
  };
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  // 🔹 Ancho fijo para las columnas
  const COLUMN_WIDTH = 180;

  const CellHeader = ({ children }: any) => (
    <Text style={[styles.cellHeader, { width: COLUMN_WIDTH }]}>{children}</Text>
  );

  const Cell = ({ children }: any) => (
    <Text style={[styles.cell, { width: COLUMN_WIDTH }]}>{children}</Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Aves de Compañía 🦜</Text>
        <Text style={styles.subtitle}>Psitácidos y otras aves comunes en Nicaragua</Text>

        <Text style={styles.paragraph}>
          En Nicaragua, muchas familias tienen aves como mascotas, siendo los psitácidos 
          (loros, pericos y cotorras) los más comunes. Entre las especies más frecuentes 
          están el <Text style={styles.bold}>Perico catarina</Text>, el{" "}
          <Text style={styles.bold}>Perico frente naranja</Text> y el{" "}
          <Text style={styles.bold}>Loro cabeza amarilla</Text>, conocidos por su 
          inteligencia y longevidad.{"\n\n"}
          Estas aves necesitan vacunación preventiva, desparasitación regular 
          y cuidados especiales en su alimentación y hábitat.
        </Text>

        {/* 📋 Vacunación */}
        <Text style={styles.section}>📋 Calendario de Vacunación en Aves</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 4 }]}>
            <View style={[styles.rowHeader]}>
              <CellHeader>Edad / Frecuencia</CellHeader>
              <CellHeader>Vacuna</CellHeader>
              <CellHeader>Vía</CellHeader>
              <CellHeader>Comentarios</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Primer mes</Cell>
              <Cell>Polivalente (Paramixovirus, Circovirus)</Cell>
              <Cell>Inyección</Cell>
              <Cell>Recomendada en criaderos grandes</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>6-8 semanas</Cell>
              <Cell>Viruela aviar</Cell>
              <Cell>Ala</Cell>
              <Cell>Especialmente en aves de exterior</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>12 semanas</Cell>
              <Cell>Newcastle (PMV-1)</Cell>
              <Cell>Inyección</Cell>
              <Cell>Zonas endémicas y granjas</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Anual</Cell>
              <Cell>Refuerzo Newcastle {"\n"} Rabia {"\n"} Circovirus</Cell>
              <Cell>Inyección</Cell>
              <Cell>Según riesgo y región</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 💊 Desparasitación */}
        <Text style={styles.section}>💊 Calendario de Desparasitación</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Tipo</CellHeader>
              <CellHeader>Frecuencia</CellHeader>
              <CellHeader>Comentarios</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Interna</Cell>
              <Cell>Cada 3 meses</Cell>
              <Cell>Contra lombrices y giardia (oral)</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Externa</Cell>
              <Cell>Cada 1-2 meses</Cell>
              <Cell>Baños antiparasitarios o polvos</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Revisión clínica</Cell>
              <Cell>Cada 6 meses</Cell>
              <Cell>Detectar ácaros de sacos aéreos</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 📚 Abreviaturas */}
        <Text style={styles.section}>📚 Abreviaturas comunes</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 2, marginBottom: 70 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Sigla</CellHeader>
              <CellHeader>Significado</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>PMV</Cell>
              <Cell>Paramixovirus</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>CIRCO</Cell>
              <Cell>Circovirus aviar</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>VA</Cell>
              <Cell>Viruela aviar</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>NEW</Cell>
              <Cell>Enfermedad de Newcastle</Cell>
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
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 15, fontWeight: "600" },
  paragraph: { fontSize: 16, lineHeight: 22, marginBottom: 20, textAlign: "justify", color: "#333" },
  bold: { fontWeight: "700" },
  section: { fontSize: 20, fontWeight: "700", marginVertical: 12, color: "#333" },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  rowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
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
