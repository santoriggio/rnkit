import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import config from "./config";
type ThemeCTX = {
  theme: string;
  setTheme: (theme: string) => void;
};
const ThemeContext = createContext<ThemeCTX>({
  theme: "light",
  setTheme: () => null,
});
export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider(props: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [theme, set] = useState<string>(config.store.get("theme") || "light");
  useEffect(() => {
    const currentTheme = config.store.get("theme");
    if (currentTheme === null) {
      //theme is set to automatic
      set(colorScheme);
    }
  }, [colorScheme]);

  /**
   * newTheme === null to set to "automatic"
   */
  const setTheme = (newTheme: string) => {
    if (newTheme === null || newTheme === "_automatic") {
      //if newTheme is set to automatic remove the key from the store
      config.store.remove("theme");
      set(colorScheme);

      const onChangeTheme = config.getProperty("onChangeTheme");
      if (typeof onChangeTheme === "function") {
        onChangeTheme(newTheme);
      }

      return;
    }
    const themes = config.getProperty("themes");

    if (typeof themes[newTheme] === "undefined") {
      console.warn(`${newTheme} not exists`);
      return;
    }

    config.store.set("theme", newTheme);
    set(newTheme);
    const onChangeTheme = config.getProperty("onChangeTheme");
    if (typeof onChangeTheme === "function") {
      onChangeTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
