import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/BattleCardScreen.styles";

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