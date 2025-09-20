import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Guia({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  const [activeTab, setActiveTab] = useState<'Home' | 'Profile' | 'Mascota'>('Home');

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const handleTabPress = (tab: 'Home' | 'Profile' | 'Mascota') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  // 🔹 Lista de animales y sus rutas
  const animals = [
    { name: 'Perro', route: 'VacunasPerros', icon: <MaterialCommunityIcons name="dog" size={40} color="#fff" />, color: '#f49953' },
    { name: 'Gato', route: 'VacunasGatos', icon: <MaterialCommunityIcons name="cat" size={40} color="#fff" />, color: '#9d7bb6' },
    { name: 'Pájaro', route: 'VacunasAves', icon: <FontAwesome5 name="crow" size={40} color="#fff" />, color: '#00BFFF' },
    { name: 'Psitácidos', route: 'PsitacidosMexicanos', icon: <FontAwesome5 name="kiwi-bird" size={40} color="#fff" />, color: '#28a745' },
    { name: 'Conejo', route: 'Conejos', icon: <MaterialCommunityIcons name="rabbit" size={40} color="#fff" />, color: '#e87170' },
    { name: 'Hámster', route: 'Hamsters', icon: <MaterialCommunityIcons name="rodent" size={40} color="#fff" />, color: '#FFA500' },
    { name: 'Tortuga', route: 'Tortugas', icon: <MaterialCommunityIcons name="turtle" size={40} color="#fff" />, color: '#28a745' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Guía de Animales Domésticos</Text>

        {/* 🔹 Tarjetas de animales */}
        <View style={styles.cardsContainer}>
          {animals.map((animal, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: animal.color }]}
              onPress={() => navigation.navigate(animal.route)}
            >
              {animal.icon}
              <Text style={styles.cardText}>{animal.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔹 Menú inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => handleTabPress('Home')} style={styles.menuItem}>
          <FontAwesome5 name="home" size={24} color={activeTab === 'Home' ? '#1DB954' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Profile')} style={styles.menuItem}>
          <FontAwesome5 name="user" size={24} color={activeTab === 'Profile' ? '#1DB954' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Mascota')} style={styles.menuItem}>
          <MaterialCommunityIcons name="dog" size={28} color={activeTab === 'Mascota' ? '#1DB954' : '#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 120, // espacio para el menú
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    fontFamily: 'Poppins_Bold',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '45%',
    height: 120,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  cardText: {
    marginTop: 10,
    fontFamily: 'Poppins_Bold',
    color: '#fff',
    fontSize: 16,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 25,
    width: '90%',
    marginHorizontal: '5%',
    height: 60,
    backgroundColor: Platform.OS === 'android' ? 'rgba(30,30,30,0.6)' : '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  menuItem: { alignItems: 'center', justifyContent: 'center' },
});
