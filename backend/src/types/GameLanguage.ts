export type GameLanguage = "fr" | "en";

export const DEFAULT_GAME_LANGUAGE: GameLanguage = "fr";

export function normalizeGameLanguage(value: unknown): GameLanguage {
  return value === "en" || value === "fr" ? value : DEFAULT_GAME_LANGUAGE;
}
