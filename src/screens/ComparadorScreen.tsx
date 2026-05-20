// src/screens/ComparadorScreen.tsx
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../context/AppContext';
import { COMPETITORS, ATTRIBUTES } from '../data/constants';

export default function ComparadorScreen() {
  const { setComparisonState, setComparisonResult, navigate, addHistory } = useApp();
  const [competitor, setCompetitor] = useState('hilux');
  const [selectedAttrs, setSelectedAttrs] = useState(['power', 'torque', 'acceleration', 'transmission', 'suspension', 'price']);
  const [loading, setLoading] = useState(false);

  const toggleAttr = (id: string) => {
    setSelectedAttrs(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const compare = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const result = { competitor: COMPETITORS[competitor as keyof typeof COMPETITORS], attributes: selectedAttrs };
    setComparisonState(result);
    setComparisonResult(result);
    addHistory({
      type: 'Comparação',
      icon: '⚡',
      main: `Ranger Raptor vs ${COMPETITORS[competitor as keyof typeof COMPETITORS].model}`,
      meta: `${selectedAttrs.length} atributos comparados`,
    });
    setLoading(false);
    navigate('resultado');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a3e0" />
        <Text style={styles.loadingText}>Analisando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('home-customer')} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comparador Inteligente</Text>
      </View>

      <View style={styles.content}>
        <LinearGradient colors={['#003078', '#001a50']} style={styles.referenceCard}>
          <View style={styles.referenceContent}>
            <Text style={styles.referenceIcon}>🏆</Text>
            <View>
              <Text style={styles.referenceLabel}>Referência</Text>
              <Text style={styles.referenceTitle}>Ford Ranger Raptor</Text>
              <Text style={styles.referenceSpecs}>V6 3.0L Biturbo • 397 cv</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.label}>Veículo Concorrente</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={competitor}
              onValueChange={setCompetitor}
              style={styles.picker}
              dropdownIconColor="#00a3e0"
            >
              {Object.values(COMPETITORS).map(c => (
                <Picker.Item key={c.id} label={`${c.brand} ${c.model} ${c.version}`} value={c.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Atributos para Comparar ({selectedAttrs.length}/{ATTRIBUTES.length})
          </Text>
          <View style={styles.attrGrid}>
            {ATTRIBUTES.map(attr => (
              <TouchableOpacity
                key={attr.id}
                style={[
                  styles.attrChip,
                  selectedAttrs.includes(attr.id) && styles.attrChipActive,
                ]}
                onPress={() => toggleAttr(attr.id)}
              >
                <Text style={[
                  styles.attrChipText,
                  selectedAttrs.includes(attr.id) && styles.attrChipTextActive,
                ]}>
                  {attr.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.compareBtn, selectedAttrs.length === 0 && styles.compareBtnDisabled]}
          onPress={compare}
          disabled={selectedAttrs.length === 0}
        >
          <Text style={styles.compareBtnText}>⚡ Gerar Comparação</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1929',
  },
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
  backText: {
    fontSize: 20,
    color: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
    flex: 1,
  },
  content: {
    padding: 20,
  },
  referenceCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.3)',
  },
  referenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  referenceIcon: {
    fontSize: 28,
  },
  referenceLabel: {
    fontSize: 9,
    color: '#00a3e0',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  referenceSpecs: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: '#00a3e0',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.2)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    height: 50,
  },
  attrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attrChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.2)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  attrChipActive: {
    backgroundColor: '#00a3e0',
    borderColor: 'transparent',
  },
  attrChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  attrChipTextActive: {
    color: 'white',
  },
  compareBtn: {
    backgroundColor: '#00a3e0',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#00a3e0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  compareBtnDisabled: {
    opacity: 0.5,
  },
  compareBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0d1929',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});