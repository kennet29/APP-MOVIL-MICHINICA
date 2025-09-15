import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GuiaPerro() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ícono grande */}
      <MaterialCommunityIcons name="dog" size={90} color="#f49953" />
      <Text style={styles.title}>Guía Completa de Perros</Text>

      {/* Introducción */}
      <Text style={styles.sectionTitle}>Introducción</Text>
      <Text style={styles.text}>
        Los perros son una de las especies más antiguamente domesticadas por el ser humano.
        Han acompañado a las personas durante miles de años como guardianes, cazadores, pastores
        y, principalmente, como compañeros leales. Son animales sociales, inteligentes y capaces
        de adaptarse a diferentes entornos y estilos de vida. Sin embargo, tener un perro implica
        una gran responsabilidad, ya que requieren cuidados físicos, emocionales y de salud
        constantes.
      </Text>

      {/* Alimentación */}
      <Text style={styles.sectionTitle}>Alimentación</Text>
      <Text style={styles.text}>
        La dieta de un perro debe ser balanceada y adaptada a su edad, tamaño, nivel de actividad
        y estado de salud. Los cachorros necesitan más proteínas y energía, mientras que los perros
        adultos requieren una dieta equilibrada para mantener su peso ideal.
      </Text>
      <Text style={styles.text}>Recomendaciones básicas:</Text>
      <Text style={styles.list}>• Proporcionar alimento seco o húmedo de alta calidad.</Text>
      <Text style={styles.list}>• Evitar darles huesos pequeños, chocolate, cebolla, uvas y aguacate.</Text>
      <Text style={styles.list}>• Mantener agua fresca y limpia disponible en todo momento.</Text>
      <Text style={styles.list}>• Dividir su comida en 2 o 3 porciones al día.</Text>

      {/* Ejercicio */}
      <Text style={styles.sectionTitle}>Ejercicio y Actividad Física</Text>
      <Text style={styles.text}>
        Los perros son animales activos que requieren ejercicio diario para mantenerse saludables
        y equilibrados emocionalmente. La cantidad de actividad depende de la raza y edad:
      </Text>
      <Text style={styles.list}>• Razas grandes y energéticas (como Border Collie, Labrador, Pastor Alemán): mínimo 2 horas al día.</Text>
      <Text style={styles.list}>• Razas medianas: entre 1 y 1.5 horas al día.</Text>
      <Text style={styles.list}>• Razas pequeñas: al menos 30-45 minutos al día.</Text>
      <Text style={styles.text}>
        El ejercicio no solo evita el sobrepeso, sino que también previene problemas de conducta
        derivados del aburrimiento y la ansiedad.
      </Text>

      {/* Higiene */}
      <Text style={styles.sectionTitle}>Higiene y Cuidados</Text>
      <Text style={styles.text}>Los cuidados básicos de higiene incluyen:</Text>
      <Text style={styles.list}>• Baños cada 3-4 semanas (dependiendo de la raza y actividad).</Text>
      <Text style={styles.list}>• Cepillado frecuente para eliminar pelo muerto y evitar enredos.</Text>
      <Text style={styles.list}>• Limpieza de orejas y revisión para evitar infecciones.</Text>
      <Text style={styles.list}>• Corte de uñas regular para prevenir molestias al caminar.</Text>
      <Text style={styles.list}>• Cepillado dental 2-3 veces por semana.</Text>

      {/* Salud */}
      <Text style={styles.sectionTitle}>Salud y Vacunación</Text>
      <Text style={styles.text}>
        La prevención es clave para garantizar la salud de los perros. Desde cachorros deben recibir
        un esquema de vacunación que incluye moquillo, parvovirus, hepatitis, leptospirosis y rabia.
      </Text>
      <Text style={styles.text}>Cuidados médicos recomendados:</Text>
      <Text style={styles.list}>• Visita al veterinario al menos 1 vez al año.</Text>
      <Text style={styles.list}>• Desparasitación interna y externa cada 3 meses.</Text>
      <Text style={styles.list}>• Vacunación anual de refuerzo.</Text>
      <Text style={styles.list}>• Esterilización para evitar enfermedades reproductivas y camadas no deseadas.</Text>

      {/* Entrenamiento */}
      <Text style={styles.sectionTitle}>Entrenamiento y Socialización</Text>
      <Text style={styles.text}>
        Un perro bien educado es un perro feliz. El adiestramiento básico debe empezar desde cachorro
        y reforzarse en la edad adulta. Algunos comandos esenciales son: “sentado”, “quieto”, “aquí”,
        “abajo” y “no”. La socialización también es fundamental para que aprendan a convivir con
        personas, otros perros y diferentes entornos.
      </Text>
      <Text style={styles.text}>
        El entrenamiento debe basarse en el refuerzo positivo, es decir, premiar las conductas correctas
        con caricias, comida o juegos, en lugar de usar castigos.
      </Text>

      {/* Convivencia */}
      <Text style={styles.sectionTitle}>Convivencia en el Hogar</Text>
      <Text style={styles.text}>
        Los perros necesitan un espacio seguro y cómodo dentro del hogar. No deben permanecer
        encadenados ni aislados por largos periodos. Requieren compañía, atención y estimulación
        mental. Algunos consejos para la convivencia son:
      </Text>
      <Text style={styles.list}>• Proporcionar una cama cómoda y un área tranquila.</Text>
      <Text style={styles.list}>• Juguetes resistentes para morder y entretenerse.</Text>
      <Text style={styles.list}>• Rutinas diarias de paseo, juego y descanso.</Text>
      <Text style={styles.list}>• Paciencia y constancia en la educación.</Text>

      {/* Conclusión */}
      <Text style={styles.sectionTitle}>Conclusión</Text>
      <Text style={styles.text}>
        Tener un perro es un compromiso de largo plazo que puede durar entre 10 y 18 años,
        dependiendo de la raza y cuidados. A cambio de nuestra atención, los perros nos ofrecen
        amor incondicional, compañía y lealtad. Cuidarlos de manera responsable es una forma
        de agradecerles todo lo que nos brindan.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, color: '#f49953', textAlign: 'center' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  text: { fontSize: 16, lineHeight: 24, textAlign: 'justify', marginBottom: 10 },
  list: { fontSize: 16, lineHeight: 24, marginLeft: 15, marginBottom: 5, color: '#444' },
});
