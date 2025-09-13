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

  const [activeTab, setActiveTab] = useState<'Home' | 'Profile' | 'Mascota'>('Home');

  // Animaciones
  const titleScale = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef([0, 1, 2, 3].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBackgroundColorAsync('transparent');
    }

    // Animación título
    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 80 }).start();

    // Animación cards
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

  const handleTabPress = (tab: 'Home' | 'Profile' | 'Mascota') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const cardColors = ['#e87170', '#f49953', '#9d7bb6', '#00BFFF'];

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Título multicolor animado */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            {[
              { letter: 'Z', color: '#e87170' },
              { letter: 'O', color: '#f49953' },
              { letter: 'Ó', color: '#9d7bb6' },
              { letter: 'N', color: '#00BFFF' },
              { letter: 'I', color: '#00BFFF' },
              { letter: 'C', color: '#00BFFF' },
              { letter: 'A', color: '#00BFFF' },
            ].map((item, index) => (
              <Animated.Text
                key={index}
                style={[styles.title, { color: item.color, transform: [{ scale: titleScale }] }]}
              >
                {item.letter}
              </Animated.Text>
            ))}
          </View>

          {/* Cards multicolor animadas */}
          <View style={styles.cardsContainer}>
            {['POST', 'MASCOTAS PERDIDAS', 'ADOPCIÓN', 'EVENTOS'].map((card, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: cardsAnim[index],
                  transform: [
                    {
                      translateY: cardsAnim[index].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                    },
                  ],
                }}
              >
                <TouchableOpacity style={[styles.card, { backgroundColor: cardColors[index] }]}>
                  <Text style={styles.cardTitle}>{card}</Text>
                  <Text style={styles.cardText}>Descripción breve</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        {/* Menú inferior estilo Spotify flotante y semi-transparente */}
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
  },
  cardTitle: { fontSize: 18, marginBottom: 5, fontFamily: 'Poppins_Bold', color: '#fff' },
  cardText: { fontFamily: 'Poppins_Regular', color: '#fff' },
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
