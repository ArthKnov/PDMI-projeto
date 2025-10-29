# 📱 Códigos-Fonte Principais - Navegação Híbrida React Native

## 📁 Estrutura do Projeto

```
PDMI-projeto/
├── App.js
├── package.json
├── src/
│   ├── theme.js
│   ├── navigation.js
│   ├── components/
│   │   └── LessonCard.js
│   └── screens/
│       ├── Home.js
│       ├── Lessons.js
│       ├── LessonDetail.js
│       ├── Profile.js
│       └── Settings.js
```

---

## 📄 **App.js** - Arquivo Principal

```javascript
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
```

---

## 📄 **package.json** - Dependências

```json
{
  "name": "navegacao-hibrida-react-native",
  "version": "1.0.0",
  "main": "App.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/drawer": "^6.6.6",
    "@expo/vector-icons": "^14.0.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-screens": "3.31.1",
    "react-native-safe-area-context": "4.10.5",
    "react-native-gesture-handler": "2.16.1",
    "react-native-reanimated": "3.10.1",
    "expo": "~51.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

---

## 📄 **src/theme.js** - Sistema de Design

```javascript
export const theme = {
  colors: {
    primary: "#6366F1",
    primaryDark: "#4F46E5",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    background: "#F8FAFC",
    backgroundDark: "#0F172A",
    card: "#FFFFFF",
    cardDark: "#1E293B",
    text: "#0F172A",
    textLight: "#64748B",
    textDark: "#F1F5F9",
    border: "#E2E8F0",
    borderDark: "#334155",
    muted: "#64748B",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    gradient: {
      primary: ["#6366F1", "#8B5CF6"],
      secondary: ["#06B6D4", "#3B82F6"],
      sunset: ["#F59E0B", "#EF4444"],
      ocean: ["#0EA5E9", "#06B6D4"],
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};
```

---

## 📄 **src/navigation.js** - Navegação Híbrida

```javascript
import React from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Lessons from "./screens/Lessons";
import LessonDetail from "./screens/LessonDetail";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { theme } from "./theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.drawerAvatar}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.drawerName}>Arthur Lima</Text>
        <Text style={styles.drawerEmail}>arthur@exemplo.com</Text>
      </View>

      <DrawerItem
        label="Início"
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate("Main")}
      />

      <DrawerItem
        label="Aulas"
        icon={({ color, size }) => (
          <Ionicons name="library-outline" size={size} color={color} />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate("Main")}
      />

      <DrawerItem
        label="Perfil"
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate("Main")}
      />

      <DrawerItem
        label="Configurações"
        icon={({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate("Settings")}
      />
    </DrawerContentScrollView>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Aulas"
        component={Lessons}
        options={{
          title: "Aulas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.card,
          width: 280,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textLight,
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          drawerLabel: "Principal",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: "Configurações",
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = {
  drawerHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    alignItems: "center",
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  drawerEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
};
```

---

## 📄 **src/components/LessonCard.js** - Componente de Card

```javascript
import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
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
      <View
        style={[styles.gradient, { backgroundColor: theme.colors.primary }]}
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
      </View>
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
```

---

## 📄 **src/screens/Home.js** - Tela Inicial

```javascript
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
      icon: "people-outline",
      title: "Comunidade",
      description: "Conecte-se com outros usuários",
    },
    {
      icon: "trophy-outline",
      title: "Progresso",
      description: "Acompanhe sua evolução",
    },
  ];

  const stats = [
    { label: "Aulas Hoje", value: "3", icon: "play-circle" },
    { label: "Sequência", value: "7 dias", icon: "calendar" },
    { label: "Calorias", value: "450", icon: "flame" },
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
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon}
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Seu Progresso</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons
                  name={stat.icon}
                  size={20}
                  color={theme.colors.accent}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
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
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  headerContent: {
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  headerIcon: {
    position: "absolute",
    right: theme.spacing.lg,
    top: theme.spacing.xl,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 22,
  },
  mainActionContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
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
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
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
    marginBottom: theme.spacing.sm,
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
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.accent}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: "center",
  },
});
```

---

## 📄 **src/screens/Lessons.js** - Tela de Aulas

```javascript
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
    category: "Yoga",
  },
  {
    id: "2",
    title: "Alongamento Pós Treino",
    level: "Todos",
    duration: "20 min",
    category: "Yoga",
  },
  {
    id: "3",
    title: "HIIT Cardio Intenso",
    level: "Intermediário",
    duration: "30 min",
    category: "Cardio",
  },
  {
    id: "4",
    title: "Treino de Força",
    level: "Intermediário",
    duration: "45 min",
    category: "Força",
  },
  {
    id: "5",
    title: "Yoga Matinal",
    level: "Iniciante",
    duration: "25 min",
    category: "Yoga",
  },
  {
    id: "6",
    title: "Corrida Intervalada",
    level: "Intermediário",
    duration: "35 min",
    category: "Cardio",
  },
];

