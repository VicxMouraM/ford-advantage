import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import {
  mockApi,
  getStandardizedSpecs,
  STANDARD_SPECS,
} from "../services/vehicleService";
export default function FreeSearchScreen() {
  const { navigate, setComparisonResult, addHistory, user } = useApp();

  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Ranger");
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(false);
  const [similarVehicles, setSimilarVehicles] = useState<string[]>([]);
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const backScreen = user?.type === "ford" ? "home-ford" : "home-customer";

  const handleSearch = async (
    customBrand?: string,
    customModel?: string,
    customVersion?: string,
  ) => {
    const searchBrand = customBrand ?? brand;
    const searchModel = customModel ?? model;
    const searchVersion = customVersion ?? version;

    if (!searchBrand.trim()) {
      Alert.alert("Atenção", "Por favor, digite a marca do veículo");
      return;
    }

    if (!searchVersion.trim()) {
      Alert.alert("Atenção", "Por favor, digite a versão do veículo");
      return;
    }

    setLoading(true);
    setSimilarVehicles([]);
    setNotFoundMessage("");

    try {
      const result = await mockApi.searchVehicle(
        searchBrand,
        searchModel,
        searchVersion,
      );

      if (result.found && result.vehicle) {
        const standardizedSpecs = getStandardizedSpecs(result.vehicle);

        const comparisonData = {
          brand: searchBrand,
          model: searchModel,
          version: searchVersion,
          vehicle: {
            ...result.vehicle,
            brand: searchBrand,
            model: result.vehicle.model || searchModel,
            version: searchVersion,
          },
          specs: standardizedSpecs,
        };

        setComparisonResult(comparisonData as any);

        addHistory({
          type: "Busca",
          icon: "🔍",
          main: `${searchBrand} ${searchModel} ${searchVersion}`.trim(),
          meta: `${result.vehicle.name} - ${STANDARD_SPECS.length} especificações`,
        });

        navigate("search-result");
      } else {
        setNotFoundMessage(
          result.message || "Não foi possível encontrar esse veículo na base.",
        );
      }
    } catch (error) {
      console.error("❌ Erro na busca:", error);
      Alert.alert("Erro", "Falha ao buscar veículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const validateRangerRaptor = () => {
    setBrand("Ford");
    setModel("Ranger");
    setVersion("Raptor");

    handleSearch("Ford", "Ranger", "Raptor");
  };

  const searchSimilar = (vehicleName: string) => {
    const parts = vehicleName.split(" ");
    setBrand(parts[0] || "");
    setModel(parts[1] || "");
    setVersion(parts.slice(2).join(" ") || "");
    setSimilarVehicles([]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate(backScreen)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar Veículo</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user?.type === "ford" ? "FORD" : "CLIENTE"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <LinearGradient colors={["#003078", "#001a50"]} style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔍 Busca Livre</Text>
          <Text style={styles.infoText}>
            Digite a marca, modelo e versão do veículo que deseja pesquisar. O
            sistema retornará uma lista padronizada de especificações técnicas.
          </Text>
        </LinearGradient>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Marca *</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Ford"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={brand}
              onChangeText={setBrand}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Modelo</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Ranger"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={model}
              onChangeText={setModel}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Versão</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Raptor, XLT 3.0L V6 AT 26MY, Limited 3.0L V6 26MY"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={version}
              onChangeText={setVersion}
            />
          </View>

          <TouchableOpacity
            style={[styles.searchBtn, loading && styles.searchBtnDisabled]}
            onPress={() => handleSearch()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.searchBtnText}>🔍 Buscar Veículo</Text>
            )}
          </TouchableOpacity>

          {notFoundMessage ? (
            <View style={styles.notFoundCard}>
              <Text style={styles.notFoundTitle}>
                ❌ Veículo não encontrado
              </Text>
              <Text style={styles.notFoundText}>{notFoundMessage}</Text>
              <Text style={styles.notFoundHint}>
                Tente buscar por um dos veículos disponíveis na base abaixo.
              </Text>
            </View>
          ) : null}
        </View>

        {/* Botão de validação Ford Ranger Raptor */}
        <View style={styles.validationSection}>
          <Text style={styles.validationTitle}>🎯 Busca Sugerida</Text>
          <Text style={styles.validationText}>
            Comece pela Ford Ranger Raptor e conheça a ficha técnica de um
            modelo de alta performance da Ford, com especificações claras,
            organizadas e fáceis de comparar.
          </Text>
          <TouchableOpacity
            style={styles.validationBtn}
            onPress={validateRangerRaptor}
          >
            <Text style={styles.validationBtnText}>
              ✅ Buscar Ford Ranger Raptor
            </Text>
          </TouchableOpacity>
        </View>

        {similarVehicles.length > 0 && (
          <View style={styles.similarSection}>
            <Text style={styles.similarTitle}>
              📋 Veículos similares disponíveis:
            </Text>
            {similarVehicles.map((vehicle, index) => (
              <TouchableOpacity
                key={index}
                style={styles.similarItem}
                onPress={() => searchSimilar(vehicle)}
              >
                <Text style={styles.similarText}>• {vehicle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.availableSection}>
          <Text style={styles.availableTitle}>
            📊 Veículos disponíveis na base:
          </Text>
          <Text style={styles.availableList}>
            • Raptor (Ford Ranger){"\n"}• XLT 3.0L V6 AT 26MY (Ford Ranger)
            {"\n"}• Limited 3.0L V6 26MY (Ford Ranger){"\n"}• Limited + 3.0L V6
            26MY (Ford Ranger)
          </Text>
          <Text style={styles.note}>
            * Mais veículos serão adicionados em breve conforme integração com a
            base de dados da Ford.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  disabledInput: {
    opacity: 0.7,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  notFoundCard: {
    backgroundColor: "rgba(239,68,68,0.08)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.35)",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundTitle: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notFoundText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  notFoundHint: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontStyle: "italic",
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
  backButtonText: { color: "white", fontSize: 22, fontWeight: "bold" },
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
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  infoText: { fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 18 },
  form: { marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 12,
    padding: 14,
    color: "white",
    fontSize: 14,
  },
  searchBtn: {
    backgroundColor: "#00a3e0",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#00a3e0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchBtnDisabled: { opacity: 0.5 },
  searchBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  validationSection: {
    backgroundColor: "rgba(245,166,35,0.08)",
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.3)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  validationTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#f5a623",
    marginBottom: 8,
  },
  validationText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 12,
    lineHeight: 16,
  },
  validationBtn: {
    backgroundColor: "#f5a623",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  validationBtnText: { color: "#0d1929", fontSize: 13, fontWeight: "bold" },
  similarSection: {
    backgroundColor: "rgba(0,163,224,0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
  },
  similarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00a3e0",
    marginBottom: 12,
  },
  similarItem: { paddingVertical: 8 },
  similarText: { fontSize: 13, color: "rgba(255,255,255,0.8)" },
  availableSection: {
    backgroundColor: "#0d1929",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 16,
    padding: 16,
  },
  availableTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  availableList: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 20,
    marginBottom: 12,
  },
  note: { fontSize: 10, color: "rgba(255,255,255,0.3)", fontStyle: "italic" },
});
