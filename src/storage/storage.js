import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  settings: "app.settings",
  user: "app.user", // { username, password, isLoggedIn }
  profile: "app.profile", // { name, email, interests: [], avatar }
  items: "case.items", // [{ id, title, quantity, category, done, createdAt }]
};

async function getJson(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function setJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Settings
export async function loadSettings() {
  return await getJson(STORAGE_KEYS.settings, {
    notificationsEnabled: true,
    darkModeEnabled: false,
    soundEnabled: true,
  });
}

export async function saveSettings(settings) {
  return await setJson(STORAGE_KEYS.settings, settings);
}

// User (Login/Auth)
export async function loadUser() {
  return await getJson(STORAGE_KEYS.user, {
    username: "",
    password: "",
    isLoggedIn: false,
  });
}

export async function saveUser(user) {
  return await setJson(STORAGE_KEYS.user, user);
}

export async function login(username, password) {
  const user = await loadUser();
  
  // Verifica se existe usuário cadastrado
  if (!user.username) {
    return { success: false, error: "Nenhuma conta encontrada. Crie uma conta primeiro." };
  }
  
  // Valida credenciais
  if (user.username === username && user.password === password) {
    const updatedUser = { ...user, isLoggedIn: true };
    await saveUser(updatedUser);
    return { success: true, user: updatedUser };
  }
  
  return { success: false, error: "Usuário ou senha incorretos" };
}

export async function logout() {
  const user = await loadUser();
  await saveUser({ ...user, isLoggedIn: false });
}

// Profile
export async function loadProfile() {
  return await getJson(STORAGE_KEYS.profile, {
    name: "",
    email: "",
    interests: [],
  });
}

export async function saveProfile(profile) {
  return await setJson(STORAGE_KEYS.profile, profile);
}

// CASE Items (CRUD)
export async function loadItems() {
  return await getJson(STORAGE_KEYS.items, []);
}

export async function saveItems(items) {
  return await setJson(STORAGE_KEYS.items, items);
}

export async function addItem({ title, quantity = 1, category = "Geral" }) {
  const items = await loadItems();
  const newItem = {
    id: String(Date.now()),
    title: String(title).trim(),
    quantity: Number(quantity) || 1,
    category,
    done: false,
    createdAt: Date.now(),
  };
  const next = [newItem, ...items];
  await saveItems(next);
  return newItem;
}

export async function updateItem(itemId, updates) {
  const items = await loadItems();
  const next = items.map((it) => (it.id === itemId ? { ...it, ...updates } : it));
  await saveItems(next);
  return next.find((it) => it.id === itemId);
}

export async function deleteItem(itemId) {
  const items = await loadItems();
  const next = items.filter((it) => it.id !== itemId);
  await saveItems(next);
  return next;
}

export async function toggleItemDone(itemId) {
  const items = await loadItems();
  const next = items.map((it) =>
    it.id === itemId ? { ...it, done: !it.done } : it
  );
  await saveItems(next);
  return next.find((it) => it.id === itemId);
}

export async function clearAllItems() {
  await saveItems([]);
  return [];
}


