// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
import MisMascotas from "./screens/Mascota"; 
import HistorialMedicoMascota from "./screens/HistorialMedicoMascota";
import CrearMascota from "./screens/CrearMascotas"; 

// 📌 Definición de tipos de navegación
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

  // 🆕 vistas nuevas
  MisMascotas: undefined;
  HistorialMedicoMascota: { mascotaId: string };
  CrearMascota: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login y Registro */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

        {/* Pantallas principales */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Guia" component={Guia} options={{ headerShown: false }} />

        {/* Animales */}
        <Stack.Screen name="VacunasPerros" component={VacunasPerros} options={{ headerShown: false }} />
        <Stack.Screen name="VacunasGatos" component={VacunasGatos} options={{ headerShown: false }} />
        <Stack.Screen name="RazasGatos" component={RazasGatos} options={{ headerShown: false }} />
        <Stack.Screen name="VacunasAves" component={VacunasAves} options={{ headerShown: false }} />
        <Stack.Screen name="Conejos" component={GuiaConejos} options={{ headerShown: false }} />
        <Stack.Screen name="Tortugas" component={GuiaTortugas} options={{ headerShown: false }} />

        {/* Extras */}
        <Stack.Screen name="MisionVision" component={MisionVision} options={{ headerShown: false }} />
        <Stack.Screen name="RedesSocialesScreen" component={RedesSocialesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RazasPerros" component={RazasPerros} options={{ headerShown: false }} />
        <Stack.Screen name="MascotasPerdidas" component={MascotasPerdidas} options={{ headerShown: false }} />
        <Stack.Screen name="CrearMascotaPerdida" component={CrearMascotaPerdida} options={{ headerShown: false }} />

        {/* 🆕 Vistas nuevas */}
        <Stack.Screen name="MisMascotas" component={MisMascotas} options={{ headerShown: false }} />
        <Stack.Screen name="HistorialMedicoMascota" component={HistorialMedicoMascota} options={{ headerShown: false }} />
        <Stack.Screen name="CrearMascota" component={CrearMascota} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
