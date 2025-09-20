import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Menu from "./Menu";

export default function VacunasPerros({ navigation }: any) {
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>CANINOS</Text>

        {/* 📋 Calendario de Vacunación */}
        <Text style={styles.section}>📋 Calendario de Vacunación</Text>
        <View style={styles.table}>
          <View style={[styles.rowHeader, { backgroundColor: "#d9e3f0" }]}>
            <Text style={styles.cellHeader}>Vacuna</Text>
            <Text style={styles.cellHeader}>Primovacunación</Text>
            <Text style={styles.cellHeader}>Refuerzo</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>Parvovirus (PVC)</Text>
            <Text style={styles.cell}>6-8 semanas</Text>
            <Text style={styles.cell}>Cada 3-4 semanas hasta las 16 sem {"\n"} Luego anual</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>Moquillo canino (VDC)</Text>
            <Text style={styles.cell}>6-8 semanas</Text>
            <Text style={styles.cell}>Cada 3-4 semanas hasta 16 sem {"\n"} Luego anual</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.cell}>Hepatitis infecciosa (AVC-1)</Text>
            <Text style={styles.cell}>8 semanas</Text>
            <Text style={styles.cell}>Cada 3-4 semanas hasta 16 sem {"\n"} Luego anual</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>Adenovirus tipo 2 (AVC-2)</Text>
            <Text style={styles.cell}>8 semanas</Text>
            <Text style={styles.cell}>Cada 3-4 semanas hasta 16 sem {"\n"} Luego anual</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>Parainfluenza (PIC)</Text>
            <Text style={styles.cell}>6-8 semanas</Text>
            <Text style={styles.cell}>Cada 3-4 semanas hasta 16 sem {"\n"} Luego anual</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.cell}>Rabia</Text>
            <Text style={styles.cell}>12-16 semanas</Text>
            <Text style={styles.cell}>Anual o cada 3 años (según norma)</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>Bordetella (tos de las perreras)</Text>
            <Text style={styles.cell}>8 semanas (intranasal, oral o inyectable)</Text>
            <Text style={styles.cell}>Cada 6-12 meses en perros de riesgo</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>Leptospirosis</Text>
            <Text style={styles.cell}>12 semanas (2 dosis con 3-4 sem de diferencia)</Text>
            <Text style={styles.cell}>Anual</Text>
          </View>
        </View>

        {/* ⚠️ Efectos secundarios */}
        <Text style={styles.section}>⚠️ Efectos secundarios</Text>
        <View style={styles.table}>
          <View style={[styles.rowHeader, { backgroundColor: "#d9e3f0" }]}>
            <Text style={styles.cellHeader}>Tipo</Text>
            <Text style={styles.cellHeader}>Ejemplos</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>Esperados (leves)</Text>
            <Text style={styles.cell}>
              Fiebre leve, decaimiento, inflamación local, anorexia pasajera
            </Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.cell}>Indeseables (raros)</Text>
            <Text style={styles.cell}>
              Reacciones alérgicas graves, vómitos persistentes, anafilaxia, shock
            </Text>
          </View>
        </View>

        {/* 💊 Desparasitación */}
        <Text style={styles.section}>💊 Calendario de Desparasitación</Text>
        <View style={styles.table}>
          <View style={[styles.rowHeader, { backgroundColor: "#d9e3f0" }]}>
            <Text style={styles.cellHeader}>Tipo</Text>
            <Text style={styles.cellHeader}>Frecuencia</Text>
            <Text style={styles.cellHeader}>Comentarios</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>Interna (lombrices, giardia, etc.)</Text>
            <Text style={styles.cell}>
              Cachorros: cada 15 días hasta 3 meses {"\n"}
              Adultos: cada 3-6 meses
            </Text>
            <Text style={styles.cell}>Antiparasitarios de amplio espectro</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>Externa (pulgas, garrapatas, ácaros)</Text>
            <Text style={styles.cell}>Mensual</Text>
            <Text style={styles.cell}>Pipetas, collares, comprimidos orales</Text>
          </View>
        </View>

        {/* 📚 Abreviaturas */}
        <Text style={styles.section}>📚 Abreviaturas de Vacunas y Términos</Text>
        <View style={styles.table}>
          <View style={[styles.rowHeader, { backgroundColor: "#d9e3f0" }]}>
            <Text style={styles.cellHeader}>Sigla</Text>
            <Text style={styles.cellHeader}>Significado</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>PVC</Text>
            <Text style={styles.cell}>Parvovirus canino</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>VDC</Text>
            <Text style={styles.cell}>Distemper (moquillo) canino</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.cell}>AVC-1</Text>
            <Text style={styles.cell}>Adenovirus canino tipo 1 (hepatitis)</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>AVC-2</Text>
            <Text style={styles.cell}>Adenovirus canino tipo 2 (respiratorio)</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>PIC</Text>
            <Text style={styles.cell}>Parainfluenza canina</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.cell}>BORD</Text>
            <Text style={styles.cell}>Bordetella bronchiseptica</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#d0f0c0" }]}>
            <Text style={styles.cell}>LEPTO</Text>
            <Text style={styles.cell}>Leptospirosis</Text>
          </View>

          <View style={[styles.row, { backgroundColor: "#ffe5b4" }]}>
            <Text style={styles.cell}>RABIA</Text>
            <Text style={styles.cell}>Rabia</Text>
          </View>
        </View>

        {/* 🔘 Botón para ver info de razas */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RazasPerros")}
        >
          <Text style={styles.buttonText}>ℹ️ Ver información de razas</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 👇 Menú inferior */}
      <Menu activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15,marginBottom:55  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#222",
  },
  section: { fontSize: 20, fontWeight: "700", marginVertical: 10, color: "#333" },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  rowHeader: { flexDirection: "row" },
  row: { flexDirection: "row", borderTopWidth: 1, borderColor: "#ccc" },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    color: "#000",
  },
  cell: { flex: 1, padding: 8, textAlign: "center", fontSize: 14, marginBottom: 20 },
  button: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 55,
    alignItems: "center",
    
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold"},
});
