// src/screens/SplashScreen.tsx
import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

export default function SplashScreen() {
  const { navigate } = useApp();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => navigate('login'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#001a4d', '#003078', '#001020']}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.oval,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.ovalText}>FORD</Text>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        ADVANTAGE
      </Animated.Text>
      <Text style={styles.subtitle}>Inteligência Competitiva</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.barFill, { width: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '50%']
        }) }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oval: {
    width: 120,
    height: 54,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ovalText: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 3,
  },
  title: {
    fontFamily: 'System',
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#00a3e0',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  bar: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 24,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#00a3e0',
    borderRadius: 2,
  },
});