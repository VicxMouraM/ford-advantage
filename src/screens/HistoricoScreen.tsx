import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/HistoricoScreen.styles";

export default function HistoricoScreen() {
  const { history, navigate, user } = useApp();

  const backScreen = user?.type === "ford" ? "home-ford" : "home-customer";
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate(backScreen)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Histórico</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user?.type === "ford" ? "FORD" : "CLIENTE"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Histórico vazio</Text>
            <Text style={styles.emptySub}>Suas ações aparecerão aqui</Text>
          </View>
        ) : (
          history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Text style={styles.historyIconText}>{item.icon}</Text>
              </View>

              <View style={styles.historyContent}>
                <Text style={styles.historyMain}>{item.main}</Text>
                <Text style={styles.historyMeta}>
                  {item.date} · {item.meta}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}