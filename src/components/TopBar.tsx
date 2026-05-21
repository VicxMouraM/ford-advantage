import { View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles/TopBar.styles';

interface TopBarProps {
  title: string;
  back?: string;
  badge?: string;
}

export default function TopBar({ title, back, badge }: TopBarProps) {
  const { navigate, user } = useApp();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigate(back || (user?.type === 'ford' ? 'home-ford' : 'home-customer'))}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
    </View>
  );
}