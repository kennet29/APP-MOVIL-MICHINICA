// App.tsx
import React, { useEffect, useCallback } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";

// 🔹 Imports de pantallas
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

// 🆕 Nuevas vistas
import MisMascotas from "./screens/Mascotas";
import HistorialMedicoMascota from "./screens/HistorialMedicoMascota";
import CrearMascota from "./screens/CrearMascotas";
import Notificaciones from "./screens/Notificaciones";
import Eventos from "./screens/Eventos";

// 🐟 Peces
import TratamientoPeces from "./screens/Peces";
import DatosPeces from "./screens/DatosPeces";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Guia: undefined;
  VacunasPerros: undefined;
  VacunasGatos: undefined;
  RazasGatos: undefined;
  VacunasAves: undefined;
  Conejos: undefined;
  Tortugas: undefined;
  MisionVision: undefined;
  RedesSocialesScreen: undefined;
  RazasPerros: undefined;
  MascotasPerdidas: undefined;
  CrearMascotaPerdida: undefined;
  DatosPeces: undefined;
  Eventos: undefined;

  // nuevas
  MisMascotas: undefined;
  HistorialMedicoMascota: { mascotaId: string };
  CrearMascota: undefined;
  Notificaciones: undefined;
  Peces: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const ensureNavBarVisible = useCallback(async () => {
    if (Platform.OS !== "android") return;
    try {
      // ✅ Mantener SIEMPRE visible + comportamiento que no la esconda
      await NavigationBar.setVisibilityAsync("visible");
      // Evita el “immersive”; deja la barra como inset (no se oculta por gestos del contenido)
      await NavigationBar.setBehaviorAsync("inset-swipe");
      // Opcional: color y contraste de botones
      await NavigationBar.setBackgroundColorAsync("#000000");
      await NavigationBar.setButtonStyleAsync("light");
      // Debug opcional:
      // const v = await NavigationBar.getVisibilityAsync();
      // console.log("NavBar visibility:", v);
    } catch (e) {
      console.warn("No se pudo asegurar la NavBar:", e);
    }
  }, []);

  // Al montar la app
  useEffect(() => {
    ensureNavBarVisible();
  }, [ensureNavBarVisible]);

  return (
    <NavigationContainer
      // También al estar lista y en cada cambio de estado (cambio de pantalla)
      onReady={ensureNavBarVisible}
      onStateChange={ensureNavBarVisible}
    >
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Login y Registro */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* Principales */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Guia" component={Guia} />
        <Stack.Screen name="Eventos" component={Eventos} />

        {/* Animales */}
        <Stack.Screen name="VacunasPerros" component={VacunasPerros} />
        <Stack.Screen name="VacunasGatos" component={VacunasGatos} />
        <Stack.Screen name="RazasGatos" component={RazasGatos} />
        <Stack.Screen name="VacunasAves" component={VacunasAves} />
        <Stack.Screen name="Conejos" component={GuiaConejos} />
        <Stack.Screen name="Tortugas" component={GuiaTortugas} />

        {/* Peces */}
        <Stack.Screen name="Peces" component={TratamientoPeces} />
        <Stack.Screen name="DatosPeces" component={DatosPeces} />

        {/* Extras */}
        <Stack.Screen name="MisionVision" component={MisionVision} />
        <Stack.Screen name="RedesSocialesScreen" component={RedesSocialesScreen} />
        <Stack.Screen name="RazasPerros" component={RazasPerros} />
        <Stack.Screen name="MascotasPerdidas" component={MascotasPerdidas} />
        <Stack.Screen name="CrearMascotaPerdida" component={CrearMascotaPerdida} />

        {/* Nuevas */}
        <Stack.Screen name="MisMascotas" component={MisMascotas} />
        <Stack.Screen name="HistorialMedicoMascota" component={HistorialMedicoMascota} />
        <Stack.Screen name="CrearMascota" component={CrearMascota} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
