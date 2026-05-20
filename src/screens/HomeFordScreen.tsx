// src/screens/HomeFordScreen.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function HomeFordScreen() {
  const { navigate } = useApp();

  const items = [
    { icon: '⚡', title: 'Comparador Inteligente', sub: 'Compare com concorrentes', screen: 'comparador' },
    { icon: '🃏', title: 'BattleCard Ford', sub: 'Análise estratégica', screen: 'battlecard' },
    { icon: '💬', title: 'Argumentos de Venda', sub: 'Por perfil de cliente', screen: 'argumentos' },
    { icon: '🛡️', title: 'Objeções do Cliente', sub: 'Respostas prontas', screen: 'objecoes' },
    { icon: '🎯', title: 'Simulador de Venda', sub: 'Treino competitivo', screen: 'simulador' },
    { icon: '📋', title: 'Histórico de Análises', sub: 'Suas comparações', screen: 'historico' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Plataforma</Text>
        <Text style={styles.title}>FORD{'\n'}ADVANTAGE</Text>
        <Text style={styles.description}>
          Transforme dados técnicos em inteligência competitiva para apoiar vendas, marketing e posicionamento da Ford.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {items.map(item => (
            <TouchableOpacity
              key={item.screen}
              style={[styles.gridItem, item.screen === 'comparador' && styles.gridItemFull]}
              onPress={() => navigate(item.screen)}
            >
              <Text style={styles.gridIcon}>{item.icon}</Text>
              <Text style={styles.gridTitle}>{item.title}</Text>
              <Text style={styles.gridSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.highlightCard}>
          <Text style={styles.highlightLabel}>Destaques da Raptor</Text>
          <View style={styles.tags}>
            {['V6 Biturbo', '397 cv', '583 Nm', '5,8s 0-100', 'FOX Racing', '7 Modos'].map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1929' },
  header: {
    backgroundColor: '#003078',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  greeting: { fontSize: 11, color: '#00a3e0', letterSpacing: 3, textTransform: 'uppercase' },
  title: { fontSize: 34, fontWeight: 'bold', color: 'white', letterSpacing: 3, marginTop: 6 },
  description: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 18 },
  content: { padding: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  gridItem: {
    backgroundColor: '#0d1929',
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.2)',
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  gridItemFull: { width: '100%' },
  gridIcon: { fontSize: 24, marginBottom: 8 },
  gridTitle: { fontSize: 14, fontWeight: 'bold', color: 'white', textTransform: 'uppercase' },
  gridSub: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 },
  highlightCard: {
    backgroundColor: 'rgba(245,166,35,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.3)',
    borderRadius: 16,
    padding: 16,
  },
  highlightLabel: { fontSize: 10, color: '#f5a623', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: 'rgba(0,163,224,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: '#00a3e0', textTransform: 'uppercase' },
});