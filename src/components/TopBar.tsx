import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,48,120,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,163,224,0.2)',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: { fontSize: 20, color: 'white' },
  title: { fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 1, flex: 1 },
  badge: {
    backgroundColor: '#00a3e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: 'white', textTransform: 'uppercase' },
});