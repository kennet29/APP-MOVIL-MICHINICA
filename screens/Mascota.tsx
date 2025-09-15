import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Mascotas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas</Text>
      <Text style={styles.subtitle}>Aquí verás tus mascotas registradas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
