import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useApp } from "../context/AppContext";
import { COMPETITORS, ATTRIBUTES } from "../data/constants";
import { LinearGradient } from "expo-linear-gradient";

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

const styles = StyleSheet.create({
  selectButton: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectButtonText: {
    flex: 1,
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 12,
  },

  selectArrow: {
    color: "#00a3e0",
    fontSize: 22,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#0d1929",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.25)",
  },

  modalTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  competitorOption: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  competitorOptionActive: {
    backgroundColor: "rgba(0,163,224,0.16)",
    borderColor: "#00a3e0",
  },

  competitorOptionTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  competitorOptionTitleActive: {
    color: "#00a3e0",
  },

  competitorOptionSubtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    marginTop: 2,
  },

  checkIcon: {
    color: "#00a3e0",
    fontSize: 20,
    fontWeight: "bold",
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
  backButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#0d1929",
  },
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
  content: {
    padding: 20,
  },
  referenceCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
  },
  referenceContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  referenceIcon: {
    fontSize: 28,
  },
  referenceLabel: {
    fontSize: 9,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  referenceSpecs: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    color: "white",
    height: 50,
  },
  attrGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  attrChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  attrChipActive: {
    backgroundColor: "#00a3e0",
    borderColor: "transparent",
  },
  attrChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
  },
  attrChipTextActive: {
    color: "white",
  },
  compareBtn: {
    backgroundColor: "#00a3e0",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#00a3e0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  compareBtnDisabled: {
    opacity: 0.5,
  },
  compareBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0d1929",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
