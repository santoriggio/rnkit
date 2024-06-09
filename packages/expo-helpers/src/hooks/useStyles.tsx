import { useMemo } from "react";
import { useTheme } from "../utils/themeProvider";
import config, { FontSizes } from "../utils/config";

export type Colors = {
  primary: string;
  secondary: string;
  info: string;
  warning: string;
  success: string;
  danger: string;
  link: string;
  gray: string;
};
export type Styles = {
  colors: Partial<Theme>;
  spacing: typeof spacingSizes;
  radius: number;
  fontSize: FontSizes;
};
const spacing = 14;
export const spacingSizes = {
  xs: spacing * 0.25,
  s: spacing * 0.5,
  m: spacing,
  l: spacing * 1.5,
  xl: spacing * 2,
};
export const radius = 12;
export type Theme = {
  isDark: boolean;
  text: string;
  card: string;
  background: string;
  border: string;
} & Partial<Colors>;

export default function useStyles() {
  const { theme } = useTheme();
  const styles: Styles = useMemo(() => {
    const themes = config.getProperty("themes");

    const colors = config.getProperty("colors");
    const fontSizes = config.getProperty("fontSizes");
    return {
      colors: {
        ...colors,
        ...themes[theme],
      },
      fontSize: fontSizes,
      spacing: spacingSizes,
      radius,
    };
  }, [theme]);

  return styles;
}
