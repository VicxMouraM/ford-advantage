import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { useApp } from "../context/AppContext";

export default function BattleCardScreen() {
  const { navigate } = useApp();

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

          <Text style={styles.headerTitle}>BattleCard Ford</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>FORD</Text>
          </View>
        </View>

        <View style={styles.content}>
          <LinearGradient
            colors={["#003078", "#001a50"]}
            style={styles.heroCard}
          >
            <Text style={styles.heroLabel}>Análise Estratégica</Text>
            <Text style={styles.heroTitle}>Ranger Raptor vs Concorrência</Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📋 Resumo Competitivo</Text>
            <Text style={styles.cardText}>
              A Ford Ranger Raptor apresenta vantagem em performance, potência,
              transmissão, suspensão e proposta off-road. O concorrente pode ter
              força em preço ou tradição de mercado, mas a Ranger Raptor entrega
              uma proposta mais premium e esportiva.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏆 Top Vantagens Ford</Text>
            {[
              "Motor V6 3.0L Biturbo — único no segmento",
              "397 cv de potência (+77% vs Hilux)",
              "583 Nm de torque",
              "Transmissão automática de 10 velocidades",
              'Suspensão FOX Racing 2.5" Live Valve',
              "0–100 km/h em 5,8s — mais rápida do segmento",
              "7 modos de condução off-road",
            ].map((v) => (
              <View key={v} style={styles.listItem}>
                <Text style={styles.listText}>▸ {v}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚠️ Pontos de Atenção</Text>
            {[
              "Preço premium pode ser uma barreira inicial",
              "Motor a gasolina vs diesel dos concorrentes",
              "Clientes podem priorizar consumo em rotas longas",
              "Concorrentes com maior tradição em frotas",
            ].map((v) => (
              <View key={v} style={styles.listItem}>
                <Text style={styles.listText}>▸ {v}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🚨 Riscos do Concorrente</Text>
            {[
              "Menor potência e aceleração",
              "Suspensão convencional vs FOX certificada",
              "Menos modos de condução off-road",
              "Motor sem o refinamento do V6 biturbo",
            ].map((v) => (
              <View key={v} style={styles.listItem}>
                <Text style={styles.listText}>▸ {v}</Text>
              </View>
            ))}
          </View>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightText}>
              🎯 Recomendação de Posicionamento
            </Text>
            <Text style={styles.highlightSub}>
              "Posicionar a Ranger Raptor como uma picape de alta performance,
              voltada para clientes que buscam exclusividade, potência,
              tecnologia e capacidade off-road superior."
            </Text>
          </View>

          <LinearGradient
            colors={["rgba(0,163,224,0.12)", "rgba(0,86,179,0.08)"]}
            style={styles.closingQuote}
          >
            <Text style={styles.closingLabel}>📌 Conclusão Executiva</Text>
            <Text style={styles.closingText}>
              "A Ranger Raptor não compete no mesmo segmento das picapes
              convencionais. É uma categoria própria — performance,
              exclusividade e tecnologia incomparáveis."
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </FordExclusiveGate>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

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
  headerTitle: {
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
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  content: { padding: 20 },
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
  },
  heroLabel: {
    fontSize: 10,
    color: "#f5a623",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroTitle: { fontSize: 20, fontWeight: "bold", color: "white" },
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
  listItem: { marginBottom: 8 },
  listText: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 20 },
  highlightCard: {
    backgroundColor: "rgba(0,163,224,0.08)",
    borderLeftWidth: 3,
    borderLeftColor: "#00a3e0",
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  highlightText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  highlightSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
    fontStyle: "italic",
    marginTop: 8,
  },
  closingQuote: {
    borderRadius: 14,
    padding: 18,
    marginTop: 12,
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
});
