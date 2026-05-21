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
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { SALE_SCENARIOS } from "../data/constants";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/SimuladorScreen.styles";

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