import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1929" },

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
