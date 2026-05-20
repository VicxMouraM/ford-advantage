import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function FordExclusiveGate({ children }: { children: React.ReactNode }) {
  const { user, navigate } = useApp();

  if (user?.type !== 'ford') {
    return (
      <View style={styles.container}>
        <View style={styles.exclusiveContainer}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.text}>Esta funcionalidade é exclusiva para usuários Ford.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigate('home-customer')}>
          <Text style={styles.buttonText}>← Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1929', padding: 20 },
  exclusiveContainer: {
    backgroundColor: 'rgba(255,61,0,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,61,0,0.2)',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: { fontSize: 32, marginBottom: 10 },
  text: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 20 },
  button: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  buttonText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
});