import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function LessonCard({ lesson, onPress }) {
  const getLevelColor = (level) => {
    switch (level) {
      case "Iniciante":
        return theme.colors.success;
      case "Intermediário":
        return theme.colors.warning;
      case "Todos":
        return theme.colors.accent;
      default:
        return theme.colors.primary;
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "Iniciante":
        return "leaf-outline";
      case "Intermediário":
        return "flame-outline";
      case "Todos":
        return "people-outline";
      default:
        return "book-outline";
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={theme.colors.gradient.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={getLevelIcon(lesson.level)}
                size={24}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{lesson.level}</Text>
            </View>
          </View>

          <Text style={styles.title}>{lesson.title}</Text>

          <View style={styles.footer}>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={16} color="#FFFFFF" />
              <Text style={styles.durationText}>30 min</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  gradient: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  levelBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  durationText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: theme.spacing.xs,
  },
});
