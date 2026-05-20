// src/screens/HistoricoScreen.tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function HistoricoScreen() {
  const { history } = useApp();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      <View style={styles.content}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Histórico vazio</Text>
            <Text style={styles.emptySub}>Suas ações aparecerão aqui</Text>
          </View>
        ) : (
          history.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Text style={styles.historyIconText}>{item.icon}</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyMain}>{item.main}</Text>
                <Text style={styles.historyMeta}>{item.date} · {item.meta}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1929' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,48,120,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,163,224,0.2)',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  content: { padding: 20 },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  emptySub: { fontSize: 12, color: 'rgba(255,255,255,0.3)' },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1929',
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.2)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  historyIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(0,163,224,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyIconText: { fontSize: 18 },
  historyContent: { flex: 1 },
  historyMain: { fontSize: 13, fontWeight: '600', color: 'white' },
  historyMeta: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
});