import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { OBJECTIONS } from "../data/constants";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ObjecoesScreen.styles";

export default function ObjecoesScreen() {
  const { navigate } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const obj = selected ? OBJECTIONS.find((o) => o.id === selected) : null;

  return (
    <FordExclusiveGate>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate("home-ford")}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Objeções do Cliente</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>FORD</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Selecione a Objeção</Text>

          {OBJECTIONS.map((o) => (
            <TouchableOpacity
              key={o.id}
              style={[
                styles.objChip,
                selected === o.id && styles.objChipActive,
              ]}
              onPress={() => setSelected(o.id)}
            >
              <Text
                style={[
                  styles.objChipText,
                  selected === o.id && styles.objChipTextActive,
                ]}
              >
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}

          {obj && (
            <>
              <LinearGradient
                colors={["#001a4d", "#003078"]}
                style={styles.objCard}
              >
                <Text style={styles.objLabel}>Objeção</Text>
                <Text style={styles.objTitle}>"{obj.label}"</Text>
              </LinearGradient>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>✅ Resposta Recomendada</Text>
                <Text style={styles.cardText}>{obj.response}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Dados de Apoio</Text>
                <View style={styles.supportList}>
                  {obj.support.map((s) => (
                    <View key={s} style={styles.supportTag}>
                      <Text style={styles.supportText}>{s}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.card, styles.careCard]}>
                <Text style={[styles.cardTitle, styles.careTitle]}>
                  ⚠️ Ponto de Cuidado
                </Text>
                <Text style={styles.cardText}>{obj.care}</Text>
              </View>

              <LinearGradient
                colors={["rgba(0,163,224,0.12)", "rgba(0,86,179,0.08)"]}
                style={styles.closingQuote}
              >
                <Text style={styles.closingLabel}>🎤 Frase de Fechamento</Text>
                <Text style={styles.closingText}>"{obj.closing}"</Text>
              </LinearGradient>
            </>
          )}

          {!selected && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🛡️</Text>
              <Text style={styles.emptyTitle}>Selecione uma objeção</Text>
              <Text style={styles.emptySub}>
                Veja como responder cada objeção do cliente
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </FordExclusiveGate>
  );
}