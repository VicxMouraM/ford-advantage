import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FordExclusiveGate from "../components/FordExclusiveGate";
import { PROFILES } from "../data/constants";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ArgumentosScreen.styles";

export default function ArgumentosScreen() {
  const { navigate } = useApp();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profileList = [
    { id: "aventureiro", label: "🏔️ Aventureiro" },
    { id: "performance", label: "🏎️ Performance" },
    { id: "familia", label: "👨‍👩‍👧 Família" },
    { id: "trabalho", label: "🔧 Trabalho" },
    { id: "premium", label: "💎 Premium" },
    { id: "racional", label: "📊 Racional" },
    { id: "preco", label: "💰 Sensível a Preço" },
  ];

  const profileData = selectedProfile
    ? (PROFILES as any)[selectedProfile]
    : null;

  return (
    <FordExclusiveGate>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate("home-ford")}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Argumentos por Perfil</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>FORD</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Selecione o Perfil</Text>
          <View style={styles.profileGrid}>
            {profileList.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.profileChip,
                  selectedProfile === p.id && styles.profileChipActive,
                ]}
                onPress={() => setSelectedProfile(p.id)}
              >
                <Text
                  style={[
                    styles.profileChipText,
                    selectedProfile === p.id && styles.profileChipTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {profileData && (
            <>
              <LinearGradient
                colors={["#001a4d", "#003078"]}
                style={styles.profileCard}
              >
                <Text style={styles.profileLabel}>Perfil Selecionado</Text>
                <Text style={styles.profileName}>
                  {profileData.emoji} {profileData.name}
                </Text>
                <Text style={styles.profileDesc}>
                  {profileData.description}
                </Text>
              </LinearGradient>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>🎯 Prioridades do Cliente</Text>
                <View style={styles.priorities}>
                  {profileData.priorities?.map((p: string) => (
                    <View key={p} style={styles.priorityTag}>
                      <Text style={styles.priorityText}>{p}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>💬 Argumento Recomendado</Text>
                <View style={styles.highlight}>
                  <Text style={styles.highlightText}>
                    {profileData.argument}
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Dados Técnicos de Apoio</Text>
                {[
                  "397 cv de potência",
                  "583 Nm de torque",
                  "0–100 km/h em 5,8s",
                  "Suspensão FOX Racing",
                  "7 modos de condução",
                ].map((d) => (
                  <View key={d} style={styles.listItem}>
                    <Text style={styles.listText}>▸ {d}</Text>
                  </View>
                ))}
              </View>

              <LinearGradient
                colors={["rgba(0,163,224,0.12)", "rgba(0,86,179,0.08)"]}
                style={styles.closingQuote}
              >
                <Text style={styles.closingLabel}>🎤 Frase Final</Text>
                <Text style={styles.closingText}>
                  "A Ranger Raptor não é apenas uma picape — é uma experiência
                  incomparável."
                </Text>
              </LinearGradient>
            </>
          )}

          {!selectedProfile && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyTitle}>Selecione um perfil</Text>
              <Text style={styles.emptySub}>
                Veja os argumentos ideais para cada tipo de cliente
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </FordExclusiveGate>
  );
}