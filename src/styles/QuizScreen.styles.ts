import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1929" },
  content: { padding: 20 },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#00a3e0", borderRadius: 2 },
  progressText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
    lineHeight: 28,
  },
  option: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,163,224,0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },
});