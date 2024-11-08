import { Colors, Theme } from "../types";
import deepMerge, { DeepPartial } from "./deepMerge";
import Store from "./store";

export type Config = {
  themes: Record<string, Theme>;
  colors: Colors;
  onChangeTheme?: (theme: string) => void;
  mediumSpacingSize: number;
  mediumRadiusSize: number;
  mediumFontSize: number;
};
//Create a deep partial type

class ConfigClass {
  private _store: Store = new Store("expo-helpers-config-store");
  private config: Config = {
    themes: {
      light: {
        isDark: false,
        text: "#000",
        card: "#FFFFFF",
        background: "#f5f5f7",
        border: "#efeff4",
      },
      dark: {
        isDark: true,
        text: "#fff",
        background: "#000000",
        card: "#161618",
        border: "#212124",
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
    mediumSpacingSize: 14,
    mediumFontSize: 16,
    mediumRadiusSize: 10,
  };
  constructor() {}

  public getProperty<K extends keyof Config>(key: K): Config[K] | null {
    if (typeof this.config[key] === "undefined") {
      return null;
    }
    return this.config[key];
  }
  public get<K extends keyof Config>(key: K): Config[K] | null {
    return this.getProperty(key);
  }
  public update<K extends keyof Config>(key: K, value: Partial<Config[K]>) {
    if (this.exists(key) === false) return null;

    this.config[key] = deepMerge(this.config[key], value);
  }
  public set<K extends keyof Config>(key: K, value: Config[K]) {
    if (this.exists(key) === false) return null;

    this.config[key] = value;
  }
  public init(config: DeepPartial<Config>) {
    this.config = deepMerge(this.config, config);
  }
  get store() {
    return this._store;
  }

  private exists(key: string): boolean {
    if (typeof this.config[key] !== "undefined") {
      return true;
    }
    return false;
  }
}

const config = new ConfigClass();

export default config;
