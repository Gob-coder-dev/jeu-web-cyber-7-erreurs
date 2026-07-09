export type Language = "fr" | "en";

export const LANGUAGE_STORAGE_KEY = "cyber-game-language";
export const DEFAULT_LANGUAGE: Language = "fr";

export function normalizeLanguage(value: unknown): Language {
  return value === "fr" || value === "en" ? value : DEFAULT_LANGUAGE;
}
