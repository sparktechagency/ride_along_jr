import * as Localization from "expo-localization";

import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./translations/en.json";
import es from "./translations/es.json";
// Import translations
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: Localization.locale.split("-")[0] || "en", // Set initial language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Function to get the current language
export const getCurrentLanguage = async (): Promise<string> => {
  try {
    const storedLanguage = await AsyncStorage.getItem("APP_LANGUAGE");
    if (storedLanguage) {
      return storedLanguage;
    }
    // Use device locale if no stored language
    return Localization.locale.split("-")[0];
  } catch (error) {
    return "en"; // Default to English
  }
};

// Function to set the language
export const setLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("APP_LANGUAGE", language);
    await i18next.changeLanguage(language);
  } catch (error) {
    console.error("Error setting language", error);
  }
};

// Initialize with stored language
export const initializeLanguage = async (): Promise<void> => {
  const language = await getCurrentLanguage();
  await i18next.changeLanguage(language);
};

// Call initialization
initializeLanguage();

export default i18next;
