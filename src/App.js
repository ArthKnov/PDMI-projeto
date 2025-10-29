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
