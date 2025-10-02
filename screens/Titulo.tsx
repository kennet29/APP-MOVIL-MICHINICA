import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ZoonicaTitleProps {
  size?: number;
}

export default function ZoonicaTitle({ size = 36 }: ZoonicaTitleProps) {
  const text = "ZOÓNICA";

  // 🎨 Colores idénticos al título en HomeScreen
  const colors = [
    "#e87170", // Z
    "#f49953", // O
    "#9d7bb6", // Ó
    "#00BFFF", // N
    "#00BFFF", // I
    "#00BFFF", // C
    "#00BFFF", // A
  ];

  return (
    <View style={styles.container}>
      {text.split("").map((char, index) => (
        <Text
          key={index}
          style={[
            styles.letter,
            {
              fontSize: size,
              color: colors[index],
            },
          ]}
        >
          {char}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
});
