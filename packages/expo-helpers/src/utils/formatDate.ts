// import { getLocales } from "expo-localization";

import i18n from "./i18n";

const obj = {
  LT: {
    timeStyle: "short",
  },
  LTS: {
    timeStyle: "medium",
  },
  lL: {
    dateStyle: "short",
    timeStyle: "short",
  },
  L: {
    dateStyle: "short",
  },
  LL: {
    dateStyle: "medium",
  },
  LLL: {
    dateStyle: "medium",
    timeStyle: "short",
  },
  LLLL: {
    dateStyle: "long",
    timeStyle: "short",
  },
} as const;

export default function formatDate(
  output: keyof typeof obj,
  date: Date | number,
  options: Intl.DateTimeFormatOptions = {}
): string {
  options = {
    ...obj[output],
    ...options,
  };

  return Intl.DateTimeFormat(i18n.locale, options).format(date);
}
