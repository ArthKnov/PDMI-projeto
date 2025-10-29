# Projeto: Navegação Híbrida em React Native (Expo + React Navigation)

## 🧭 Sumário

- [Descrição Geral](#-descrição-geral)
- [Dependências](#️-dependências)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Códigos-fonte](#-códigos-fonte)
- [Fluxo e Justificativa de Design](#-fluxo-e-justificativa-de-design)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)

## 🧩 Descrição Geral

Este projeto demonstra uma navegação híbrida usando React Navigation no Expo com um design moderno e atrativo.
Foram implementados três tipos de navegação:

- **Stack Navigation**: para fluxos hierárquicos (Lista de aulas → Detalhe);
- **Tab Navigation**: para alternar entre seções principais (Início, Aulas, Perfil);
- **Drawer Navigation**: para opções globais (Configurações e acesso ao app principal).

### ✨ Características Modernas

- **Design System**: Tema consistente com cores modernas e gradientes
- **Ícones**: Interface rica com ícones do Ionicons
- **Gradientes**: Backgrounds com gradientes para visual atrativo
- **Sombras**: Cards com sombras para profundidade
- **Animações**: Transições suaves entre telas
- **Responsivo**: Layout adaptável para diferentes tamanhos de tela
- **UX Moderna**: Interface intuitiva seguindo padrões de design atuais

## ⚙️ Dependências

Instale com o Expo CLI ou Snack:

```bash
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install expo-linear-gradient @expo/vector-icons
```

## 📁 Estrutura de Diretórios

```
src/
 ├─ App.js
 ├─ navigation.js
 ├─ theme.js
 ├─ components/
 │   └─ LessonCard.js
 └─ screens/
     ├─ Home.js
     ├─ Lessons.js
     ├─ LessonDetail.js
     ├─ Profile.js
     └─ Settings.js
```

## 📜 Códigos-fonte

### src/theme.js

```javascript
export const theme = {
  colors: {
    primary: "#6A5ACD",
    background: "#F8F8FB",
    card: "#FFFFFF",
    text: "#1A1A1D",
    border: "#E5E5EC",
    muted: "#555",
  },
};
```

### src/App.js

```javascript
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./navigation";
import { theme } from "./theme";

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, ...theme.colors },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
```

### src/navigation.js

```javascript
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Home from "./screens/Home";
import Lessons from "./screens/Lessons";
import LessonDetail from "./screens/LessonDetail";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LessonsStack() {
  return (
    <Stack.Navigator>
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
    <Stack.Navigator>
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
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Aulas" component={LessonsStack} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Aplicativo (Tabs)"
        onPress={() => props.navigation.navigate("App")}
      />
      <DrawerItem
        label="Configurações"
        onPress={() => props.navigation.navigate("Configurações")}
      />
    </DrawerContentScrollView>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator drawerContent={(p) => <CustomDrawerContent {...p} />}>
      <Drawer.Screen
        name="App"
        component={TabsNavigator}
        options={{ title: "Aplicativo" }}
      />
      <Drawer.Screen name="Configurações" component={Settings} />
    </Drawer.Navigator>
  );
}
```

### src/components/LessonCard.js

```javascript
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function LessonCard({ lesson, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.level}>Nível: {lesson.level}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600", color: theme.colors.text },
  level: { fontSize: 14, color: "#666", marginTop: 4 },
});
```

### src/screens/Home.js

```javascript
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Início</Text>
      <Text style={styles.text}>
        Bem-vindo ao app com navegação híbrida (Tabs + Stack + Drawer).
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Aulas")}
      >
        <Text style={styles.buttonText}>Ir para Aulas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10,
  },
  text: { fontSize: 16, color: theme.colors.muted, marginBottom: 8 },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});
```

### src/screens/Lessons.js

```javascript
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import LessonCard from "../components/LessonCard";
import { theme } from "../theme";

const LESSONS = [
  { id: "1", title: "Respiração Pranayama", level: "Iniciante" },
  { id: "2", title: "Vinyasa Flow", level: "Intermediário" },
  { id: "3", title: "Alongamento Pós-Treino", level: "Todos" },
];

export default function Lessons({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aulas</Text>
      <FlatList
        data={LESSONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LessonCard
            lesson={item}
            onPress={() => navigation.navigate("DetalheAula", { lesson: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10,
  },
});
```

### src/screens/LessonDetail.js

```javascript
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function LessonDetail({ route, navigation }) {
  const { lesson } = route.params ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson?.title ?? "Aula"}</Text>
      <Text style={styles.text}>Nível: {lesson?.level}</Text>
      <Text style={styles.text}>
        Esta tela foi aberta via Stack. Use o botão abaixo para voltar.
      </Text>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10,
  },
  text: { fontSize: 16, color: theme.colors.muted, marginBottom: 8 },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});
```

### src/screens/Profile.js

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.text}>Gerencie suas informações pessoais aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10,
  },
  text: { fontSize: 16, color: theme.colors.muted },
});
```

### src/screens/Settings.js

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.text}>
        Tema, notificações e opções do aplicativo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10,
  },
  text: { fontSize: 16, color: theme.colors.muted },
});
```

## 🧠 Fluxo e Justificativa de Design

- **Tabs**: organizam seções principais do app (Início, Aulas, Perfil).
- **Stack**: usado dentro da aba "Aulas" para abrir a tela de detalhes mantendo o estado da lista.
- **Drawer**: envolve as Tabs, adicionando "Configurações" e atalhos globais.

Essa combinação garante navegação híbrida, equilibrando hierarquia, agilidade e acessibilidade — o padrão mais moderno de UX em apps React Native.

## 🚀 Como Rodar o Projeto

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Inicie o projeto:**

   ```bash
   npx expo start
   ```

3. **Execute no dispositivo:**
   - Escaneie o QR code com o app Expo Go (Android/iOS)
   - Ou pressione `a` para Android, `i` para iOS, `w` para web

### Comandos disponíveis:

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador
