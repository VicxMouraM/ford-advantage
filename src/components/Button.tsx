import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Button.styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "ford"
    | "customer"
    | "danger"
    | "success";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const getGradient = (): [ColorValue, ColorValue] => {
    switch (variant) {
      case "ford":
        return ["#003078", "#0056b3"];
      case "customer":
        return ["#00a3e0", "#1e90ff"];
      case "danger":
        return ["#c62828", "#e53935"];
      case "success":
        return ["#1b5e20", "#2e7d32"];
      default:
        return ["#0056b3", "#00a3e0"];
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 10, paddingHorizontal: 16 };
      case "large":
        return { paddingVertical: 18, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 14, paddingHorizontal: 20 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return 13;
      case "large":
        return 17;
      default:
        return 15;
    }
  };

  if (variant === "secondary") {
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
            {icon && `${icon} `}
            {title}
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
            {icon && `${icon} `}
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}