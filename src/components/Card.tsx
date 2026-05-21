import { View, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/Card.styles';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'highlight';
  style?: ViewStyle;
}

export default function Card({
  title,
  subtitle,
  children,
  variant = 'default',
  style,
}: CardProps) {
  const isBlue = variant === 'blue';
  const isHighlight = variant === 'highlight';

  const renderContent = () => (
    <>
      {title && (
        <View style={styles.header}>
          {isHighlight && <Text style={styles.highlightIcon}>📌</Text>}

          <View>
            <Text style={[styles.title, isBlue && styles.blueText]}>
              {title}
            </Text>

            {subtitle && (
              <Text style={[styles.subtitle, isBlue && styles.blueSubtitle]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.content}>
        {typeof children === 'string' ? (
          <Text style={[styles.text, isBlue && styles.blueText]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </>
  );

  if (isBlue) {
    return (
      <LinearGradient
        colors={['#003078', '#001a50']}
        style={[styles.card, styles.blueCard, style]}
      >
        {renderContent()}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.card, isHighlight && styles.highlightCard, style]}>
      {renderContent()}
    </View>
  );
}