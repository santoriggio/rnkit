import { Colors, Theme } from "../hooks/useStyles";
import deepMerge, { DeepPartial } from "./deepMerge";
import Store from "./store";
export type FontSizes = {
  "xs": number;
  "s": number;
  "m": number;
  "l": number;
  "xl": number;
  "2xl": number;
  "3xl": number;
};

export type Config = {
  themes: Record<string, Theme>;
  colors: Colors;
  onChangeTheme?: (theme: string) => void;
  fontSizes: FontSizes & Record<string, number>;
};
//Create a deep partial type

class ConfigClass {
  private _store: Store = new Store("expo-helpers-config-store");
  private config: Config = {
    themes: {
      light: {
        isDark: false,
        text: "#000",
        card: "#f5f5f7",
        background: "#FFFFFF",
        border: "#efeff4",
      },
      dark: {
        isDark: true,
        text: "#fff",
        card: "#000000",
        background: "#161618",
        border: "#212124",
      },
      fancy: {
        isDark: false,
        text: "green",
        card: "yellow",
        background: "blue",
        border: "tomato",
        primary: "gray",
      },
    },
    colors: {
      primary: "#0074E4",
      secondary: "#7D53DE",
      success: "#4cd964",
      danger: "#FF3B30",
      info: "#006ee6",
      link: "#0000EE",
      warning: "#ffcc00",
      gray: "#9C9C9C",
    },
    fontSizes: {
      "xs": 12,
      "s": 14,
      "m": 16,
      "l": 18,
      "xl": 20,
      "2xl": 22,
      "3xl": 24,
    },
  };

  constructor() {}

  public getProperty<K extends keyof Config>(key: K): Config[K] | null {
    if (typeof this.config[key] === "undefined") {
      return null;
    }
    return this.config[key];
  }
  public init(config: DeepPartial<Config>) {
    this.config = deepMerge(this.config, config);
  }
  get store() {
    return this._store;
  }
}

const config = new ConfigClass();

export default config;
