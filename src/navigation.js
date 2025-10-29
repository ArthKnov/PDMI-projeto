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

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LessonsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="ListaAulas"
        component={Lessons}
        options={{ title: "Aulas" }}
      />
      <Stack.Screen
        name="DetalheAula"
        component={LessonDetail}
        options={({ route }) => ({
          title: route.params?.lesson?.title ?? "Detalhe da Aula",
        })}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Início" }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          ...theme.shadows.md,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Aulas"
        component={LessonsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.drawerAvatar}>
          <Ionicons name="person" size={32} color={theme.colors.primary} />
        </View>
        <Text style={styles.drawerName}>Arthur Lima</Text>
        <Text style={styles.drawerEmail}>arthur@exemplo.com</Text>
      </View>

      <View style={styles.drawerContent}>
        <DrawerItem
          label="Aplicativo"
          icon={({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate("App")}
        />
        <DrawerItem
          label="Configurações"
          icon={({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate("Configurações")}
        />
      </View>

      <View style={styles.drawerFooter}>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => (
            <Ionicons name="log-out" size={size} color={theme.colors.error} />
          )}
          labelStyle={[styles.drawerItemLabel, { color: theme.colors.error }]}
          onPress={() => {
            // Implementar logout
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = {
  drawerHeader: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.lg,
    alignItems: "center",
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  drawerEmail: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  drawerFooter: {
    paddingBottom: theme.spacing.lg,
  },
};

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(p) => <CustomDrawerContent {...p} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textLight,
      }}
    >
      <Drawer.Screen
        name="App"
        component={TabsNavigator}
        options={{ title: "FitApp" }}
      />
      <Drawer.Screen name="Configurações" component={Settings} />
    </Drawer.Navigator>
  );
}
