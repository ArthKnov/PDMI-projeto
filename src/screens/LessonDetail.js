import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function LessonDetail({ route, navigation }) {
  const { lesson } = route.params ?? {};

  const features = [
    {
      icon: "time-outline",
      label: "Duração",
      value: lesson?.duration || "30 min",
    },
    { icon: "people-outline", label: "Nível", value: lesson?.level || "Todos" },
    { icon: "star-outline", label: "Dificuldade", value: "Média" },
    { icon: "heart-outline", label: "Calorias", value: "150 kcal" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.warning }]}>
        <View style={styles.headerContent}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerInfo}>
            <Text style={styles.category}>{lesson?.category || "Fitness"}</Text>
            <Text style={styles.title}>{lesson?.title ?? "Aula"}</Text>
            <Text style={styles.subtitle}>
              Prepare-se para uma experiência incrível
            </Text>
          </View>
        </View>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons
                name={feature.icon}
                size={20}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.featureLabel}>{feature.label}</Text>
            <Text style={styles.featureValue}>{feature.value}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Sobre esta aula</Text>
        <Text style={styles.description}>
          Esta é uma aula completa que combina exercícios de força,
          flexibilidade e condicionamento cardiovascular. Ideal para quem quer
          melhorar sua forma física de forma equilibrada e eficiente.
        </Text>
      </View>

      {/* What you'll need */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.sectionTitle}>O que você precisará</Text>
        <View style={styles.requirementItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={theme.colors.success}
          />
          <Text style={styles.requirementText}>Tapete de yoga</Text>
        </View>
        <View style={styles.requirementItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={theme.colors.success}
          />
          <Text style={styles.requirementText}>Garrafa de água</Text>
        </View>
        <View style={styles.requirementItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={theme.colors.success}
          />
          <Text style={styles.requirementText}>Roupas confortáveis</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Pressable style={styles.startButton}>
          <View
            style={[
              styles.startButtonGradient,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Ionicons name="play" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Começar Aula</Text>
          </View>
        </Pressable>

        <Pressable style={styles.favoriteButton}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={theme.colors.primary}
          />
        </Pressable>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  headerInfo: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: theme.spacing.lg,
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  featureLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    fontWeight: "500",
    marginBottom: theme.spacing.xs,
  },
  featureValue: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  descriptionContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textLight,
    lineHeight: 24,
  },
  requirementsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  requirementText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    alignItems: "center",
  },
  startButton: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    ...theme.shadows.md,
  },
  startButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: theme.spacing.sm,
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.sm,
  },
});
