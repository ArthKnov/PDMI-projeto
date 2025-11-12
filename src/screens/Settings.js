import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import { loadSettings, saveSettings } from "../storage/storage";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const s = await loadSettings();
      setNotificationsEnabled(!!s.notificationsEnabled);
      setDarkModeEnabled(!!s.darkModeEnabled);
      setSoundEnabled(!!s.soundEnabled);
    })();
  }, []);

  React.useEffect(() => {
    saveSettings({ notificationsEnabled, darkModeEnabled, soundEnabled });
  }, [notificationsEnabled, darkModeEnabled, soundEnabled]);

  const settingsSections = [
    {
      title: "Preferências",
      items: [
        {
          title: "Notificações",
          subtitle: "Receber lembretes de treino",
          icon: "notifications-outline",
          type: "switch",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          title: "Modo Escuro",
          subtitle: "Interface com tema escuro",
          icon: "moon-outline",
          type: "switch",
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
        {
          title: "Sons",
          subtitle: "Efeitos sonoros durante treinos",
          icon: "volume-high-outline",
          type: "switch",
          value: soundEnabled,
          onValueChange: setSoundEnabled,
        },
      ],
    },
    {
      title: "Conta",
      items: [
        {
          title: "Perfil",
          subtitle: "Editar informações pessoais",
          icon: "person-outline",
          type: "navigate",
        },
        {
          title: "Privacidade",
          subtitle: "Configurações de privacidade",
          icon: "shield-outline",
          type: "navigate",
        },
        {
          title: "Segurança",
          subtitle: "Senha e autenticação",
          icon: "lock-closed-outline",
          type: "navigate",
        },
      ],
    },
    {
      title: "Aplicativo",
      items: [
        {
          title: "Sobre",
          subtitle: "Versão 1.0.0",
          icon: "information-circle-outline",
          type: "navigate",
        },
        {
          title: "Ajuda",
          subtitle: "Central de ajuda e suporte",
          icon: "help-circle-outline",
          type: "navigate",
        },
        {
          title: "Termos de Uso",
          subtitle: "Leia nossos termos",
          icon: "document-text-outline",
          type: "navigate",
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Configurações</Text>
          <Text style={styles.headerSubtitle}>Personalize sua experiência</Text>
        </View>
      </View>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={theme.colors.primary}
                    />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                <View style={styles.settingRight}>
                  {item.type === "switch" ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{
                        false: theme.colors.border,
                        true: theme.colors.primary,
                      }}
                      thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
                    />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.colors.textLight}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Pressable style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.colors.error}
          />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>
      </View>
    </ScrollView>
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
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  section: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionContent: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  settingSubtitle: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  settingRight: {
    marginLeft: theme.spacing.md,
  },
  logoutContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
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
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
});
