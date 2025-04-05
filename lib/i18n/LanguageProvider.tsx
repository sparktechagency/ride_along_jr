import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentLanguage, setLanguage } from "./i18n";

import { useTranslation } from "react-i18next";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  changeLanguage: async () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const { i18n } = useTranslation();

  useEffect(() => {
    const initLanguage = async () => {
      const language = await getCurrentLanguage();
      setCurrentLanguage(language);
    };

    initLanguage();
  }, []);

  const changeLanguage = async (language: string) => {
    await setLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
