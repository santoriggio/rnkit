import config from "./config";
import { getLocales } from "expo-localization";

type Translation = Record<string, any>;
type Translations = Record<string, Translation>;

/* type Options =
  | {
    count?: number;
  }
  | Record<string, any>; */
type Options = {
  count?: number;
  [key: string]: any;
};

type Init = {
  locale?: string;
  translations: Translations;
  onChangeLocale?: (locale: string) => void;

  localeType?: "languageCode" | "languageTag";
};

class I18n {
  public translations: Translations = {};
  //public locale: string = "en";
  //private locales: Locale[] = [];
  private _locale: string = config.store.get("locale") || "en";
  private _translation: Translation = {};
  private _onChangeLocale: Init["onChangeLocale"] | undefined;

  constructor(translations: Translations) {
    this.translations = translations;
    // config.store.remove("locale");
    // const locales = getLocales();
    // console.log("Locales:", locales);
  }

  private getStoredLocale(localeType: Init["localeType"] = "languageCode") {
    const stored = config.store.get<string>("locale");

    if (stored) {
      this.locale = stored;
      return;
    }

    const locales = getLocales();
    const firstLocale = locales[0];

    const value = firstLocale[localeType];

    const translation = this.translations[value];

    if (typeof translation === "undefined") {
      throw Error("Locale not exists");
    }

    this._locale = value;
    this._translation = translation;
  }

  public init(init_config: Init) {
    this.translations = init_config.translations;
    this._translation = init_config.translations[this._locale];

    this.getStoredLocale(init_config.localeType);

    if (typeof init_config.locale === "string") {
      this.locale = init_config.locale;
    }

    //Keep last to not trigger first locale changes
    this._onChangeLocale = init_config.onChangeLocale;
  }

  set locale(value: string) {
    if (typeof value !== "string") return;

    const translation = this.translations[value];

    if (typeof translation === "undefined") {
      throw Error("Locale not exists");
    }

    this._locale = value;
    this._translation = translation;

    config.store.set("locale", value);
    if (typeof this._onChangeLocale !== "undefined") {
      this._onChangeLocale(value);
    }
  }

  get locale(): string {
    if (typeof this._locale === "undefined") return "en";
    return this._locale;
  }

  public t(key: string, options: Options = {}) {
    if (typeof key !== "string") return "";

    const formattedString = this.findFormattedString(key, options);

    if (formattedString === null) {
      return key;
    }

    return this.sub(formattedString, options);
  }

  get locales() {
    const locales = Object.keys(this.translations);

    return locales;
  }

  private sub(str: string, options: Options = {}) {
    if (typeof str === "string") {
      return str.replace(/%\{(\w+)\}/g, (match, key: keyof Options) => {
        if (key in options) {
          return options[key];
        }
        return match;
      });
    }

    return JSON.stringify(str);
  }

  private findFormattedString(
    key: string,
    options: Options = {}
  ): string | null {
    if (typeof this._translation === "undefined") {
      return null;
    }
    let formattedString: any = null;

    if (key.includes(".")) {
      const splitted = key
        .split(".")
        .filter((str) => typeof str === "string" && str.length > 0);

      if (splitted[0] && this._translation[splitted[0]]) {
        formattedString = this._translation[splitted[0]];
      } else {
        return null;
      }

      for (let i = 1; i < splitted.length; i++) {
        if (typeof formattedString === "string") break;

        if (
          typeof formattedString === "object" &&
          !Array.isArray(formattedString)
        ) {
          const splittedKey = splitted[i];
          if (splittedKey && formattedString[splittedKey]) {
            formattedString = formattedString[splittedKey];
          }
        }
      }
    }

    if (typeof formattedString === "string") {
      return formattedString;
    }

    if (
      typeof formattedString === "object" &&
      !Array.isArray(formattedString)
    ) {
      //check for count option
    }

    if (formattedString === null) {
      if (typeof this._translation[key] === "undefined") {
        return null;
      }

      formattedString = this._translation[key];

      if (typeof formattedString === "object") {
        for (const option_key of Object.keys(options)) {
          const option = options[option_key];

          if (option_key === "count" && typeof option === "number") {
            if (option === 0 && typeof formattedString.zero !== "undefined") {
              return formattedString.zero;
            }

            if (option === 1 && typeof formattedString.one !== "undefined") {
              return formattedString.one;
            }

            if (typeof formattedString.other !== "undefined") {
              return formattedString.other;
            }
          }

          // if (typeof formattedString[option_key] !== "undefined") {
          //   return formattedString[option_key];
          // }
        }
      }
    }

    return formattedString;
  }
}
const i18n = new I18n({});
export default i18n;
