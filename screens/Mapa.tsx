import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

// 📍 Tipo de coordenada
type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function LiveLocationMap() {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [path, setPath] = useState<Coordinate[]>([]);
  const [watching, setWatching] = useState(false);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  // ✅ Pedir permiso de ubicación
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  };

  // ▶️ Iniciar seguimiento
  const startTracking = () => {
    if (watchId.current) return;
    setWatching(true);

    const id = Geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLocation: Coordinate = { latitude, longitude };
        setLocation(newLocation);
        setPath((prev) => [...prev, newLocation]);
      },
      (err) => console.error("Error al obtener ubicación:", err),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 2000,
        fastestInterval: 1000,
      }
    );

    // ⚙️ Asegurar que el tipo sea correcto
    watchId.current = id as unknown as number;
  };

  // ⏸️ Detener seguimiento
  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setWatching(false);
    }
  };

  // 🗺️ Limpiar ruta
  const clearPath = () => setPath([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Ubicación en tiempo real</Text>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
        >
          <Marker coordinate={location} title="Tu ubicación" />
          {path.length > 1 && (
            <Polyline coordinates={path} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      ) : (
        <Text style={styles.text}>Esperando ubicación...</Text>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={watching ? stopTracking : startTracking}
          style={[
            styles.button,
            { backgroundColor: watching ? "red" : "green" },
          ]}
        >
          <Text style={styles.buttonText}>
            {watching ? "Detener" : "Iniciar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearPath} style={styles.buttonClear}>
          <Text style={styles.buttonText}>Limpiar ruta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", margin: 10, textAlign: "center" },
  map: { flex: 1 },
  text: { textAlign: "center", marginTop: 20 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  buttonClear: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
