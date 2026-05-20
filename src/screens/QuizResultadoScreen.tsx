// src/screens/QuizResultadoScreen.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

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

        <TouchableOpacity style={styles.actionBtn} onPress={() => navigate('comparador')}>
          <Text style={styles.actionBtnText}>⚡ Comparar Veículos Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1929' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,48,120,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,163,224,0.2)',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: { fontSize: 20, color: 'white' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 1, flex: 1 },
  content: { padding: 20 },
  hero: { borderRadius: 20, padding: 28, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0,163,224,0.3)' },
  heroEmoji: { fontSize: 56, marginBottom: 12 },
  heroLabel: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 6 },
  heroName: { fontSize: 34, fontWeight: 'bold', color: 'white', letterSpacing: 4 },
  fitBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  fitExcellent: { backgroundColor: 'rgba(0,200,83,0.15)', borderWidth: 1, borderColor: 'rgba(0,200,83,0.3)' },
  fitGood: { backgroundColor: 'rgba(255,214,0,0.15)', borderWidth: 1, borderColor: 'rgba(255,214,0,0.3)' },
  fitModerate: { backgroundColor: 'rgba(255,61,0,0.1)', borderWidth: 1, borderColor: 'rgba(255,61,0,0.2)' },
  fitText: { fontSize: 12, fontWeight: 'bold', color: 'white' },
  card: { backgroundColor: '#0d1929', borderWidth: 1, borderColor: 'rgba(0,163,224,0.2)', borderRadius: 16, padding: 18, marginBottom: 12 },
  cardTitle: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  cardText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  priorities: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  priorityTag: { backgroundColor: 'rgba(0,163,224,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  priorityText: { fontSize: 11, fontWeight: 'bold', color: '#00a3e0', textTransform: 'uppercase' },
  closingQuote: { borderRadius: 14, padding: 18, marginVertical: 12, borderWidth: 1, borderColor: 'rgba(0,163,224,0.25)' },
  closingLabel: { fontSize: 9, color: '#f5a623', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  closingText: { fontSize: 14, color: 'white', fontWeight: '600', lineHeight: 20, fontStyle: 'italic' },
  actionBtn: { backgroundColor: '#00a3e0', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 16, shadowColor: '#00a3e0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  actionBtnText: { color: 'white', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
});