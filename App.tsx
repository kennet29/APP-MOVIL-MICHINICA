import React, { useEffect, useCallback } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";

// 🔹 Pantallas principales
import RazasPerros from "./screens/RazasPerros";
import RazasGatos from "./screens/RazasGatos";
import MascotasPerdidas from "./screens/MascotaPerdida";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Guia from "./screens/Guia";
import VacunasPerros from "./screens/Perro";
import VacunasGatos from "./screens/Gato";
import VacunasAves from "./screens/Aves";
import GuiaConejos from "./screens/Conejos";
import GuiaTortugas from "./screens/Tortuga";
import MisionVision from "./screens/MisionVision";
import RedesSocialesScreen from "./screens/Redes";
import CrearMascotaPerdida from "./screens/CrearMascotaPerdida";

// 🔹 Secciones del sistema
import MisMascotas from "./screens/Mascotas";
import CrearMascota from "./screens/CrearMascotas";
import HistorialMedicoMascota from "./screens/HistorialMedicoMascota";
import Notificaciones from "./screens/Notificaciones";
import Eventos from "./screens/Eventos";

// 🔹 Vistas adicionales
import TratamientoPeces from "./screens/Peces";
import DatosPeces from "./screens/DatosPeces";

// 🩺 Vistas médicas (crear / editar)
import CrearVacuna from "./screens/CrearVacuna";
import CrearDesparasitacion from "./screens/CrearDesparasitacion";

// 🗺️ Nueva vista de mapa

import Mapa from "./screens/Mapa";

export type RootStackParamList = {
  // 🔑 Autenticación
  Login: undefined;
  Register: undefined;

  // 🏠 Navegación principal
  Home: undefined;
  Profile: undefined;
  Guia: undefined;
  Eventos: undefined;
  Mapa: undefined; // ✅ Nueva vista añadida

  // 🐶 Guías y vacunas
  VacunasPerros: undefined;
  VacunasGatos: undefined;
  RazasPerros: undefined;
  RazasGatos: undefined;
  VacunasAves: undefined;
  Conejos: undefined;
  Tortugas: undefined;
  Peces: undefined;
  DatosPeces: undefined;
  MisionVision: undefined;
  RedesSocialesScreen: undefined;

  // 🐾 Mascotas y adopciones
  MascotasPerdidas: undefined;
  CrearMascotaPerdida: undefined;
  MisMascotas: undefined;
  CrearMascota: undefined;

  // 🩺 Historial médico
  HistorialMedicoMascota: { mascotaId: string };

  // 🔔 Notificaciones
  Notificaciones: undefined;

  // 🩺 Vistas médicas (crear/editar)
  CrearVacuna: { mascotaId: string; vacunaId?: string };
  CrearDesparasitacion: { mascotaId: string; desparasitacionId?: string };
  CrearEnfermedad?: { mascotaId: string; enfermedadId?: string };
  CrearVisita?: { mascotaId: string; visitaId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const ensureNavBarVisible = useCallback(async () => {
    if (Platform.OS !== "android") return;
    try {
      // Mantener visible la barra de navegación en Android
      await NavigationBar.setVisibilityAsync("visible");
      await NavigationBar.setBehaviorAsync("inset-swipe");
      await NavigationBar.setBackgroundColorAsync("#000000");
      await NavigationBar.setButtonStyleAsync("light");
    } catch (e) {
      console.warn("No se pudo asegurar la NavBar:", e);
    }
  }, []);

  useEffect(() => {
    ensureNavBarVisible();
  }, [ensureNavBarVisible]);

  return (
    <NavigationContainer
      onReady={ensureNavBarVisible}
      onStateChange={ensureNavBarVisible}
    >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* 🔹 Autenticación */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* 🔹 Pantallas principales */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Guia" component={Guia} />
        <Stack.Screen name="Eventos" component={Eventos} />
      <Stack.Screen name="Mapa" component={Mapa} />  

        {/* 🔹 Guías y fichas de animales */}
        <Stack.Screen name="VacunasPerros" component={VacunasPerros} />
        <Stack.Screen name="VacunasGatos" component={VacunasGatos} />
        <Stack.Screen name="RazasPerros" component={RazasPerros} />
        <Stack.Screen name="RazasGatos" component={RazasGatos} />
        <Stack.Screen name="VacunasAves" component={VacunasAves} />
        <Stack.Screen name="Conejos" component={GuiaConejos} />
        <Stack.Screen name="Tortugas" component={GuiaTortugas} />
        <Stack.Screen name="Peces" component={TratamientoPeces} />
        <Stack.Screen name="DatosPeces" component={DatosPeces} />
        <Stack.Screen name="MisionVision" component={MisionVision} />
        <Stack.Screen
          name="RedesSocialesScreen"
          component={RedesSocialesScreen}
        />

        {/* 🔹 Mascotas */}
        <Stack.Screen name="MascotasPerdidas" component={MascotasPerdidas} />
        <Stack.Screen
          name="CrearMascotaPerdida"
          component={CrearMascotaPerdida}
        />
        <Stack.Screen name="MisMascotas" component={MisMascotas} />
        <Stack.Screen name="CrearMascota" component={CrearMascota} />
        <Stack.Screen
          name="HistorialMedicoMascota"
          component={HistorialMedicoMascota}
        />

        {/* 🔹 Notificaciones */}
        <Stack.Screen name="Notificaciones" component={Notificaciones} />

        {/* 🩺 Vistas médicas (crear/editar) */}
        <Stack.Screen name="CrearVacuna" component={CrearVacuna} />
        <Stack.Screen
          name="CrearDesparasitacion"
          component={CrearDesparasitacion}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
