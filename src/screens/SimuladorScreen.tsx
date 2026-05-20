import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { SALE_SCENARIOS } from "../data/constants";
import { useApp } from "../context/AppContext";

export default function SimuladorScreen() {
  const { navigate } = useApp();
  const { addHistory } = useApp();
  const [form, setForm] = useState({
    competitor: "",
    profile: "",
    objection: "",
    scenario: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState<null | {
    key: string;
    label: string;
    opts: string[];
  }>(null);

  const setField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const ready = Object.values(form).every((v) => v);

  const simulate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const conversions: Record<string, string> = {
      performance: "ALTA",
      aventureiro: "ALTA",
      premium: "ALTA",
      racional: "MÉDIA",
      familia: "MÉDIA",
      "Trabalho pesado": "MODERADA",
      "Sensível a preço": "MODERADA",
    };
    const profileKey = form.profile;
    const conversion = conversions[profileKey] || "MÉDIA";
    setResult({ ...form, conversion });
    addHistory({
      type: "Simulação",
      icon: "🎯",
      main: `Simulação: ${form.profile} vs ${form.competitor}`,
      meta: form.scenario,
    });
    setLoading(false);
  };

  const conversionColor =
    result?.conversion === "ALTA"
      ? "#00c853"
      : result?.conversion === "MÉDIA"
        ? "#ffd600"
        : "#ff3d00";

  if (loading) {
    return (
      <FordExclusiveGate>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00a3e0" />
          <Text style={styles.loadingText}>Simulando cenário...</Text>
        </View>
      </FordExclusiveGate>
    );
  }

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

          <Text style={styles.headerTitle}>Simulador de Venda</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>FORD</Text>
          </View>
        </View>

        <View style={styles.content}>
          {!result ? (
            <>
              <Text style={styles.sectionTitle}>Configure o Cenário</Text>

              {[
                {
                  key: "competitor",
                  label: "Veículo Concorrente",
                  opts: SALE_SCENARIOS.competitors,
                },
                {
                  key: "profile",
                  label: "Perfil do Cliente",
                  opts: SALE_SCENARIOS.clientProfiles,
                },
                {
                  key: "objection",
                  label: "Objeção Principal",
                  opts: SALE_SCENARIOS.objections,
                },
                {
                  key: "scenario",
                  label: "Cenário de Venda",
                  opts: SALE_SCENARIOS.scenarios,
                },
              ].map(({ key, label, opts }) => {
                const selectedValue = (form as any)[key];

                return (
                  <View key={key} style={styles.inputGroup}>
                    <Text style={styles.label}>{label}</Text>

                    <TouchableOpacity
                      style={styles.selectButton}
                      activeOpacity={0.8}
                      onPress={() => setActiveSelect({ key, label, opts })}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          !selectedValue && styles.selectButtonPlaceholder,
                        ]}
                      >
                        {selectedValue || "Selecione..."}
                      </Text>

                      <Text style={styles.selectArrow}>⌄</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <TouchableOpacity
                style={[
                  styles.simulateBtn,
                  !ready && styles.simulateBtnDisabled,
                ]}
                onPress={simulate}
                disabled={!ready}
              >
                <Text style={styles.simulateBtnText}>🎯 Gerar Simulação</Text>
              </TouchableOpacity>
              <Modal
                visible={!!activeSelect}
                transparent
                animationType="fade"
                onRequestClose={() => setActiveSelect(null)}
              >
                <Pressable
                  style={styles.modalOverlay}
                  onPress={() => setActiveSelect(null)}
                >
                  <Pressable style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{activeSelect?.label}</Text>

                    {activeSelect?.opts.map((option) => {
                      const isSelected = activeSelect
                        ? (form as any)[activeSelect.key] === option
                        : false;

                      return (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.selectOption,
                            isSelected && styles.selectOptionActive,
                          ]}
                          onPress={() => {
                            if (!activeSelect) return;

                            setField(activeSelect.key, option);
                            setActiveSelect(null);
                          }}
                        >
                          <Text
                            style={[
                              styles.selectOptionText,
                              isSelected && styles.selectOptionTextActive,
                            ]}
                          >
                            {option}
                          </Text>

                          {isSelected && (
                            <Text style={styles.checkIcon}>✓</Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </Pressable>
                </Pressable>
              </Modal>
            </>
          ) : (
            <>
              <LinearGradient
                colors={["#001a3d", "#002060"]}
                style={styles.resultCard}
              >
                <Text style={styles.resultLabel}>Situação</Text>
                <Text style={styles.resultText}>
                  O cliente está comparando a Ranger Raptor com a{" "}
                  {result.competitor} e demonstra interesse no perfil{" "}
                  {result.profile}, com objeção principal em{" "}
                  <Text style={styles.bold}>{result.objection}</Text>.
                </Text>

                <Text style={[styles.resultLabel, { marginTop: 16 }]}>
                  Risco da Venda
                </Text>
                <Text style={styles.resultText}>
                  O cliente pode ser influenciado pela objeção de{" "}
                  {result.objection} ou pela percepção de marca do concorrente.
                </Text>

                <Text style={[styles.resultLabel, { marginTop: 16 }]}>
                  Melhor Abordagem Ford
                </Text>
                <Text style={styles.resultText}>
                  Evitar confronto direto. Reposicionar a conversa para o valor
                  entregue pela Ranger Raptor: performance, tecnologia,
                  exclusividade e capacidade off-road.
                </Text>

                <Text style={[styles.resultLabel, { marginTop: 16 }]}>
                  Argumento Principal
                </Text>
                <Text style={styles.resultText}>
                  A Ranger Raptor entrega um conjunto técnico muito acima de uma
                  picape tradicional: motor V6 biturbo, 397 cv, transmissão de
                  10 velocidades, suspensão FOX e 7 modos de condução.
                </Text>

                <View style={styles.conversionBox}>
                  <View>
                    <Text style={styles.conversionLabel}>
                      Chance de Conversão
                    </Text>
                    <Text
                      style={[
                        styles.conversionValue,
                        { color: conversionColor },
                      ]}
                    >
                      {result.conversion}
                    </Text>
                  </View>
                  <Text style={styles.conversionIcon}>
                    {result.conversion === "ALTA"
                      ? "🔥"
                      : result.conversion === "MÉDIA"
                        ? "⚡"
                        : "⚠️"}
                  </Text>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={["rgba(0,163,224,0.12)", "rgba(0,86,179,0.08)"]}
                style={styles.closingQuote}
              >
                <Text style={styles.closingLabel}>🎤 Frase de Fechamento</Text>
                <Text style={styles.closingText}>
                  "Se você procura apenas uma picape funcional, há várias
                  opções. Mas se quer uma experiência única de performance,
                  presença e capacidade off-road — a Ranger Raptor é a escolha
                  mais completa."
                </Text>
              </LinearGradient>

              <TouchableOpacity
                style={styles.newBtn}
                onPress={() => setResult(null)}
              >
                <Text style={styles.newBtnText}>↩ Nova Simulação</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </FordExclusiveGate>
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

  selectButtonPlaceholder: {
    color: "rgba(255,255,255,0.45)",
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

  selectOption: {
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

  selectOptionActive: {
    backgroundColor: "rgba(0,163,224,0.16)",
    borderColor: "#00a3e0",
  },

  selectOptionText: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  selectOptionTextActive: {
    color: "#00a3e0",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  simulateBtn: {
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
  simulateBtnDisabled: { opacity: 0.5 },
  simulateBtnText: {
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
  resultCard: {
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.3)",
    borderRadius: 20,
    padding: 22,
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 10,
    color: "#00a3e0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  resultText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
    marginBottom: 4,
  },
  bold: { fontWeight: "bold", color: "white" },
  conversionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,163,224,0.08)",
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
  },
  conversionLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  conversionValue: { fontSize: 20, fontWeight: "bold", marginTop: 4 },
  conversionIcon: { fontSize: 28 },
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
  newBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  newBtnText: { color: "white", fontSize: 15, fontWeight: "bold" },
});
