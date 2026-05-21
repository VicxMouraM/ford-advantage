import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/HomeFordScreen.styles";

export default function HomeFordScreen() {
  const { navigate } = useApp();

  const items = [
    {
      icon: "⚡",
      title: "Comparador Inteligente",
      sub: "Compare com concorrentes",
      screen: "comparador",
    },
    {
      icon: "🃏",
      title: "BattleCard Ford",
      sub: "Análise estratégica",
      screen: "battlecard",
    },
    {
      icon: "💬",
      title: "Argumentos de Venda",
      sub: "Por perfil de cliente",
      screen: "argumentos",
    },
    {
      icon: "🛡️",
      title: "Objeções do Cliente",
      sub: "Respostas prontas",
      screen: "objecoes",
    },
    {
      icon: "🎯",
      title: "Simulador de Venda",
      sub: "Treino competitivo",
      screen: "simulador",
    },
    {
      icon: "📋",
      title: "Histórico de Análises",
      sub: "Suas comparações",
      screen: "historico",
    },
    {
      icon: "🔍",
      title: "Busca Livre",
      sub: "Pesquise qualquer veículo",
      screen: "free-search",
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Plataforma</Text>
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
          Transforme dados técnicos em inteligência competitiva para apoiar
          vendas, marketing e posicionamento da Ford.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={[
                styles.gridItem,
                item.screen === "comparador" && styles.gridItemFull,
              ]}
              onPress={() => navigate(item.screen)}
            >
              <Text style={styles.gridIcon}>{item.icon}</Text>
              <Text style={styles.gridTitle}>{item.title}</Text>
              <Text style={styles.gridSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.highlightCard}>
          <Text style={styles.highlightLabel}>Destaques da Raptor</Text>
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