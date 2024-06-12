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
export type SpacingSizeKey = Size | (string & {});
export type Styles = {
  colors: Partial<Theme>;
  getSpacingSize: typeof getSpacingSize;
  radius: number;
  fontSize: FontSizes;
};
export type Theme = {
  isDark: boolean;
  text: string;
  card: string;
  background: string;
  border: string;
} & Partial<Colors>;

export const sizes = {
  xs: null,
  s: null,
  m: null,
  l: null,
  xl: null,
};
export type Size = keyof typeof sizes;
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
      getSpacingSize: getSpacingSize,
      //TODO: Sistemare come spacing e fontSize
      radius: 12,
    };
  }, [theme]);

  return styles;
}

const regex = /^\d+(xs|xl)$/;

export function getSpacingSize(size: SpacingSizeKey) {
  const mediumSpacingSize = config.getProperty("mediumSpacingSize");
  if (size === "m" || isValidSize(size) === false) return mediumSpacingSize;

  const multiplier = 0.2857;
  const singleSizeStep = mediumSpacingSize * multiplier;

  if (size === "s") return mediumSpacingSize - singleSizeStep;
  if (size === "l") return mediumSpacingSize + singleSizeStep;

  if (size === "xs") return mediumSpacingSize - singleSizeStep * 2;
  if (size === "xl") return mediumSpacingSize + singleSizeStep * 2;
  const match = size.match(regex);

  let res = mediumSpacingSize;

  for (let i = 0; i < parseInt(match[0], 10); i++) {
    if (match[1] === "xs") {
      res = res - res * multiplier;
    } else if (match[1] === "xl") {
      res = res + res * multiplier;
    }
  }

  return res;
}
export function isValidSize(size: string) {
  if (typeof size !== "string") return false;

  if (typeof sizes[size] !== "undefined") return true;

  if (regex.test(size)) return true;

  return false;
}
