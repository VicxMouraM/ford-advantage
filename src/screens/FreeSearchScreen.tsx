import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
import { styles } from "../styles/FreeSearchScreen.styles";

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