import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLanguage, toggleNotifications } from "../store/slices/userSlice";
import { KRS_API_KEY, KRS_API_BASE_URL } from "@env";
import axios from "axios";

const krsApi = axios.create({
  baseURL: KRS_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${KRS_API_KEY}`,
    // ...
  },
});

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const language = user?.preferences.language || "pl";
  const notificationsEnabled = user?.preferences.notifications || false;

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
  };

  const handleNotificationsToggle = () => {
    dispatch(toggleNotifications());
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === "pl" ? "Preferencje Użytkownika" : "User Preferences"}
        </Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {language === "pl" ? "Język" : "Language"}
          </Text>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={handleLanguageToggle}
          >
            <Text style={styles.languageButtonText}>
              {language === "pl" ? "Polski / Polish" : "English / Angielski"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {language === "pl" ? "Powiadomienia" : "Notifications"}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#0066cc" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === "pl" ? "O Aplikacji" : "About"}
        </Text>

        <Text style={styles.aboutText}>
          {language === "pl"
            ? "Poland Market Insights v1.0.0\nWszystkie dane pochodzą z publicznych źródeł, takich jak KRS i GUS."
            : "Poland Market Insights v1.0.0\nAll data is sourced from public sources such as KRS and GUS."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 16,
    color: "#444",
  },
  languageButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  languageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
});

export default SettingsScreen;
