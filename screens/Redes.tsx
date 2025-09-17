import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RedesSocialesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'Home' | 'Profile' | 'Mascota' | 'MisionVision' | 'RedesSociales'>('RedesSociales');

  const handleTabPress = (tab: 'Home' | 'Profile' | 'Mascota' | 'MisionVision' | 'RedesSociales') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const handleCardPress = (platform: string) => {
    console.log(`Abrir enlace de ${platform}`);
    // Aquí luego se abrirá el enlace con Linking.openURL(enlace)
  };

  const cardData = [
    { name: 'Facebook', color: '#4267B2', icon: <FontAwesome5 name="facebook" size={28} color="#fff" /> },
    { name: 'Instagram', color: '#C13584', icon: <FontAwesome5 name="instagram" size={28} color="#fff" /> },
    { name: 'Twitter', color: '#1DA1F2', icon: <FontAwesome5 name="twitter" size={28} color="#fff" /> },
    { name: 'TikTok', color: '#000', icon: <FontAwesome5 name="tiktok" size={28} color="#fff" /> },
    { name: 'YouTube', color: '#FF0000', icon: <FontAwesome5 name="youtube" size={28} color="#fff" /> },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nuestras Redes Sociales</Text>
        <View style={styles.cardsContainer}>
          {cardData.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: card.color }]}
              onPress={() => handleCardPress(card.name)}
            >
              {card.icon}
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardText}>Visita nuestra cuenta oficial</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Menú inferior */}
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
        <TouchableOpacity onPress={() => handleTabPress('RedesSociales')} style={styles.menuItem}>
          <FontAwesome5 name="share-alt" size={24} color={activeTab === 'RedesSociales' ? '#1DB954' : '#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 120 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cardsContainer: { flexDirection: 'column', justifyContent: 'flex-start' },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, marginTop: 10, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  cardText: { color: '#fff', textAlign: 'center' },
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
