import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oval: {
    width: 90,
    height: 42,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ovalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: '#00a3e0',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  fordButton: {
    backgroundColor: '#003078',
    shadowColor: '#003078',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  customerButton: {
    backgroundColor: '#00a3e0',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    marginHorizontal: 20,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
  },
  demoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
  },
});