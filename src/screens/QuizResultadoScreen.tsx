import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { styles } from '../styles/QuizResultadoScreen.styles';

export default function QuizResultadoScreen() {
  const { quizResult, navigate } = useApp();

  if (!quizResult) return null;

  const fitClass = quizResult.raptor_fit === 'EXCELENTE' ? styles.fitExcellent : quizResult.raptor_fit === 'BOA' ? styles.fitGood : styles.fitModerate;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('quiz')} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultado do Quiz</Text>
      </View>

      <View style={styles.content}>
        <LinearGradient colors={['#001a4d', '#003078']} style={styles.hero}>
          <Text style={styles.heroEmoji}>{quizResult.emoji}</Text>
          <Text style={styles.heroLabel}>Seu Perfil</Text>
          <Text style={styles.heroName}>{quizResult.name?.toUpperCase()}</Text>
          <View style={[styles.fitBadge, fitClass]}>
            <Text style={styles.fitText}>Compatibilidade com Raptor: {quizResult.raptor_fit}</Text>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📖 Descrição</Text>
          <Text style={styles.cardText}>{quizResult.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⭐ Suas Prioridades</Text>
          <View style={styles.priorities}>
            {quizResult.priorities?.map((p: string) => (
              <View key={p} style={styles.priorityTag}><Text style={styles.priorityText}>{p}</Text></View>
            ))}
          </View>
        </View>

        <LinearGradient colors={['rgba(0,163,224,0.12)', 'rgba(0,86,179,0.08)']} style={styles.closingQuote}>
          <Text style={styles.closingLabel}>🏆 Por que a Ranger Raptor combina</Text>
          <Text style={styles.closingText}>{quizResult.argument}</Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}