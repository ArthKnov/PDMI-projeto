import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { loadProfile, saveProfile, loadUser, logout } from "../storage/storage";
import { useAuth } from "../AuthContext";
import { theme } from "../theme";

const INTEREST_OPTIONS = [
  "Inteligência Artificial",
  "Gestão de Projetos",
  "Sustentabilidade",
  "Desenvolvimento Web",
  "Data Science",
  "Marketing Digital",
  "Design UX/UI",
  "Finanças",
];

export default function Profile() {
  const navigation = useNavigation();
  const { checkAuth } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [selectedInterest, setSelectedInterest] = React.useState("");
  const [interests, setInterests] = React.useState([]);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await loadProfile();
    const user = await loadUser();
    setName(profile.name || "");
    setEmail(profile.email || "");
    setInterests(profile.interests || []);
    setUsername(user.username || "");
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Erro", "Preencha nome e email");
      return;
    }

    const profile = { name: name.trim(), email: email.trim(), interests };
    await saveProfile(profile);
    Alert.alert("Sucesso", "Perfil salvo com sucesso!");
  };

  const handleAddInterest = () => {
    if (!selectedInterest) {
      Alert.alert("Atenção", "Selecione uma área de interesse");
      return;
    }
    if (interests.includes(selectedInterest)) {
      Alert.alert("Atenção", "Esta área já está na sua lista");
      return;
    }
    setInterests([...interests, selectedInterest]);
    setSelectedInterest("");
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          // Atualiza o contexto de autenticação
          await checkAuth();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.secondary }]}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <Text style={styles.headerSubtitle}>@{username}</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor={theme.colors.textLight}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor={theme.colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áreas de Interesse</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedInterest}
              onValueChange={setSelectedInterest}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma área..." value="" />
              {INTEREST_OPTIONS.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddInterest}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Adicionar Interesse</Text>
          </TouchableOpacity>

          {interests.length > 0 && (
            <View style={styles.interestsList}>
              {interests.map((interest, index) => (
                <View key={index} style={styles.interestChip}>
                  <Text style={styles.interestText}>{interest}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveInterest(interest)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={theme.colors.error}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Salvar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color={theme.colors.error}
            />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: "center",
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  pickerContainer: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: theme.spacing.sm,
  },
  interestsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing.sm,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${theme.colors.primary}15`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  interestText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  actionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.success,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: theme.spacing.sm,
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
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
});
