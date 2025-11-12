import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function ItemRow({ item, onToggle, onDelete, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Pressable style={styles.check} onPress={onToggle}>
        <Ionicons
          name={item.done ? "checkmark-circle" : "ellipse-outline"}
          size={22}
          color={item.done ? theme.colors.success : theme.colors.textLight}
        />
      </Pressable>
      <View style={styles.content}>
        <Text style={[styles.title, item.done && styles.titleDone]}>
          {item.title}
        </Text>
        <Text style={styles.meta}>
          {item.quantity} • {item.category}
        </Text>
      </View>
      <Pressable style={styles.delete} onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  check: {
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 2,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: theme.colors.textLight,
  },
  meta: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  delete: {
    marginLeft: theme.spacing.md,
  },
});


