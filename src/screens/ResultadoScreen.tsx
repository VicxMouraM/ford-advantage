// src/screens/ResultadoScreen.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { RANGER_RAPTOR, COMPETITORS, ATTRIBUTES, FORD_ADVANTAGES } from '../data/constants';

export default function ResultadoScreen() {
  const { comparisonResult, user, navigate, addHistory } = useApp();

  if (!comparisonResult) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>⚡</Text>
        <Text style={styles.emptyTitle}>Nenhuma comparação</Text>
        <Text style={styles.emptySub}>Faça uma comparação primeiro</Text>
        <TouchableOpacity style={styles.emptyButton} onPress={() => navigate('comparador')}>
          <Text style={styles.emptyButtonText}>Comparar Veículos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { competitor, attributes } = comparisonResult;
  const comp = COMPETITORS[competitor.id as keyof typeof COMPETITORS] || competitor;

  const getStatus = (attrId: string) => {
    if (attrId === 'price') {
      return { ford: RANGER_RAPTOR.price, rival: comp.price, verdict: 'competitor', label: 'Vantagem Concorrente' };
    }
    const fordVal = (RANGER_RAPTOR.specs as any)[attrId];
    const rivalVal = (comp.specs as any)[attrId];
    if (!rivalVal) return { ford: fordVal || 'N/D', rival: 'Não disponível', verdict: 'unavailable', label: 'N/D' };
    const adv = (FORD_ADVANTAGES as any)[attrId];
    const label = adv === 'ford' ? 'Vantagem Ford' : adv === 'competitor' ? 'Vantagem Concorrente' : 'Empate Técnico';
    return { ford: fordVal, rival: rivalVal, verdict: adv || 'tie', label };
  };

  const badgeClass = (verdict: string) => {
    if (verdict === 'ford') return styles.badgeGreen;
    if (verdict === 'competitor') return styles.badgeRed;
    if (verdict === 'tie') return styles.badgeYellow;
    return styles.badgeGray;
  };

  const attrLabel = (id: string) => ATTRIBUTES.find(a => a.id === id)?.label || id;
  const fordAdvCount = attributes.filter((a: string) => {
    const s = getStatus(a);
    return s.verdict === 'ford';
  }).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('comparador')} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultado</Text>
      </View>

      <View style={styles.content}>
        <LinearGradient colors={['#003078', '#001a50']} style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View>
              <Text style={styles.summaryLabel}>Ranger Raptor</Text>
              <Text style={styles.summaryVs}>vs</Text>
              <Text style={styles.summaryRival}>{comp.brand} {comp.model}</Text>
            </View>
            <View style={styles.advantageBox}>
              <Text style={styles.advantageCount}>{fordAdvCount}</Text>
              <Text style={styles.advantageLabel}>Vantagens Ford</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          {attributes.map((attrId: string) => {
            const s = getStatus(attrId);
            return (
              <View key={attrId} style={styles.resultRow}>
                <Text style={styles.resultAttr}>{attrLabel(attrId)}</Text>
                <View style={styles.resultValues}>
                  <Text style={styles.resultValLeft}>{s.ford}</Text>
                  <View style={[styles.resultBadge, badgeClass(s.verdict)]}>
                    <Text style={styles.resultBadgeText}>{s.label}</Text>
                  </View>
                  <Text style={styles.resultValRight}>{s.rival}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {user?.type === 'ford' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => { addHistory({ type: 'BattleCard', icon: '🃏', main: `BattleCard: ${comp.model}`, meta: 'Análise gerada' }); navigate('battlecard'); }}>
              <Text style={styles.actionBtnText}>🃏 BattleCard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={() => navigate('argumentos')}>
              <Text style={styles.actionBtnText}>💬 Argumentos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={() => navigate('objecoes')}>
              <Text style={styles.actionBtnText}>🛡️ Objeções</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={() => navigate('simulador')}>
              <Text style={styles.actionBtnText}>🎯 Simulador</Text>
            </TouchableOpacity>
          </View>
        )}
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
  summaryCard: { borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0,163,224,0.3)' },
  summaryContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 2 },
  summaryVs: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginVertical: 4 },
  summaryRival: { fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 },
  advantageBox: { alignItems: 'center' },
  advantageCount: { fontFamily: 'System', fontSize: 36, fontWeight: 'bold', color: '#00c853' },
  advantageLabel: { fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: '#0d1929', borderWidth: 1, borderColor: 'rgba(0,163,224,0.2)', borderRadius: 16, overflow: 'hidden' },
  resultRow: { padding: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  resultAttr: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  resultValues: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resultValLeft: { fontSize: 11, color: 'rgba(255,255,255,0.8)', flex: 1, textAlign: 'left' },
  resultValRight: { fontSize: 11, color: 'rgba(255,255,255,0.8)', flex: 1, textAlign: 'right' },
  resultBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginHorizontal: 8 },
  resultBadgeText: { fontSize: 9, fontWeight: 'bold', letterSpacing: 0.5 },
  badgeGreen: { backgroundColor: 'rgba(0,200,83,0.15)' },
  badgeRed: { backgroundColor: 'rgba(255,61,0,0.15)' },
  badgeYellow: { backgroundColor: 'rgba(255,214,0,0.15)' },
  badgeGray: { backgroundColor: 'rgba(84,110,122,0.15)' },
  actionButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  actionBtn: { flex: 1, minWidth: '48%', backgroundColor: '#003078', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  actionBtnSecondary: { backgroundColor: 'rgba(255,255,255,0.06)' },
  actionBtnText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  emptyContainer: { flex: 1, backgroundColor: '#0d1929', alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  emptySub: { fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20, textAlign: 'center' },
  emptyButton: { backgroundColor: '#00a3e0', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14 },
  emptyButtonText: { color: 'white', fontWeight: 'bold' },
});