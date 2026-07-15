import { useMemo, useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import {
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
  type Language,
} from "./language";

type LanguageProviderProps = {
  children: ReactNode;
};

function getInitialLanguage(): Language {
  return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  function setLanguage(nextLanguage: Language) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
