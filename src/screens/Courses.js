import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

const COURSES = [
  {
    id: "1",
    title: "Introdução à Inteligência Artificial",
    category: "IA",
    duration: "8 horas",
    level: "Iniciante",
    students: 1234,
    rating: 4.8,
    image: "🤖",
  },
  {
    id: "2",
    title: "Gestão de Projetos Ágeis",
    category: "Gestão",
    duration: "6 horas",
    level: "Intermediário",
    students: 856,
    rating: 4.6,
    image: "📊",
  },
  {
    id: "3",
    title: "Sustentabilidade Empresarial",
    category: "Sustentabilidade",
    duration: "5 horas",
    level: "Iniciante",
    students: 642,
    rating: 4.7,
    image: "🌱",
  },
  {
    id: "4",
    title: "Machine Learning Avançado",
    category: "IA",
    duration: "12 horas",
    level: "Avançado",
    students: 423,
    rating: 4.9,
    image: "🧠",
  },
  {
    id: "5",
    title: "Liderança e Gestão de Equipes",
    category: "Gestão",
    duration: "7 horas",
    level: "Intermediário",
    students: 978,
    rating: 4.5,
    image: "👥",
  },
  {
    id: "6",
    title: "Economia Circular",
    category: "Sustentabilidade",
    duration: "4 horas",
    level: "Iniciante",
    students: 534,
    rating: 4.6,
    image: "♻️",
  },
];

export default function Courses() {
  const [searchText, setSearchText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const categories = ["Todos", "IA", "Gestão", "Sustentabilidade"];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>Cursos Disponíveis</Text>
        <Text style={styles.headerSubtitle}>
          Aprenda no seu ritmo, onde estiver
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cursos..."
          placeholderTextColor={theme.colors.textLight}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView
        style={styles.coursesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <Text style={styles.resultsText}>
          {filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""}{" "}
          encontrado{filteredCourses.length !== 1 ? "s" : ""}
        </Text>

        {filteredCourses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={styles.courseImage}>
              <Text style={styles.courseEmoji}>{course.image}</Text>
            </View>

            <View style={styles.courseContent}>
              <View style={styles.courseBadge}>
                <Text style={styles.courseBadgeText}>{course.category}</Text>
              </View>

              <Text style={styles.courseTitle}>{course.title}</Text>

              <View style={styles.courseInfo}>
                <View style={styles.courseInfoItem}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={theme.colors.textLight}
                  />
                  <Text style={styles.courseInfoText}>{course.duration}</Text>
                </View>

                <View style={styles.courseInfoItem}>
                  <Ionicons
                    name="people-outline"
                    size={14}
                    color={theme.colors.textLight}
                  />
                  <Text style={styles.courseInfoText}>{course.students}</Text>
                </View>

                <View style={styles.courseInfoItem}>
                  <Ionicons
                    name="star"
                    size={14}
                    color={theme.colors.warning}
                  />
                  <Text style={styles.courseInfoText}>{course.rating}</Text>
                </View>
              </View>

              <View style={styles.courseFooter}>
                <Text style={styles.courseLevel}>{course.level}</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Iniciar Curso</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    margin: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
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
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textLight,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  coursesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  courseEmoji: {
    fontSize: 40,
  },
  courseContent: {
    flex: 1,
  },
  courseBadge: {
    alignSelf: "flex-start",
    backgroundColor: `${theme.colors.accent}15`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  courseBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.colors.accent,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },
  courseInfo: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  courseInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  courseInfoText: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginLeft: theme.spacing.xs,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseLevel: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.textLight,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: theme.spacing.xs,
  },
});

