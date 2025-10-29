import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Home({ navigation }) {
  const features = [
    {
      icon: "fitness-outline",
      title: "Aulas Personalizadas",
      description: "Treinos adaptados ao seu nível",
    },
    {
      icon: "time-outline",
      title: "Flexibilidade",
      description: "Treine quando quiser",
    },
    {
      icon: "trophy-outline",
      title: "Progresso",
      description: "Acompanhe sua evolução",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá! 👋</Text>
          <Text style={styles.title}>Bem-vindo ao FitApp</Text>
          <Text style={styles.subtitle}>Sua jornada fitness começa aqui</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="fitness" size={40} color="#FFFFFF" />
        </View>
      </View>

      {/* Botão principal */}
      <View style={styles.mainActionContainer}>
        <Pressable
          style={[styles.mainButton, { backgroundColor: theme.colors.accent }]}
          onPress={() => navigation.navigate("Aulas")}
        >
          <View style={styles.mainButtonContent}>
            <Ionicons name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.mainButtonText}>Começar Treino</Text>
          </View>
        </Pressable>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Por que escolher nosso app?</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons
                name={feature.icon}
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Seu Progresso</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Aulas Completas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Semana Atual</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>360</Text>
            <Text style={styles.statLabel}>Minutos Treinados</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  headerContent: {
    flex: 1,
  },
  headerIcon: {
    position: "absolute",
    right: theme.spacing.lg,
    top: theme.spacing.xl,
    opacity: 0.3,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  mainActionContainer: {
    padding: theme.spacing.lg,
  },
  mainButton: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  mainButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: theme.spacing.sm,
  },
  featuresContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  statsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: "center",
    fontWeight: "500",
  },
});
