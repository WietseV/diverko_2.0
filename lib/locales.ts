export const LANGUAGES = ["en", "nl", "fr"] as const;
export type Language = (typeof LANGUAGES)[number];
export const LANG_COOKIE = "diverko-lang";

export function normalizeLanguage(value: unknown): Language {
  if (typeof value === "string" && LANGUAGES.includes(value as Language)) {
    return value as Language;
  }
  return "en";
}
