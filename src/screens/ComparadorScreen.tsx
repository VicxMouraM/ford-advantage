import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useApp } from "../context/AppContext";
import { COMPETITORS, ATTRIBUTES } from "../data/constants";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComparadorScreen.styles";

export default function ComparadorScreen() {
  const {
    setComparisonState,
    setComparisonResult,
    navigate,
    addHistory,
    user,
  } = useApp();

  const [competitorModalVisible, setCompetitorModalVisible] = useState(false);
  const backScreen = user?.type === "ford" ? "home-ford" : "home-customer";
  const [competitor, setCompetitor] = useState("hilux");
  const [selectedAttrs, setSelectedAttrs] = useState([
    "power",
    "torque",
    "acceleration",
    "transmission",
    "suspension",
    "price",
  ]);
  const [loading, setLoading] = useState(false);

  const toggleAttr = (id: string) => {
    setSelectedAttrs((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const compare = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const result = {
      competitor: COMPETITORS[competitor as keyof typeof COMPETITORS],
      attributes: selectedAttrs,
    };
    setComparisonState(result);
    setComparisonResult(result);
    addHistory({
      type: "Comparação",
      icon: "⚡",
      main: `Ranger Raptor vs ${COMPETITORS[competitor as keyof typeof COMPETITORS].model}`,
      meta: `${selectedAttrs.length} atributos comparados`,
    });
    setLoading(false);
    navigate("resultado");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a3e0" />
        <Text style={styles.loadingText}>Analisando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate(backScreen)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Comparador Inteligente</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user?.type === "ford" ? "FORD" : "CLIENTE"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={["#003078", "#001a50"]}
          style={styles.referenceCard}
        >
          <View style={styles.referenceContent}>
            <Text style={styles.referenceIcon}>🏆</Text>
            <View>
              <Text style={styles.referenceLabel}>Referência</Text>
              <Text style={styles.referenceTitle}>Ford Ranger Raptor</Text>
              <Text style={styles.referenceSpecs}>
                V6 3.0L Biturbo • 397 cv
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.label}>Veículo Concorrente</Text>
          <TouchableOpacity
            style={styles.selectButton}
            activeOpacity={0.8}
            onPress={() => setCompetitorModalVisible(true)}
          >
            <Text style={styles.selectButtonText}>
              {`${COMPETITORS[competitor as keyof typeof COMPETITORS].brand} ${
                COMPETITORS[competitor as keyof typeof COMPETITORS].model
              } ${COMPETITORS[competitor as keyof typeof COMPETITORS].version}`}
            </Text>

            <Text style={styles.selectArrow}>⌄</Text>
          </TouchableOpacity>

          <Modal
            visible={competitorModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setCompetitorModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setCompetitorModalVisible(false)}
            >
              <Pressable style={styles.modalContent}>
                <Text style={styles.modalTitle}>Escolha o concorrente</Text>

                {Object.values(COMPETITORS).map((c) => {
                  const isSelected = competitor === c.id;

                  return (
                    <TouchableOpacity
                      key={c.id}
                      style={[
                        styles.competitorOption,
                        isSelected && styles.competitorOptionActive,
                      ]}
                      onPress={() => {
                        setCompetitor(c.id);
                        setCompetitorModalVisible(false);
                      }}
                    >
                      <View>
                        <Text
                          style={[
                            styles.competitorOptionTitle,
                            isSelected && styles.competitorOptionTitleActive,
                          ]}
                        >
                          {c.brand} {c.model}
                        </Text>

                        <Text style={styles.competitorOptionSubtitle}>
                          {c.version}
                        </Text>
                      </View>

                      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </Pressable>
            </Pressable>
          </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Atributos para Comparar ({selectedAttrs.length}/{ATTRIBUTES.length})
          </Text>
          <View style={styles.attrGrid}>
            {ATTRIBUTES.map((attr) => (
              <TouchableOpacity
                key={attr.id}
                style={[
                  styles.attrChip,
                  selectedAttrs.includes(attr.id) && styles.attrChipActive,
                ]}
                onPress={() => toggleAttr(attr.id)}
              >
                <Text
                  style={[
                    styles.attrChipText,
                    selectedAttrs.includes(attr.id) &&
                      styles.attrChipTextActive,
                  ]}
                >
                  {attr.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.compareBtn,
            selectedAttrs.length === 0 && styles.compareBtnDisabled,
          ]}
          onPress={compare}
          disabled={selectedAttrs.length === 0}
        >
          <Text style={styles.compareBtnText}>⚡ Gerar Comparação</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}