import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import {
  RANGER_RAPTOR,
  COMPETITORS,
  ATTRIBUTES,
  FORD_ADVANTAGES,
} from "../data/constants";
import { styles } from "../styles/ResultadoScreen.styles";

export default function ResultadoScreen() {
  const { comparisonResult, user, navigate, addHistory } = useApp();

  if (!comparisonResult) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>⚡</Text>
        <Text style={styles.emptyTitle}>Nenhuma comparação</Text>
        <Text style={styles.emptySub}>Faça uma comparação primeiro</Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigate("comparador")}
        >
          <Text style={styles.emptyButtonText}>Comparar Veículos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { competitor, attributes } = comparisonResult;
  const comp =
    COMPETITORS[competitor.id as keyof typeof COMPETITORS] || competitor;

  const getStatus = (attrId: string) => {
    if (attrId === "price") {
      return {
        ford: RANGER_RAPTOR.price,
        rival: comp.price,
        verdict: "competitor",
        label: "Vantagem Concorrente",
      };
    }
    const fordVal = (RANGER_RAPTOR.specs as any)[attrId];
    const rivalVal = (comp.specs as any)[attrId];
    if (!rivalVal)
      return {
        ford: fordVal || "N/D",
        rival: "Não disponível",
        verdict: "unavailable",
        label: "N/D",
      };
    const adv = (FORD_ADVANTAGES as any)[attrId];
    const label =
      adv === "ford"
        ? "Vantagem Ford"
        : adv === "competitor"
          ? "Vantagem Concorrente"
          : "Empate Técnico";
    return { ford: fordVal, rival: rivalVal, verdict: adv || "tie", label };
  };

  const badgeClass = (verdict: string) => {
    if (verdict === "ford") return styles.badgeGreen;
    if (verdict === "competitor") return styles.badgeRed;
    if (verdict === "tie") return styles.badgeYellow;
    return styles.badgeGray;
  };

  const attrLabel = (id: string) =>
    ATTRIBUTES.find((a) => a.id === id)?.label || id;
  const fordAdvCount = attributes.filter((a: string) => {
    const s = getStatus(a);
    return s.verdict === "ford";
  }).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate("comparador")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Resultado</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={["#003078", "#001a50"]}
          style={styles.summaryCard}
        >
          <View style={styles.summaryContent}>
            <View>
              <Text style={styles.summaryLabel}>Ranger Raptor</Text>
              <Text style={styles.summaryVs}>vs</Text>
              <Text style={styles.summaryRival}>
                {comp.brand} {comp.model}
              </Text>
            </View>
            <View style={styles.advantageBox}>
              <Text style={styles.advantageCount}>{fordAdvCount}</Text>
              <Text style={styles.advantageLabel}>Vantagens Ford</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          {attributes.map((attrId: string) => {
            const s = getStatus(attrId);
            return (
              <View key={attrId} style={styles.resultRow}>
                <Text style={styles.resultAttr}>{attrLabel(attrId)}</Text>
                <View style={styles.resultValues}>
                  <Text style={styles.resultValLeft}>{s.ford}</Text>
                  <View style={[styles.resultBadge, badgeClass(s.verdict)]}>
                    <Text style={styles.resultBadgeText}>{s.label}</Text>
                  </View>
                  <Text style={styles.resultValRight}>{s.rival}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}