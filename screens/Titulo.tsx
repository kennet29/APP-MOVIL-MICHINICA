import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ZoonicaTitleProps {
  size?: number; 
  colors?: string[]; 
}

export default function ZoonicaTitle({
  size = 36,
  colors = ["#1DB954", "#329bd7", "#F39C12", "#E74C3C", "#8E44AD", "#16A085", "#D35400"], 
}: ZoonicaTitleProps) {
  const text = "Zoonica";

  return (
    <View style={styles.container}>
      {text.split("").map((char, index) => (
        <Text
          key={index}
          style={[
            styles.letter,
            { fontSize: size, color: colors[index % colors.length] },
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
  },
  letter: {
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
});