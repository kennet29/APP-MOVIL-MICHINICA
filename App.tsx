import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
  <Stack.Screen name="Login" component={Login}   options={{ headerShown: false }}  />
  <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}   />
  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
  <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}  />
</Stack.Navigator>
    </NavigationContainer>
  );
}
