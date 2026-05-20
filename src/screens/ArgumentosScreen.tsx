// src/screens/ArgumentosScreen.tsx
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FordExclusiveGate from '../components/FordExclusiveGate';
import { PROFILES } from '../data/constants';

export default function ArgumentosScreen() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profileList = [
    { id: 'aventureiro', label: '🏔️ Aventureiro' },
    { id: 'performance', label: '🏎️ Performance' },
    { id: 'familia', label: '👨‍👩‍👧 Família' },
    { id: 'trabalho', label: '🔧 Trabalho' },
    { id: 'premium', label: '💎 Premium' },
    { id: 'racional', label: '📊 Racional' },
    { id: 'preco', label: '💰 Sensível a Preço' },
  ];

  const profileData = selectedProfile ? (PROFILES as any)[selectedProfile] : null;

  return (
    <FordExclusiveGate>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Argumentos por Perfil</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>FORD</Text></View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Selecione o Perfil</Text>
          <View style={styles.profileGrid}>
            {profileList.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[styles.profileChip, selectedProfile === p.id && styles.profileChipActive]}
                onPress={() => setSelectedProfile(p.id)}
              >
                <Text style={[styles.profileChipText, selectedProfile === p.id && styles.profileChipTextActive]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {profileData && (
            <>
              <LinearGradient colors={['#001a4d', '#003078']} style={styles.profileCard}>
                <Text style={styles.profileLabel}>Perfil Selecionado</Text>
                <Text style={styles.profileName}>{profileData.emoji} {profileData.name}</Text>
                <Text style={styles.profileDesc}>{profileData.description}</Text>
              </LinearGradient>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>🎯 Prioridades do Cliente</Text>
                <View style={styles.priorities}>
                  {profileData.priorities?.map((p: string) => (
                    <View key={p} style={styles.priorityTag}><Text style={styles.priorityText}>{p}</Text></View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>💬 Argumento Recomendado</Text>
                <View style={styles.highlight}>
                  <Text style={styles.highlightText}>{profileData.argument}</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Dados Técnicos de Apoio</Text>
                {["397 cv de potência", "583 Nm de torque", "0–100 km/h em 5,8s", "Suspensão FOX Racing", "7 modos de condução"].map(d => (
                  <View key={d} style={styles.listItem}><Text style={styles.listText}>▸ {d}</Text></View>
                ))}
              </View>

              <LinearGradient colors={['rgba(0,163,224,0.12)', 'rgba(0,86,179,0.08)']} style={styles.closingQuote}>
                <Text style={styles.closingLabel}>🎤 Frase Final</Text>
                <Text style={styles.closingText}>"A Ranger Raptor não é apenas uma picape — é uma experiência incomparável."</Text>
              </LinearGradient>
            </>
          )}

          {!selectedProfile && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyTitle}>Selecione um perfil</Text>
              <Text style={styles.emptySub}>Veja os argumentos ideais para cada tipo de cliente</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </FordExclusiveGate>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1929' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,48,120,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,163,224,0.2)',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  badge: { backgroundColor: '#00a3e0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: 'white', textTransform: 'uppercase' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 16, textTransform: 'uppercase' },
  profileGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  profileChip: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(0,163,224,0.2)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  profileChipActive: { backgroundColor: 'rgba(0,48,120,0.5)', borderColor: '#00a3e0' },
  profileChipText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  profileChipTextActive: { color: 'white' },
  profileCard: { borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0,163,224,0.3)' },
  profileLabel: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  profileDesc: { fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 18 },
  card: { backgroundColor: '#0d1929', borderWidth: 1, borderColor: 'rgba(0,163,224,0.2)', borderRadius: 16, padding: 18, marginBottom: 12 },
  cardTitle: { fontSize: 10, color: '#00a3e0', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 },
  priorities: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  priorityTag: { backgroundColor: 'rgba(0,163,224,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  priorityText: { fontSize: 11, fontWeight: 'bold', color: '#00a3e0', textTransform: 'uppercase' },
  highlight: { backgroundColor: 'rgba(0,163,224,0.08)', borderRadius: 8, padding: 14 },
  highlightText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20, fontStyle: 'italic' },
  listItem: { marginBottom: 6 },
  listText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  closingQuote: { borderRadius: 14, padding: 18, marginTop: 12, borderWidth: 1, borderColor: 'rgba(0,163,224,0.25)' },
  closingLabel: { fontSize: 9, color: '#f5a623', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  closingText: { fontSize: 14, color: 'white', fontWeight: '600', lineHeight: 20, fontStyle: 'italic' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  emptySub: { fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' },
});