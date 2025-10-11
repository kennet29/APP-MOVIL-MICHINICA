import React, { useEffect, useCallback } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";

// 🏠 Pantallas principales
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Guia from "./screens/Guia";
import Eventos from "./screens/Eventos";
import Mapa from "./screens/Mapa";

// 📸 Publicaciones (tipo Instagram)
import Publicaciones from "./screens/Publicaciones";
import CrearPublicacion from "./screens/CrearPublicacion"; // ✅ Nueva vista

// 💰 Presupuestos
import Presupuestos from "./screens/Presupuestos";
import PresupuestoMascota from "./screens/PresupuestoMascota";
import AgregarGasto from "./screens/AgregarGasto";

// 🧬 Guías y fichas
import VacunasPerros from "./screens/Perro";
import VacunasGatos from "./screens/Gato";
import VacunasAves from "./screens/Aves";
import GuiaConejos from "./screens/Conejos";
import GuiaTortugas from "./screens/Tortuga";
import RazasPerros from "./screens/RazasPerros";
import RazasGatos from "./screens/RazasGatos";
import TratamientoPeces from "./screens/Peces";
import DatosPeces from "./screens/DatosPeces";

// 🐾 Mascotas
import MisMascotas from "./screens/Mascotas";
import CrearMascota from "./screens/CrearMascotas";
import MascotasPerdidas from "./screens/MascotaPerdida";
import CrearMascotaPerdida from "./screens/CrearMascotaPerdida";
import HistorialMedicoMascota from "./screens/HistorialMedicoMascota";

// 🔔 Otros
import Notificaciones from "./screens/Notificaciones";
import MisionVision from "./screens/MisionVision";
import RedesSocialesScreen from "./screens/Redes";

// 🩺 Vistas médicas
import CrearVacuna from "./screens/CrearVacuna";
import CrearDesparasitacion from "./screens/CrearDesparasitacion";
import CrearVisita from "./screens/CrearVisita";

// 🧭 Tipado de rutas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Guia: undefined;
  Eventos: undefined;
  Mapa: undefined;
  Publicaciones: undefined;
  CrearPublicacion: undefined; // ✅ Nueva ruta
  Presupuestos: undefined;
  PresupuestoMascota: { mascotaId: string };
  AgregarGasto: { mascotaId: string };
  VacunasPerros: undefined;
  VacunasGatos: undefined;
  VacunasAves: undefined;
  Conejos: undefined;
  Tortugas: undefined;
  RazasPerros: undefined;
  RazasGatos: undefined;
  Peces: undefined;
  DatosPeces: undefined;
  MisionVision: undefined;
  RedesSocialesScreen: undefined;
  MascotasPerdidas: undefined;
  CrearMascotaPerdida: undefined;
  MisMascotas: undefined;
  CrearMascota: undefined;
  HistorialMedicoMascota: { mascotaId: string };
  Notificaciones: undefined;
  CrearVacuna: { mascotaId: string; vacunaId?: string };
  CrearDesparasitacion: { mascotaId: string; desparasitacionId?: string };
  CrearVisita: { mascotaId: string; visitaId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // ✅ Control de la barra de navegación (Android)
  const ensureNavBarVisible = useCallback(async () => {
    if (Platform.OS !== "android") return;
    try {
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
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* 🔐 Autenticación */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* 🏠 Principales */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Guia" component={Guia} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Mapa" component={Mapa} />

        {/* 📸 Publicaciones */}
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="CrearPublicacion" component={CrearPublicacion} />

        {/* 💰 Presupuestos */}
        <Stack.Screen name="Presupuestos" component={Presupuestos} />
        <Stack.Screen name="PresupuestoMascota" component={PresupuestoMascota} />
        <Stack.Screen name="AgregarGasto" component={AgregarGasto} />

        {/* 🧬 Guías y fichas */}
        <Stack.Screen name="VacunasPerros" component={VacunasPerros} />
        <Stack.Screen name="VacunasGatos" component={VacunasGatos} />
        <Stack.Screen name="VacunasAves" component={VacunasAves} />
        <Stack.Screen name="Conejos" component={GuiaConejos} />
        <Stack.Screen name="Tortugas" component={GuiaTortugas} />
        <Stack.Screen name="RazasPerros" component={RazasPerros} />
        <Stack.Screen name="RazasGatos" component={RazasGatos} />
        <Stack.Screen name="Peces" component={TratamientoPeces} />
        <Stack.Screen name="DatosPeces" component={DatosPeces} />

        {/* 🐾 Mascotas */}
        <Stack.Screen name="MisMascotas" component={MisMascotas} />
        <Stack.Screen name="CrearMascota" component={CrearMascota} />
        <Stack.Screen name="MascotasPerdidas" component={MascotasPerdidas} />
        <Stack.Screen name="CrearMascotaPerdida" component={CrearMascotaPerdida} />
        <Stack.Screen name="HistorialMedicoMascota" component={HistorialMedicoMascota} />

        {/* 🔔 Notificaciones */}
        <Stack.Screen name="Notificaciones" component={Notificaciones} />

        {/* 🧭 Otras vistas */}
        <Stack.Screen name="MisionVision" component={MisionVision} />
        <Stack.Screen name="RedesSocialesScreen" component={RedesSocialesScreen} />

        {/* 🩺 Vistas médicas */}
        <Stack.Screen name="CrearVacuna" component={CrearVacuna} />
        <Stack.Screen name="CrearDesparasitacion" component={CrearDesparasitacion} />
        <Stack.Screen name="CrearVisita" component={CrearVisita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
