import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useApp } from "../context/AppContext";

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1929" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "rgba(0,48,120,0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,163,224,0.2)",
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  backButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 62,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },

  badge: {
    backgroundColor: "#00a3e0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    zIndex: 2,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },

  content: { padding: 20 },

  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  emptySub: { fontSize: 12, color: "rgba(255,255,255,0.3)" },

  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d1929",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },

  historyIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(0,163,224,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  historyIconText: { fontSize: 18 },
  historyContent: { flex: 1 },
  historyMain: { fontSize: 13, fontWeight: "600", color: "white" },
  historyMeta: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
});
