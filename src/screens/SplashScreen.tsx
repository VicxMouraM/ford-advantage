import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { styles } from '../styles/SplashScreen.styles';

export default function SplashScreen() {
  const { navigate } = useApp();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(barAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => navigate('login'), 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, barAnim, navigate]);

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={['#001a4d', '#003078', '#001020']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.oval,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.ovalText}>FORD</Text>
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        ADVANTAGE
      </Animated.Text>

      <Text style={styles.subtitle}>Inteligência Competitiva</Text>

      <View style={styles.bar}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </View>
    </LinearGradient>
  );
}