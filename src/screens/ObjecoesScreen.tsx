// src/screens/ObjecoesScreen.tsx
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { OBJECTIONS } from "../data/constants";
import { useApp } from "../context/AppContext";

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

const styles = StyleSheet.create({
  backButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  container: { flex: 1, backgroundColor: "#0d1929" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "rgba(0,48,120,0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,163,224,0.2)",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 62,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: "#00a3e0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    zIndex: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  objChip: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  objChipActive: {
    backgroundColor: "rgba(0,48,120,0.5)",
    borderColor: "#00a3e0",
  },
  objChipText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  objChipTextActive: { color: "white" },
  objCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
  },
  objLabel: {
    fontSize: 10,
    color: "#ff3d00",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  objTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
  card: {
    backgroundColor: "#0d1929",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
  },
  cardText: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 20 },
  supportList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  supportTag: {
    backgroundColor: "rgba(0,163,224,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  supportText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#00a3e0",
    textTransform: "uppercase",
  },
  careCard: {
    borderColor: "rgba(255,214,0,0.2)",
    backgroundColor: "rgba(255,214,0,0.04)",
  },
  careTitle: { color: "#f5a623" },
  closingQuote: {
    borderRadius: 14,
    padding: 18,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.25)",
  },
  closingLabel: {
    fontSize: 9,
    color: "#f5a623",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  closingText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    lineHeight: 20,
    fontStyle: "italic",
  },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
  },
});
