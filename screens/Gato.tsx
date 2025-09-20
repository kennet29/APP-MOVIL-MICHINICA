import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import Menu from "./Menu";

export default function VacunasGatos({ navigation }: any) {
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
        <Text style={styles.title}>Guía de Vacunación y Desparasitación en Gatos 🐱</Text>

        <Text style={styles.paragraph}>
          Los gatos, tanto domésticos como de exterior, necesitan un esquema de
          vacunación y desparasitación para prevenir enfermedades como{" "}
          <Text style={styles.bold}>rabia, leucemia felina, panleucopenia</Text> y
          otras enfermedades virales. Aquí encontrarás el calendario recomendado.
        </Text>

        {/* 📋 Vacunación */}
        <Text style={styles.section}>📋 Calendario de Vacunación</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 3 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Vacuna</CellHeader>
              <CellHeader>Primovacunación</CellHeader>
              <CellHeader>Refuerzo</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Triple felina (HVF-1, PVF, CVF)</Cell>
              <Cell>8-9 sem → cada 3-4 sem hasta 16-20 sem</Cell>
              <Cell>Interior: cada 3 años {"\n"} Exterior: anual</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Rabia</Cell>
              <Cell>12 sem</Cell>
              <Cell>Anual (obligatoria en muchos países)</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Leucemia viral felina (LVF)</Cell>
              <Cell>8-9 sem → 2 dosis con 3-4 sem de diferencia</Cell>
              <Cell>Cachorros: anual {"\n"} Adultos: solo si hay riesgo</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Chlamydia felis</Cell>
              <Cell>8-9 sem → 2 dosis con 3-4 sem de diferencia</Cell>
              <Cell>Anual (colonias o criaderos)</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Virus de Inmunodeficiencia Felina (VIF)</Cell>
              <Cell>8 sem → 3 dosis con 2-3 sem de diferencia</Cell>
              <Cell>Anual si el gato tiene riesgo</Cell>
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

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>Interna (lombrices, giardia, coccidios)</Cell>
              <Cell>Gatitos: cada 15 días hasta 3 meses {"\n"} Adultos: cada 3-6 meses</Cell>
              <Cell>Usar antiparasitarios de amplio espectro ajustados al peso</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>Externa (pulgas, garrapatas, ácaros)</Cell>
              <Cell>Mensual</Cell>
              <Cell>Pipetas, collares o comprimidos {"\n"} Refuerzo en época de calor</Cell>
            </View>

            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>Revisión veterinaria</Cell>
              <Cell>Cada 6 meses</Cell>
              <Cell>Para ajustar el esquema según estilo de vida</Cell>
            </View>
          </View>
        </ScrollView>

        {/* ⚠️ Efectos secundarios */}
        <Text style={styles.section}>⚠️ Efectos secundarios posibles</Text>
        <Text style={styles.paragraph}>
          • Leves: inflamación local, fiebre baja, inapetencia, letargia. {"\n"}
          • Graves (muy raros): anafilaxia, sarcomas posinyección, poliartritis. {"\n"}
          • Recomendación: aplicar en miembros distales (no en zona interescapular).
        </Text>

        {/* 📚 Abreviaturas */}
        <Text style={styles.section}>📚 Abreviaturas</Text>
        <ScrollView horizontal>
          <View style={[styles.table, { width: COLUMN_WIDTH * 2, marginBottom: 80 }]}>
            <View style={styles.rowHeader}>
              <CellHeader>Sigla</CellHeader>
              <CellHeader>Significado</CellHeader>
            </View>

            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>HVF-1</Cell>
              <Cell>Herpesvirus felino tipo 1</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>CVF</Cell>
              <Cell>Calicivirus felino</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>PVF</Cell>
              <Cell>Panleucopenia viral felina</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
              <Cell>LVF</Cell>
              <Cell>Leucemia viral felina</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
              <Cell>VIF</Cell>
              <Cell>Virus de Inmunodeficiencia Felina</Cell>
            </View>
            <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
              <Cell>C. felis</Cell>
              <Cell>Chlamydia felis</Cell>
            </View>
          </View>
        </ScrollView>

        {/* 🔘 Botón para ver razas */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RazasGatos")}
        >
          <Text style={styles.buttonText}>🐾 Ver Razas de Gatos</Text>
        </TouchableOpacity>
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
  bold: { fontWeight: "700" },
  section: { fontSize: 20, fontWeight: "700", marginVertical: 12, color: "#333" },
  table: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
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
  button: {
    backgroundColor: "#9d7bb6",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 90,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
