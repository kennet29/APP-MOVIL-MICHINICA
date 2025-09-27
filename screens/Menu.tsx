import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

interface BottomMenuProps {
  activeTab: "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones";
  onTabPress: (
    tab: "Home" | "Profile" | "Mascotas" | "MisionVision" | "Notificaciones"
  ) => void;
}

export default function BottomMenu({ activeTab, onTabPress }: BottomMenuProps) {
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity onPress={() => onTabPress("Home")} style={styles.menuItem}>
        <FontAwesome5
          name="home"
          size={24}
          color={activeTab === "Home" ? "#1DB954" : "#fff"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabPress("Profile")}
        style={styles.menuItem}
      >
        <FontAwesome5
          name="user"
          size={24}
          color={activeTab === "Profile" ? "#1DB954" : "#fff"}
        />
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => onTabPress("Mascotas")}
        style={styles.menuItem}
      >
        <MaterialCommunityIcons
          name="dog"
          size={28}
          color={activeTab === "Mascotas" ? "#1DB954" : "#fff"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabPress("Notificaciones")}
        style={styles.menuItem}
      >
        <FontAwesome5
          name="bell"
          size={24}
          color={activeTab === "Notificaciones" ? "#1DB954" : "#fff"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabPress("MisionVision")}
        style={styles.menuItem}
      >
        <MaterialCommunityIcons
          name="heart-pulse"
          size={28}
          color={activeTab === "MisionVision" ? "#1DB954" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 25 : 25,
    width: "90%",
    marginHorizontal: "5%",
    height: 60,
    backgroundColor:
      Platform.OS === "android" ? "rgba(30,30,30,0.6)" : "#1e1e1e",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  menuItem: { alignItems: "center", justifyContent: "center" },
});
