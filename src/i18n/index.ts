import { en } from "./locales/en";
import { uz } from "./locales/uz";
import { ru } from "./locales/ru";
import { Language, TranslationDictionary } from "./types";

export * from "./types";

export const translations: Record<Language, TranslationDictionary> = {
  en,
  uz,
  ru,
};

export function getNestedTranslation(obj: any, path: string): string | undefined {
  if (!obj || !path) return undefined;
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}
