import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function Mapa() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [path, setPath] = useState<Coordinate[]>([]);
  const [watching, setWatching] = useState(false);
  const watcher = useRef<Location.LocationSubscription | null>(null);

  // 🔹 Solicitar permiso y obtener ubicación inicial
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Activa la ubicación para usar el mapa.");
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      const initial = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };
      setLocation(initial);
      setPath([initial]);
    })();

    return () => stopWatching();
  }, []);

  // ▶️ Iniciar seguimiento en tiempo real
  const startWatching = async () => {
    if (watching) return;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "No se puede acceder a la ubicación.");
      return;
    }

    watcher.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (pos) => {
        const newLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setLocation(newLocation);
        setPath((prev) => [...prev, newLocation]);
      }
    );

    setWatching(true);
  };

  // ⏹️ Detener seguimiento
  const stopWatching = () => {
    if (watcher.current) {
      watcher.current.remove();
      watcher.current = null;
    }
    setWatching(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
      >
        {path.length > 1 && (
          <Polyline coordinates={path} strokeColor="#1E90FF" strokeWidth={4} />
        )}
        {location && (
          <Marker coordinate={location} title="Tu ubicación" pinColor="#1DB954" />
        )}
      </MapView>

      {/* ▶️ Botón iniciar/detener */}
      <TouchableOpacity
        style={[
          styles.trackButton,
          { backgroundColor: watching ? "#e74c3c" : "#1DB954" },
        ]}
        onPress={watching ? stopWatching : startWatching}
      >
        <Text style={styles.trackButtonText}>
          {watching ? "Detener seguimiento" : "Iniciar seguimiento"}
        </Text>
      </TouchableOpacity>

      {/* 🏠 Botón volver al Home */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home" as never)}
      >
        <FontAwesome5 name="home" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  trackButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 5,
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});
