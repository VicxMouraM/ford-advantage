import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/SearchResultScreen.styles";

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