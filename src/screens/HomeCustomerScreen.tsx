import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useApp } from "../context/AppContext";

export default function HomeCustomerScreen() {
  const { navigate } = useApp();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Bem-vindo ao</Text>
            <Text style={styles.title}>FORD{"\n"}ADVANTAGE</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigate("login")}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Compare a Ford Ranger Raptor com outros veículos e descubra qual
          combina melhor com seu estilo de uso.
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que deseja fazer?</Text>

        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => navigate("comparador")}
        >
          <Text style={styles.btnText}>⚡ Comparar Veículos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigate("quiz")}
        >
          <Text style={styles.btnText}>🎯 Fazer Quiz de Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigate("historico")}
        >
          <Text style={styles.btnText}>📋 Ver Histórico</Text>
        </TouchableOpacity>

        <View style={styles.highlightCard}>
          <Text style={styles.highlightLabel}>Ford Ranger Raptor</Text>
          <Text style={styles.highlightSub}>
            V6 3.0L Biturbo • 397 cv • R$ 499.000
          </Text>
          <Text style={styles.highlightDescription}>
            A picape de alta performance que redefine os limites. Motor V6
            biturbo, suspensão FOX Racing e 7 modos de condução para qualquer
            terreno.
          </Text>
          <View style={styles.tags}>
            {[
              "V6 Biturbo",
              "397 cv",
              "583 Nm",
              "5,8s 0-100",
              "FOX Racing",
              "7 Modos",
            ].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginLeft: 16,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  container: { flex: 1, backgroundColor: "#0d1929" },
  header: {
    backgroundColor: "#003078",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginLeft: 16,
  },
  backButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 11,
    color: "#00a3e0",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 3,
    marginTop: 6,
  },
  description: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 12,
    lineHeight: 18,
  },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#00a3e0",
    shadowColor: "#00a3e0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnSecondary: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  highlightCard: {
    backgroundColor: "rgba(245,166,35,0.05)",
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.3)",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  highlightLabel: {
    fontSize: 10,
    color: "#f5a623",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  highlightSub: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  highlightDescription: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 18,
    marginBottom: 12,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: "rgba(0,163,224,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#00a3e0",
    textTransform: "uppercase",
  },
});
