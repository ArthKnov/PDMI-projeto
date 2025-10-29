import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LessonCard from "../components/LessonCard";
import { theme } from "../theme";

const LESSONS = [
  {
    id: "1",
    title: "Respiração Pranayama",
    level: "Iniciante",
    duration: "15 min",
    category: "Meditação",
  },
  {
    id: "2",
    title: "Vinyasa Flow",
    level: "Intermediário",
    duration: "45 min",
    category: "Yoga",
  },
  {
    id: "3",
    title: "Alongamento Pós-Treino",
    level: "Todos",
    duration: "20 min",
    category: "Flexibilidade",
  },
  {
    id: "4",
    title: "HIIT Cardio",
    level: "Intermediário",
    duration: "30 min",
    category: "Cardio",
  },
  {
    id: "5",
    title: "Yoga Restaurativa",
    level: "Iniciante",
    duration: "25 min",
    category: "Yoga",
  },
  {
    id: "6",
    title: "Core Strengthening",
    level: "Intermediário",
    duration: "35 min",
    category: "Força",
  },
];

export default function Lessons({ navigation }) {
  const categories = [
    "Todas",
    "Yoga",
    "Cardio",
    "Força",
    "Meditação",
    "Flexibilidade",
  ];
  const [selectedCategory, setSelectedCategory] = React.useState("Todas");

  const filteredLessons =
    selectedCategory === "Todas"
      ? LESSONS
      : LESSONS.filter((lesson) => lesson.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.accent }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Aulas Disponíveis</Text>
          <Text style={styles.headerSubtitle}>
            Escolha sua próxima aventura fitness
          </Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="library-outline" size={32} color="#FFFFFF" />
        </View>
      </View>

      {/* Categories Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.categoryButtonTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Lessons List */}
      <View style={styles.lessonsContainer}>
        <View style={styles.lessonsHeader}>
          <Text style={styles.lessonsTitle}>
            {filteredLessons.length} aulas encontradas
          </Text>
          <View style={styles.sortButton}>
            <Ionicons
              name="swap-vertical-outline"
              size={20}
              color={theme.colors.textLight}
            />
          </View>
        </View>

        <FlatList
          data={filteredLessons}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lessonsList}
          renderItem={({ item }) => (
            <LessonCard
              lesson={item}
              onPress={() =>
                navigation.navigate("DetalheAula", { lesson: item })
              }
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  categoriesContainer: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.card,
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textLight,
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  lessonsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  lessonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  lessonsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  sortButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.card,
    ...theme.shadows.sm,
  },
  lessonsList: {
    paddingBottom: theme.spacing.xl,
  },
});
