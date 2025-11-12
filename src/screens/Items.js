import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import ItemRow from "../components/ItemRow";
import {
  loadItems,
  addItem,
  toggleItemDone,
  deleteItem,
  saveItems,
} from "../storage/storage";

export default function Items({ navigation }) {
  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("Geral");
  const [filter, setFilter] = React.useState("Todos"); // Todos | Abertos | Concluídos

  React.useEffect(() => {
    (async () => {
      const list = await loadItems();
      setItems(list);
    })();
  }, []);

  async function handleAdd() {
    if (!title.trim()) return;
    const created = await addItem({
      title: title.trim(),
      quantity: Number(quantity) || 1,
      category: category.trim() || "Geral",
    });
    setItems((prev) => [created, ...prev]);
    setTitle("");
    setQuantity("");
    setCategory("Geral");
  }

  async function handleToggle(itemId) {
    const next = items.map((it) =>
      it.id === itemId ? { ...it, done: !it.done } : it
    );
    setItems(next);
    await saveItems(next);
  }

  async function handleDelete(itemId) {
    const next = items.filter((it) => it.id !== itemId);
    setItems(next);
    await saveItems(next);
  }

  const filtered =
    filter === "Todos"
      ? items
      : filter === "Abertos"
      ? items.filter((i) => !i.done)
      : items.filter((i) => i.done);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>TaskFlow</Text>
        <Text style={styles.headerSubtitle}>Organize suas tarefas com facilidade</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            placeholderTextColor={theme.colors.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="Qtd"
            placeholderTextColor={theme.colors.textLight}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
          />
          <TextInput
            style={[styles.input, styles.inputFlex]}
            placeholder="Categoria (ex.: Mercado)"
            placeholderTextColor={theme.colors.textLight}
            value={category}
            onChangeText={setCategory}
          />
          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View style={styles.filters}>
        {["Todos", "Abertos", "Concluídos"].map((f) => (
          <Pressable
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </Pressable>
        ))}
        <View style={styles.counter}>
          <Ionicons name="checkmark-done-outline" size={16} color={theme.colors.accent} />
          <Text style={styles.counterText}>
            {items.filter((i) => i.done).length}/{items.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onToggle={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
            onPress={() => navigation.navigate("ItemDetail", { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={28} color={theme.colors.textLight} />
            <Text style={styles.emptyText}>Nenhum item por aqui.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  form: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  inputSmall: {
    width: 80,
    flex: 0,
  },
  inputFlex: {
    flex: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.md,
  },
  filters: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.textLight,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  counter: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.sm,
  },
  counterText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.text,
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  empty: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
  },
  emptyText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textLight,
  },
});


