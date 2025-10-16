import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
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
  const [loading, setLoading] = useState(true);
  const watcher = useRef<Location.LocationSubscription | null>(null);

  // ✅ Verifica y solicita permisos correctamente
  const checkPermission = async (): Promise<boolean> => {
    let { status } = await Location.getForegroundPermissionsAsync();
    console.log("📍 Estado inicial del permiso:", status);

    if (status !== "granted") {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      console.log("📍 Nuevo estado:", newStatus);
      if (newStatus !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Activa la ubicación manualmente en los ajustes del sistema para usar el mapa."
        );
        return false;
      }
    }
    return true;
  };

  // 🔹 Obtener ubicación inicial
  useEffect(() => {
    (async () => {
      const hasPermission = await checkPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      try {
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const initial = {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        };

        setLocation(initial);
        setPath([initial]);
      } catch (error) {
        console.error("❌ Error al obtener ubicación:", error);
        Alert.alert("Error", "No se pudo obtener tu ubicación inicial.");
      } finally {
        setLoading(false);
      }
    })();

    return () => stopWatching();
  }, []);

  // ▶️ Iniciar seguimiento
  const startWatching = async () => {
    if (watching) return;

    const hasPermission = await checkPermission();
    if (!hasPermission) return;

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

  // ⏳ Mientras carga ubicación
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={{ marginTop: 10 }}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  // 🚫 Si no hay ubicación disponible
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se pudo obtener la ubicación.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
       

        {/* 📍 Marcador actual */}
        <Marker coordinate={location} title="Tu ubicación" pinColor="#1DB954" />
      </MapView>

      {/* ▶️ Botón iniciar/detener seguimiento */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
