// src/screens/HomeCustomerScreen.tsx
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

export default function HomeCustomerScreen() {
  const { navigate } = useApp();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#001a4d', '#003078']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Bem-vindo ao</Text>
        <Text style={styles.title}>FORD{'\n'}ADVANTAGE</Text>
        <Text style={styles.description}>
          Compare a Ford Ranger Raptor com outros veículos e descubra qual combina melhor com seu estilo de uso.
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que deseja fazer?</Text>

        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => navigate('comparador')}
        >
          <Text style={styles.btnText}>⚡ Comparar Veículos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigate('quiz')}
        >
          <Text style={styles.btnText}>🎯 Fazer Quiz de Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigate('historico')}
        >
          <Text style={styles.btnText}>📋 Ver Histórico</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={['#003078', '#001a50']}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🏆</Text>
            <View>
              <Text style={styles.cardTitle}>Ford Ranger Raptor</Text>
              <Text style={styles.cardSubtitle}>V6 3.0L Biturbo • 397 cv • R$ 499.000</Text>
            </View>
          </View>
          <Text style={styles.cardText}>
            A picape de alta performance que redefine os limites. Motor V6 biturbo, suspensão FOX Racing e 7 modos de condução para qualquer terreno.
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1929',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 11,
    color: '#00a3e0',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 3,
    lineHeight: 38,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 12,
    lineHeight: 18,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: '#00a3e0',
    shadowColor: '#00a3e0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#00a3e0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  cardText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 18,
  },
});