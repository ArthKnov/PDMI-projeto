import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import { loadItems, saveItems } from "../storage/storage";

export default function ItemDetail({ route, navigation }) {
  const { id } = route.params ?? {};
  const [item, setItem] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const items = await loadItems();
      const found = items.find((it) => it.id === id);
      setItem(found);
      if (found) {
        setTitle(found.title);
        setQuantity(String(found.quantity));
        setCategory(found.category);
      }
    })();
  }, [id]);

  async function handleSave() {
    const items = await loadItems();
    const next = items.map((it) =>
      it.id === id
        ? {
            ...it,
            title: title.trim() || it.title,
            quantity: Number(quantity) || it.quantity,
            category: category.trim() || it.category,
          }
        : it
    );
    await saveItems(next);
    navigation.goBack();
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.muted}>Item não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.colors.secondary }]}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Editar Item</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          placeholderTextColor={theme.colors.textLight}
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
          placeholder="Quantidade"
          placeholderTextColor={theme.colors.textLight}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Categoria"
          placeholderTextColor={theme.colors.textLight}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#FFFFFF" />
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>
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
  back: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  form: {
    padding: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: theme.spacing.sm,
  },
  muted: {
    padding: theme.spacing.lg,
    color: theme.colors.textLight,
  },
});


