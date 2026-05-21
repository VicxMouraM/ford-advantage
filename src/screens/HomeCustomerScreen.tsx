import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/HomeCustomerScreen.styles";

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