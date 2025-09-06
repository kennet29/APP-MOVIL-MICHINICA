import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Share,
} from "react-native";

// Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * DogsGuideScreen
 * Pantalla autosuficiente para mostrar una guía detallada de cuidados de perros.
 * - Búsqueda en tiempo real por palabras clave
 * - Secciones plegables con animación (acordeón)
 * - Botones de "Expandir todo / Colapsar todo" y "Compartir"
 * - Sin librerías externas
 *
 * Uso: importa en tu router/navegación como <DogsGuideScreen />
 */
export default function DogsGuideScreen() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const guide = useMemo(() => buildDogsGuide(), []);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guide.sections;
    return guide.sections
      .map((s) => ({
        ...s,
        items: s.items.filter((it) => it.toLowerCase().includes(q)),
      }))
      .filter((s) => s.items.length > 0);
  }, [guide.sections, query]);

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setAll = (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next: Record<string, boolean> = {};
    guide.sections.forEach((s) => (next[s.key] = value));
    setOpen(next);
  };

  const shareGuide = async () => {
    const content = buildShareText(guide);
    try {
      await Share.share({ title: guide.title, message: content });
    } catch (e) {
      // noop
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{guide.emoji} {guide.title}</Text>
      <Text style={styles.subtitle}>{guide.description}</Text>

      <View style={styles.controlsRow}>
        <TextInput
          placeholder="Buscar consejo (e.g., vacunas, cepillado, paseo)"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          placeholderTextColor="#7a7a7a"
          autoCorrect={false}
        />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.pill} onPress={() => setAll(true)}>
          <Text style={styles.pillText}>Expandir todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill} onPress={() => setAll(false)}>
          <Text style={styles.pillText}>Colapsar todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pill, styles.share]} onPress={shareGuide}>
          <Text style={styles.pillText}>Compartir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredSections.length === 0 ? (
          <Text style={styles.empty}>No hay resultados para "{query}"</Text>
        ) : (
          filteredSections.map((section) => {
            const isOpen = !!open[section.key];
            return (
              <View key={section.key} style={styles.card}>
                <TouchableOpacity onPress={() => toggle(section.key)} activeOpacity={0.8}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.cardTitle}>{section.title}</Text>
                    <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>›</Text>
                  </View>
                </TouchableOpacity>
                {isOpen && (
                  <View style={styles.itemsBox}>
                    {section.items.map((item, idx) => (
                      <View key={`${section.key}:${idx}`} style={styles.itemRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.itemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// Tipos
interface Section {
  key: string;
  title: string;
  items: string[];
}

interface DogsGuide {
  emoji: string;
  title: string;
  description: string;
  sections: Section[];
}

// Datos de la guía de perros (detallado)
function buildDogsGuide(): DogsGuide {
  return {
    emoji: "🐶",
    title: "Guía de Cuidados para Perros",
    description:
      "Salud preventiva, nutrición, ejercicio, higiene, comportamiento, seguridad y señales de alerta para tutores responsables.",
    sections: [
      {
        key: "health",
        title: "Salud y veterinaria",
        items: [
          "Chequeos cada 6–12 meses; mayores de 7 años cada 6 meses.",
          "Vacunas: moquillo, parvovirus, hepatitis, leptospirosis y rabia según calendario local.",
          "Desparasitación interna trimestral; externa (pulgas/garrapatas) según estación y zona.",
          "Esterilización recomendada para reducir riesgos (piometra, tumores mamarios/testiculares).",
          "Control de peso y condición corporal; ajustar dieta y ejercicio si aumenta o pierde peso.",
          "Botiquín básico: gasas, clorhexidina, suero fisiológico, termómetro, pinzas para garrapatas.",
        ],
      },
      {
        key: "food",
        title: "Alimentación",
        items: [
          "Pienso balanceado de calidad, acorde a edad/tamaño/actividad; dividir en 2–3 raciones.",
          "Agua fresca 24/7; lava el bebedero a diario.",
          "Evita: chocolate, aguacate, cebolla/ajo, uvas/pasas, alcohol, café, xilitol, huesos cocidos.",
          "Transiciones de dieta graduales (5–7 días) para prevenir malestar digestivo.",
          "Snacks saludables: trozos pequeños, frutas seguras (manzana sin semillas), verduras (zanahoria).",
          "Consulta sobre dietas caseras o crudas con veterinario/nutricionista antes de implementarlas.",
        ],
      },
      {
        key: "exercise",
        title: "Ejercicio y estimulación mental",
        items: [
          "Paseos diarios 30–60 min; razas activas pueden requerir 90+ min.",
          "Juegos de olfato (snuffle mat), búsqueda de premios y rompecabezas caninos.",
          "Entrenamiento de obediencia básica (sentado, quieto, ven) 5–10 min al día.",
          "Socialización temprana con perros/personas/ruidos para prevenir miedos.",
          "Variar rutas de paseo y juegos para evitar aburrimiento.",
        ],
      },
      {
        key: "hygiene",
        title: "Higiene y cuidados",
        items: [
          "Baño cada 3–4 semanas o según actividad y tipo de pelo.",
          "Cepillado: diario en pelo largo, 1–2/semana en pelo corto.",
          "Uñas: recortar cada 3–4 semanas; limar si es necesario.",
          "Dientes: cepillado 2–3 veces/semana; snacks dentales/gel en apoyo.",
          "Orejas: limpiar con gasa y solución específica; evita cotonetes.",
          "Almohadillas: revisar por grietas/cortes; hidratar si están resecas.",
        ],
      },
      {
        key: "behavior",
        title: "Comportamiento y entrenamiento",
        items: [
          "Usa refuerzo positivo (premios/clicker); evita castigos físicos.",
          "Rutinas consistentes de comida/paseo/descanso para reducir ansiedad.",
          "Manejo de ladridos: ejercicio suficiente, enriquecimiento y entrenamiento de calma.",
          "Prevención de ansiedad por separación: salidas cortas progresivas y juguetes interactivos.",
        ],
      },
      {
        key: "safety",
        title: "Seguridad en casa y exteriores",
        items: [
          "Collar con placa y microchip registrado.",
          "Nunca dejar en auto cerrado; golpe de calor en minutos.",
          "Pasear con correa y arnés seguro; revisar cierres y desgaste.",
          "En casa: guardar productos tóxicos, cables, piezas pequeñas y basura inaccesibles.",
          "Fuegos artificiales: preparar refugio, usar música blanca y reforzar calma.",
        ],
      },
      {
        key: "travel",
        title: "Viajes y salidas",
        items: [
          "Transportadora o arnés de seguridad homologado en auto.",
          "Paradas cada 2–3 h para agua y paseo breve.",
          "Llevar cartilla de vacunación, placas extras y bolsitas higiénicas.",
          "Verificar políticas pet-friendly del destino y clima (calor/frío extremos).",
        ],
      },
      {
        key: "alerts",
        title: "Señales de alerta (ir al vet)",
        items: [
          "Vómitos/diarrea persistentes (>24 h) o con sangre.",
          "Letargo marcado, falta de apetito o dificultad respiratoria.",
          "Cojea, dolor al tocar, fiebre (>39.2 °C).",
          "Intoxicación sospechada (ingesta de tóxicos o medicamentos humanos).",
        ],
      },
      {
        key: "checklist",
        title: "Checklist rápido del día a día",
        items: [
          "Agua limpia, comida medida, paseo y juego diario.",
          "Revisión rápida de piel/orejas/almohadillas.",
          "Recoger heces, limpiar platos y espacio de descanso.",
          "Tiempo de calidad: 10–15 min de entrenamiento o juego.",
        ],
      },
    ],
  };
}

function buildShareText(guide: DogsGuide) {
  let txt = `${guide.title}\n\n`;
  guide.sections.forEach((s) => {
    txt += `• ${s.title}\n`;
    s.items.forEach((i) => (txt += `  - ${i}\n`));
    txt += "\n";
  });
  return txt;
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0c",
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#b8b8b8",
    textAlign: "center",
    marginTop: 4,
    marginHorizontal: 16,
  },
  controlsRow: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  search: {
    backgroundColor: "#16171a",
    borderWidth: 1,
    borderColor: "#25262b",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#ffffff",
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  pill: {
    backgroundColor: "#1f2024",
    borderColor: "#2c2d33",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  share: {
    backgroundColor: "#243145",
    borderColor: "#2f4670",
  },
  pillText: {
    color: "#e6e6e6",
    fontWeight: "700",
    fontSize: 12,
  },
  scroll: {
    padding: 16,
  },
  empty: {
    color: "#bcbcbc",
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#121317",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#24262b",
    padding: 12,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  chevron: {
    color: "#9aa0a6",
    fontSize: 24,
    transform: [{ rotate: "90deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "270deg" }],
  },
  itemsBox: {
    marginTop: 10,
    gap: 10,
  },
  itemRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6aa9ff",
    marginTop: 6,
  },
  itemText: {
    color: "#e9e9e9",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
