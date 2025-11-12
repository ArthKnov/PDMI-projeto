import React from "react";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Courses from "./screens/Courses";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Items from "./screens/Items";
import ItemDetail from "./screens/ItemDetail";
import { useAuth } from "./AuthContext";
import { theme } from "./theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para Itens
function ItemsStack() {
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
        name="ListaItens"
        component={Items}
        options={{ title: "Minhas Tarefas" }}
      />
      <Stack.Screen
        name="DetalheItem"
        component={ItemDetail}
        options={{ title: "Editar Tarefa" }}
      />
    </Stack.Navigator>
  );
}

// Stack para Cursos
function CoursesStack() {
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
        name="ListaCursos"
        component={Courses}
        options={{ title: "Cursos" }}
      />
    </Stack.Navigator>
  );
}

// Stack para Perfil
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
      <Stack.Screen
        name="MeuPerfil"
        component={Profile}
        options={{ title: "Perfil" }}
      />
    </Stack.Navigator>
  );
}

// Stack para Configurações
function SettingsStack() {
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
        name="ConfigScreen"
        component={Settings}
        options={{ title: "Configurações" }}
      />
    </Stack.Navigator>
  );
}

// Tabs Navigator (Tela Principal)
function TabsNavigator() {
  const insets = useSafeAreaInsets();
  // Altura ajustada para Android (considera barra de navegação)
  const tabBarHeight = Platform.OS === "ios" ? 60 + (insets.bottom || 0) : 85; // Maior para Android

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom:
            Platform.OS === "ios" ? Math.max(insets.bottom, 5) : 25, // Mais espaço no Android
          paddingTop: 10,
          height: tabBarHeight,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="Cursos"
        component={CoursesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tarefas"
        component={ItemsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
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
      <Tab.Screen
        name="Config"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator com verificação de autenticação
export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16, color: theme.colors.textLight }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <Stack.Screen name="App" component={TabsNavigator} />
      )}
    </Stack.Navigator>
  );
}
