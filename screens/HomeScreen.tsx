import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as NavigationBar from 'expo-navigation-bar';

export default function HomeScreen({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  const [activeTab, setActiveTab] = useState<'Home' | 'Profile' | 'Mascota' | 'MisionVision'|'RedesSocialesScreen'>('Home');

  const titleScale = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBackgroundColorAsync('transparent');
    }

    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 80 }).start();

    Animated.stagger(
      200,
      cardsAnim.map((anim) =>
        Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true })
      )
    ).start();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#329bd7' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const handleTabPress = (tab: 'Home' | 'Profile' | 'Mascota' | 'MisionVision'|'RedesSocialesScreen') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const handleCardPress = (cardName: string) => {
    if (cardName === 'GUIAS') {
      navigation.navigate('Guia');
    } else {
      console.log(`Card ${cardName} presionada`);
    }
  };

  const cardColors = ['#e87170', '#f49953', '#9d7bb6', '#00BFFF', '#FFA500'];

  const cardData = [
    { name: 'POST', color: cardColors[0], icon: <FontAwesome5 name="edit" size={28} color="#fff" /> },
    { name: 'MASCOTAS PERDIDAS', color: cardColors[1], icon: <MaterialCommunityIcons name="dog" size={28} color="#fff" /> },
    { name: 'ADOPCIÓN', color: cardColors[2], icon: <FontAwesome5 name="heart" size={28} color="#fff" /> },
    { name: 'EVENTOS', color: cardColors[3], icon: <FontAwesome5 name="calendar-alt" size={28} color="#fff" /> },
    { name: 'GUIAS', color: cardColors[4], icon: <FontAwesome5 name="book" size={28} color="#fff" /> },
  ];

  const titleLetters = [
    { letter: 'Z', color: cardColors[0] },
    { letter: 'O', color: cardColors[1] },
    { letter: 'Ó', color: cardColors[2] },
    { letter: 'N', color: '#00BFFF' },
    { letter: 'I', color: '#00BFFF' },
    { letter: 'C', color: '#00BFFF' },
    { letter: 'A', color: '#00BFFF' },
  ];

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            {titleLetters.map((item, index) => (
              <Animated.Text
                key={index}
                style={[styles.title, { color: item.color, transform: [{ scale: titleScale }] }]}
              >
                {item.letter}
              </Animated.Text>
            ))}
          </View>

          <View style={styles.cardsContainer}>
            {cardData.map((card, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: cardsAnim[index] || new Animated.Value(0),
                  transform: [
                    {
                      translateY: (cardsAnim[index] || new Animated.Value(0)).interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: card.color }]}
                  onPress={() => handleCardPress(card.name)}
                >
                  {card.icon}
                  <Text style={styles.cardTitle}>{card.name}</Text>
                  <Text style={styles.cardText}>Descripción breve</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        {/* 🔽 Menú inferior actualizado con Misión y Visión */}
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
  <TouchableOpacity onPress={() => handleTabPress('MisionVision')} style={styles.menuItem}>
    <FontAwesome5 name="info-circle" size={24} color={activeTab === 'MisionVision' ? '#1DB954' : '#fff'} />
  </TouchableOpacity>
  {/* Nuevo botón Redes Sociales */}
  <TouchableOpacity onPress={() => handleTabPress('RedesSocialesScreen')} style={styles.menuItem}>
    <FontAwesome5 name="share-alt" size={24} color={activeTab === 'RedesSocialesScreen' ? '#1DB954' : '#fff'} />
  </TouchableOpacity>
</View>


      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFF' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  title: { fontSize: 40, marginBottom: 20, textAlign: 'center', fontFamily: 'Poppins_Bold' },
  cardsContainer: { flexDirection: 'column', justifyContent: 'flex-start' },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, marginTop: 10, fontFamily: 'Poppins_Bold', color: '#fff', textAlign: 'center' },
  cardText: { fontFamily: 'Poppins_Regular', color: '#fff', textAlign: 'center' },
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
