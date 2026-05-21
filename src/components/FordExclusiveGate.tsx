import { View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles/FordExclusiveGate.styles';

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