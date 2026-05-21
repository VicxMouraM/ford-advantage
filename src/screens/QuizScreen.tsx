import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useApp } from "../context/AppContext";
import { QUIZ_QUESTIONS, PROFILES } from "../data/constants";
import { styles } from "../styles/QuizScreen.styles";

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