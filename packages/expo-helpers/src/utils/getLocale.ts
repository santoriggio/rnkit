import { Locale, getLocales } from "expo-localization";

function isLocale(locale: unknown): locale is Locale {
  return typeof locale !== "undefined" && locale !== null;
}
export default function getLocale(): Locale | null {
  const locales = getLocales();

  if (isLocale(locales[0])) {
    return locales[0];
  }

  for (let i = 1; i < locales.length; i++) {
    if (isLocale(locales[i])) {
      return locales[i];
    }
  }

  return null;
}
