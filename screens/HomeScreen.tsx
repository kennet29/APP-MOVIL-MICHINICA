// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Ir a Perfil"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}


