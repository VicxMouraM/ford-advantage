import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { styles } from '../styles/LoginScreen.styles';

export default function LoginScreen() {
  const { setUser, navigate } = useApp();

  const login = (type: 'ford' | 'customer') => {
    setUser({ type });
    navigate(type === 'ford' ? 'home-ford' : 'home-customer');
  };

  return (
    <LinearGradient
      colors={['#001a4d', '#0d1929']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <View style={styles.oval}>
          <Text style={styles.ovalText}>FORD</Text>
        </View>
        <Text style={styles.title}>ADVANTAGE</Text>
        <Text style={styles.subtitle}>Inteligência Competitiva Automotiva</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.fordButton]}
          onPress={() => login('ford')}
        >
          <Text style={styles.buttonText}>🏢 Entrar como Ford</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.customerButton]}
          onPress={() => login('customer')}
        >
          <Text style={styles.buttonText}>👤 Entrar como Cliente</Text>
        </TouchableOpacity>

        <Text style={styles.demoText}>Versão demo — sem autenticação real</Text>
      </View>
    </LinearGradient>
  );
}