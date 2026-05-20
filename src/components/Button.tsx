// src/components/Button.tsx
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ford' | 'customer' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  loading = false, 
  disabled = false,
  icon,
  style 
}: ButtonProps) {
  const getGradient = () => {
    switch (variant) {
      case 'ford': return ['#003078', '#0056b3'];
      case 'customer': return ['#00a3e0', '#1e90ff'];
      case 'danger': return ['#c62828', '#e53935'];
      case 'success': return ['#1b5e20', '#2e7d32'];
      default: return ['#0056b3', '#00a3e0'];
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return { paddingVertical: 10, paddingHorizontal: 16 };
      case 'large': return { paddingVertical: 18, paddingHorizontal: 24 };
      default: return { paddingVertical: 14, paddingHorizontal: 20 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 13;
      case 'large': return 17;
      default: return 15;
    }
  };

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        style={[
          styles.secondaryButton,
          getSizeStyle(),
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={[styles.secondaryText, { fontSize: getTextSize() }]}>
            {icon && `${icon} `}{title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.buttonContainer, style]}
    >
      <LinearGradient
        colors={getGradient()}
        style={[styles.gradient, getSizeStyle(), disabled && styles.disabled]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={[styles.text, { fontSize: getTextSize() }]}>
            {icon && `${icon} `}{title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});