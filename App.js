import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { theme } from "./src/theme";

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
