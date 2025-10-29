import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Profile() {
  const stats = [
    { label: "Aulas Completas", value: "24", icon: "checkmark-circle" },
    { label: "Minutos Treinados", value: "720", icon: "time" },
    { label: "Sequência Atual", value: "7 dias", icon: "flame" },
    { label: "Calorias Queimadas", value: "1,200", icon: "flash" },
  ];

  const achievements = [
    {
      title: "Primeira Aula",
      description: "Você completou sua primeira aula!",
      icon: "star",
      color: theme.colors.warning,
    },
    {
      title: "Semana Completa",
      description: "7 dias consecutivos de treino",
      icon: "trophy",
      color: theme.colors.success,
    },
    {
      title: "Maratonista",
      description: "Mais de 500 minutos treinados",
      icon: "medal",
      color: theme.colors.primary,
    },
  ];

  const menuItems = [
    {
      title: "Histórico de Treinos",
      icon: "calendar-outline",
      color: theme.colors.primary,
    },
    {
      title: "Metas e Objetivos",
      icon: "target-outline",
      color: theme.colors.success,
    },
    {
      title: "Estatísticas",
      icon: "stats-chart-outline",
      color: theme.colors.accent,
    },
    {
      title: "Conquistas",
      icon: "ribbon-outline",
      color: theme.colors.warning,
    },
    {
      title: "Configurações",
      icon: "settings-outline",
      color: theme.colors.textLight,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.secondary }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
            <Pressable style={styles.editButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text style={styles.userName}>Arthur Lima</Text>
          <Text style={styles.userEmail}>arthur@exemplo.com</Text>

          <View style={styles.levelBadge}>
            <Ionicons name="star" size={16} color="#FFFFFF" />
            <Text style={styles.levelText}>Nível Intermediário</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Seu Progresso</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons
                  name={stat.icon}
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View
              style={[
                styles.achievementIcon,
                { backgroundColor: `${achievement.color}15` },
              ]}
            >
              <Ionicons
                name={achievement.icon}
                size={24}
                color={achievement.color}
              />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View
              style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textLight}
            />
          </Pressable>
        ))}
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
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: theme.spacing.md,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: theme.spacing.xs,
  },
  statsContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: "center",
    fontWeight: "500",
  },
  achievementsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  achievementDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  menuContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
});
