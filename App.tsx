import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RazasPerros from "./screens/RazasPerros";
import RazasGatos from "./screens/RazasGatos";

// 🔹 Pantallas
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 🔑 Autenticación */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />

        {/* 🏠 Navegación principal */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mascota"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Guia"
          component={Guia}
          options={{ headerShown: false }}
        />

        {/* 🐾 Vistas de animales */}
        <Stack.Screen
          name="VacunasPerros"
          component={VacunasPerros}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VacunasGatos"
          component={VacunasGatos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
  name="RazasGatos"
  component={RazasGatos}
  options={{ headerShown: false }}
/>

        <Stack.Screen
          name="VacunasAves"
          component={VacunasAves}
          options={{ headerShown: false }}
        />
     
        <Stack.Screen
          name="Conejos"
          component={GuiaConejos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tortugas"
          component={GuiaTortugas}
          options={{ headerShown: false }}
        />

        {/* ❤️ Extras */}
        <Stack.Screen
          name="MisionVision"
          component={MisionVision}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RedesSocialesScreen"
          component={RedesSocialesScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
  name="RazasPerros"
  component={RazasPerros}
  options={{ headerShown: false }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
