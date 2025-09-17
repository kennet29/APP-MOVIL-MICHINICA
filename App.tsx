import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Guia from "./screens/Guia";
import GuiaPerro from "./screens/Perro";
import GuiaGato from "./screens/Gato";
import GuiaConejos from "./screens/Conejos";
import GuiaTortugas from "./screens/Tortuga";
import GuiaAves from "./screens/Aves";
import MisionVision from "./screens/MisionVision";
import RedesSocialesScreen from "./screens/Redes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen name="Perro" component={GuiaPerro}   options={{ headerShown: false }} />
        <Stack.Screen name="Gato" component={GuiaGato}   options={{ headerShown: false }} />
        <Stack.Screen name="Conejo" component={GuiaConejos}   options={{ headerShown: false }} />
        <Stack.Screen name="Tortuga" component={GuiaTortugas}   options={{ headerShown: false }} />
        <Stack.Screen name="Aves" component={GuiaAves}   options={{ headerShown: false }} />
        <Stack.Screen name="MisionVision" component={MisionVision}   options={{ headerShown: false }} />
        <Stack.Screen name="RedesSocialesScreen" component={RedesSocialesScreen}   options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