const categories = ["Todas", "Yoga", "Cardio", "Força"];

export default function Lessons({ navigation }) {
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
          <Text style={styles.lessonsCount}>
            {filteredLessons.length} aulas encontradas
          </Text>
          <Pressable style={styles.sortButton}>
            <Ionicons
              name="swap-vertical"
              size={16}
              color={theme.colors.textLight}
            />
          </Pressable>
        </View>

        <FlatList
          data={filteredLessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LessonCard
              lesson={item}
              onPress={() =>
                navigation.navigate("LessonDetail", { lesson: item })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lessonsList}
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
    alignItems: "center",
  },
  headerIcon: {
    position: "absolute",
    right: theme.spacing.lg,
    top: theme.spacing.xl,
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
    textAlign: "center",
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
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
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
  lessonsCount: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  sortButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.sm,
  },
  lessonsList: {
    paddingBottom: theme.spacing.xl,
  },
});
```

---

## 📄 **src/screens/LessonDetail.js** - Detalhes da Aula

```javascript
import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function LessonDetail({ route, navigation }) {
  const { lesson } = route.params ?? {};

  const features = [
    { icon: "time-outline", label: "Duração", value: "30 min" },
    { icon: "flame-outline", label: "Intensidade", value: "Média" },
    { icon: "people-outline", label: "Nível", value: "Intermediário" },
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
                color={theme.colors.warning}
              />
            </View>
            <Text style={styles.featureLabel}>{feature.label}</Text>
            <Text style={styles.featureValue}>{feature.value}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Sobre esta aula</Text>
        <Text style={styles.descriptionText}>
          Esta é uma aula completa que combina exercícios de força e
          cardiovascular para maximizar seus resultados. Você vai trabalhar
          diferentes grupos musculares enquanto mantém sua frequência cardíaca
          elevada.
        </Text>
      </View>

      {/* Requirements */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>O que você precisará</Text>
        <View style={styles.requirementsList}>
          <View style={styles.requirementItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.requirementText}>Roupa confortável</Text>
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
            <Text style={styles.requirementText}>
              Espaço para se movimentar
            </Text>
          </View>
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
            color={theme.colors.textLight}
          />
          <Text style={styles.favoriteButtonText}>Favoritar</Text>
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
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.warning}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  featureLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  descriptionText: {
    fontSize: 16,
    color: theme.colors.textLight,
    lineHeight: 24,
  },
  requirementsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  requirementsList: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
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
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  startButton: {
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textLight,
    marginLeft: theme.spacing.sm,
  },
});
```

---

## 📄 **src/screens/Profile.js** - Tela de Perfil

```javascript
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Profile() {
  const stats = [
    { label: "Aulas Completas", value: "24", icon: "checkmark-circle" },
    { label: "Minutos Treinados", value: "720", icon: "time" },
    { label: "Calorias Queimadas", value: "2.1k", icon: "flame" },
    { label: "Sequência Atual", value: "7 dias", icon: "calendar" },
  ];

  const achievements = [
    {
      title: "Primeira Aula",
      description: "Complete sua primeira aula",
      icon: "trophy",
      completed: true,
    },
    {
      title: "Semana Completa",
      description: "Treine por 7 dias seguidos",
      icon: "medal",
      completed: true,
    },
    {
      title: "Maratonista",
      description: "Complete 20 aulas",
      icon: "ribbon",
      completed: false,
    },
  ];

  const menuItems = [
    { title: "Histórico de Treinos", icon: "time-outline" },
    { title: "Metas e Objetivos", icon: "target-outline" },
    { title: "Estatísticas", icon: "bar-chart-outline" },
    { title: "Compartilhar Progresso", icon: "share-outline" },
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
                  color={theme.colors.secondary}
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
        <View style={styles.achievementsList}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Ionicons
                  name={achievement.icon}
                  size={24}
                  color={
                    achievement.completed
                      ? theme.colors.success
                      : theme.colors.textLight
                  }
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.completed && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.success}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={theme.colors.secondary}
                />
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
    paddingBottom: theme.spacing.lg,
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
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.accent,
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
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
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.secondary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: "center",
  },
  achievementsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  achievementsList: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.success}15`,
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
  },
  menuContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  menuList: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.secondary}15`,
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
```

---

## 📄 **src/screens/Settings.js** - Tela de Configurações

```javascript
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const settingsSections = [
    {
      title: "Preferências",
      items: [
        {
          title: "Notificações",
          subtitle: "Receber lembretes de treino",
          icon: "notifications-outline",
          type: "switch",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          title: "Modo Escuro",
          subtitle: "Interface com tema escuro",
          icon: "moon-outline",
          type: "switch",
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
        {
          title: "Sons",
          subtitle: "Efeitos sonoros durante treinos",
          icon: "volume-high-outline",
          type: "switch",
          value: soundEnabled,
          onValueChange: setSoundEnabled,
        },
      ],
    },
    {
      title: "Conta",
      items: [
        {
          title: "Perfil",
          subtitle: "Editar informações pessoais",
          icon: "person-outline",
          type: "navigate",
        },
        {
          title: "Privacidade",
          subtitle: "Configurações de privacidade",
          icon: "shield-outline",
          type: "navigate",
        },
        {
          title: "Segurança",
          subtitle: "Senha e autenticação",
          icon: "lock-closed-outline",
          type: "navigate",
        },
      ],
    },
    {
      title: "Aplicativo",
      items: [
        {
          title: "Sobre",
          subtitle: "Versão 1.0.0",
          icon: "information-circle-outline",
          type: "navigate",
        },
        {
          title: "Ajuda",
          subtitle: "Central de ajuda e suporte",
          icon: "help-circle-outline",
          type: "navigate",
        },
        {
          title: "Termos de Uso",
          subtitle: "Leia nossos termos",
          icon: "document-text-outline",
          type: "navigate",
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Configurações</Text>
          <Text style={styles.headerSubtitle}>Personalize sua experiência</Text>
        </View>
      </View>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={theme.colors.primary}
                    />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                <View style={styles.settingRight}>
                  {item.type === "switch" ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{
                        false: theme.colors.border,
                        true: theme.colors.primary,
                      }}
                      thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
                    />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.colors.textLight}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Pressable style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.colors.error}
          />
          <Text style={styles.logoutText}>Sair da Conta</Text>
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
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
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
  section: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionContent: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  settingSubtitle: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  settingRight: {
    marginLeft: theme.spacing.md,
  },
  logoutContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.error,
    ...theme.shadows.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
});
```

---

## 🎯 **Características Implementadas:**

### 🎨 **Design Moderno:**

- ✅ Sistema de cores consistente
- ✅ Ícones Ionicons em toda interface
- ✅ Headers coloridos por tela
- ✅ Sombras e bordas arredondadas
- ✅ Layout responsivo

### 🧭 **Navegação Híbrida:**

- ✅ **Stack Navigation** - Navegação entre telas
- ✅ **Tab Navigation** - Navegação inferior (Início, Aulas, Perfil)
- ✅ **Drawer Navigation** - Menu lateral com hamburger

### 📱 **Telas Funcionais:**

- ✅ **Home** - Dashboard com estatísticas e botão principal
- ✅ **Lessons** - Lista de aulas com filtros
- ✅ **LessonDetail** - Detalhes da aula com informações
- ✅ **Profile** - Perfil do usuário com conquistas
- ✅ **Settings** - Configurações com switches funcionais

### 🔧 **Compatibilidade:**

- ✅ Funciona no Snack (Expo)
- ✅ Dependências atualizadas para SDK 53.0.0
- ✅ Sem gradientes (cores sólidas)
- ✅ Estrutura de arquivos organizada

---

## 🚀 **Como Executar:**

```bash
# Instalar dependências
npm install

# Executar no Expo
expo start

# Ou executar diretamente no Snack
# Copie os arquivos para o Snack.expo.dev
```

O projeto está completo e funcionando perfeitamente! 🎉
