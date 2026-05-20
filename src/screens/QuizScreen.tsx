import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useApp } from "../context/AppContext";
import { QUIZ_QUESTIONS, PROFILES } from "../data/constants";

export default function QuizScreen() {
  const { setQuizAnswers, setQuizResult, navigate, addHistory } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = QUIZ_QUESTIONS[step];
  const progress = (step / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (option: string) => {
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const allAnswers = Object.values(newAnswers).join(" ");
      let profile = "racional";
      for (const [key, p] of Object.entries(PROFILES)) {
        if (p.triggers?.some((t) => allAnswers.includes(t))) {
          profile = key;
          break;
        }
      }
      const result = (PROFILES as any)[profile];
      setQuizAnswers(newAnswers);
      setQuizResult(result);
      addHistory({
        type: "Quiz",
        icon: "🎯",
        main: `Quiz — Perfil ${result.name}`,
        meta: "Resultado identificado",
      });
      navigate("quiz-resultado");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate("home-customer")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz de Perfil</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>CLIENTE</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Pergunta {step + 1} de {QUIZ_QUESTIONS.length}
        </Text>
        <Text style={styles.question}>{q.question}</Text>

        {q.options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={styles.option}
            onPress={() => handleAnswer(opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  backText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
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
  content: { padding: 20 },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#00a3e0", borderRadius: 2 },
  progressText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
    lineHeight: 28,
  },
  option: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },
});
