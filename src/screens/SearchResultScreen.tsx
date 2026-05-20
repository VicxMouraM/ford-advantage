import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";

export default function SearchResultScreen() {
  const { comparisonResult, navigate, user } = useApp();

  if (!comparisonResult || !comparisonResult.specs) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>Nenhum resultado</Text>
        <Text style={styles.emptySub}>Faça uma busca primeiro</Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigate("free-search")}
        >
          <Text style={styles.emptyButtonText}>Buscar Veículo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { vehicle, specs } = comparisonResult;

  const searchBrand = comparisonResult.brand || vehicle?.brand || "Ford";
  const searchModel = comparisonResult.model || vehicle?.model || "Ranger";
  const searchVersion =
    comparisonResult.version || vehicle?.version || vehicle?.name || "";

  const availableCount = specs.filter((s: any) => s.available).length;

  const handleShare = async () => {
    let shareText = `🚗 ESPECIFICAÇÕES - ${vehicle?.name}\n\n`;
    specs.forEach((spec: any) => {
      shareText += `📌 ${spec.label}: ${spec.value}\n`;
    });
    shareText += `\n📊 Total: ${availableCount}/${specs.length} especificações disponíveis\n`;
    shareText += `🔍 Fonte: Ford Advantage Platform`;

    try {
      await Share.share({ message: shareText });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate("free-search")}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Especificações</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={["#003078", "#001a50"]}
          style={styles.vehicleCard}
        >
          <Text style={styles.vehicleLabel}>✅ VEÍCULO ENCONTRADO</Text>
          <Text style={styles.vehicleName}>{vehicle?.name}</Text>
          <Text style={styles.vehicleModel}>
            Modelo: {vehicle?.model || "RANGER 26MY"}
          </Text>
          <View style={styles.searchQuery}>
            <Text style={styles.searchQueryText}>
              Busca: {searchBrand} {searchModel} {searchVersion}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statsCard}>
          <Text style={styles.statsText}>
            📊 {availableCount} de {specs.length} especificações disponíveis
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(availableCount / specs.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.specsCard}>
          <Text style={styles.specsTitle}>
            📋 LISTA PADRONIZADA DE ESPECIFICAÇÕES
          </Text>
          <Text style={styles.specsSubtitle}>
            * Esta lista é sempre a mesma, independente do veículo pesquisado
          </Text>

          {specs.map((spec: any, index: number) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <View
                style={[
                  styles.specValueBadge,
                  spec.available
                    ? styles.availableBadge
                    : styles.unavailableBadge,
                ]}
              >
                <Text
                  style={[
                    styles.specValue,
                    !spec.available && styles.unavailableText,
                  ]}
                >
                  {spec.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>ℹ️ Sobre esta lista</Text>
          <Text style={styles.noteText}>
            • Formato padronizado: os mesmos campos para qualquer veículo
          </Text>
          <Text style={styles.noteText}>
            • 📭 Não disponível = Informação não encontrada na base de dados
          </Text>
          <Text style={styles.noteText}>• ✅ Sim = Equipamento presente</Text>
          <Text style={styles.noteText}>
            • ❌ Não = Equipamento não disponível
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newSearchBtn}
          onPress={() => navigate("free-search")}
        >
          <Text style={styles.newSearchBtnText}>🔍 Nova Busca</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  backButtonText: { color: "white", fontSize: 22, fontWeight: "bold" },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,163,224,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareButtonText: { fontSize: 18 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  content: { padding: 20 },
  vehicleCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
  },
  vehicleLabel: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  vehicleModel: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  searchQuery: {
    backgroundColor: "rgba(0,163,224,0.1)",
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  searchQueryText: { fontSize: 10, color: "#00a3e0", textAlign: "center" },
  statsCard: {
    backgroundColor: "rgba(0,163,224,0.08)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  statsText: {
    fontSize: 12,
    color: "#00a3e0",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#00c853", borderRadius: 2 },
  specsCard: {
    backgroundColor: "#0d1929",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  specsTitle: {
    backgroundColor: "rgba(0,163,224,0.1)",
    padding: 14,
    fontSize: 11,
    fontWeight: "bold",
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  specsSubtitle: {
    fontSize: 9,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  specLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    flex: 1,
    flexWrap: "wrap",
  },
  specValueBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 110,
    alignItems: "center",
  },
  availableBadge: { backgroundColor: "rgba(0,200,83,0.15)" },
  unavailableBadge: { backgroundColor: "rgba(255,61,0,0.1)" },
  specValue: { fontSize: 11, fontWeight: "bold", color: "#00c853" },
  unavailableText: { color: "#ff3d00" },
  noteCard: {
    backgroundColor: "rgba(84,110,122,0.1)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#f5a623",
    marginBottom: 6,
  },
  noteText: { fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 16 },
  newSearchBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  newSearchBtnText: { color: "white", fontSize: 15, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#0d1929",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
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
    marginBottom: 20,
    textAlign: "center",
  },
  emptyButton: {
    backgroundColor: "#00a3e0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  emptyButtonText: { color: "white", fontWeight: "bold" },
});
