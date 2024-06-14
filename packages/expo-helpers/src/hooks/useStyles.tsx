import { useMemo } from "react";
import { useTheme } from "../utils/themeProvider";
import config from "../utils/config";
import { SpacingSizeKey, Theme, sizes } from "../types";

export type Styles = {
  colors: Partial<Theme>;
  spacing: SizeProvider;
  radius: SizeProvider;
  fontSize: SizeProvider;
};

const regex = /^\d+(xs|xl)$/;

export function isValidSize(size: string) {
  if (typeof size !== "string") return false;

  if (typeof sizes[size] !== "undefined") return true;

  if (regex.test(size)) return true;

  return false;
}
class SizeProvider {
  private sizes: Partial<Record<SpacingSizeKey, number>> = {};
  // private type: "spacing" | "radius" | "fontSize";
  private mediumSize: number;
  constructor(type: "spacing" | "radius" | "fontSize") {
    // this.type = type;

    switch (type) {
      case "spacing":
        this.mediumSize = config.getProperty("mediumSpacingSize");
        break;
      case "radius":
        this.mediumSize = config.getProperty("mediumRadiusSize");
        break;
      case "fontSize":
        this.mediumSize = config.getProperty("mediumFontSize");
        break;
    }

    for (const size in sizes) {
      this.createNewSize(size);
    }
  }

  private createNewSize(size: SpacingSizeKey): number {
    if (isValidSize(size) === false) return this.mediumSize;

    const multiplier = 0.2857;

    let res = this.mediumSize;

    switch (size) {
      case "xs":
        const _s = this.mediumSize - this.mediumSize * multiplier;
        res = _s - _s * multiplier;
        break;
      case "s":
        res = this.mediumSize - this.mediumSize * multiplier;
        break;
      case "l":
        res = this.mediumSize + this.mediumSize * multiplier;
        break;
      case "xl":
        const _l = this.mediumSize + this.mediumSize * multiplier;
        res = _l + _l * multiplier;
        break;

      default:
        if (regex.test(size) === false) break;
        const match = size.match(regex);
        const to = parseInt(match[0], 10);
        for (let i = 0; i < to; i++) {
          if (match[1] === "xs") {
            res = res - res * multiplier;
          } else if (match[1] === "xl") {
            res = res + res * multiplier;
          }
        }

        break;
    }

    this.sizes = {
      ...this.sizes,
      [size]: res,
    };

    return res;
  }

  public get(size: SpacingSizeKey) {
    if (typeof this.sizes[size] === "number") {
      return this.sizes[size];
    }

    return this.createNewSize(size);
  }
}
const spacing = new SizeProvider("spacing");
const fontSize = new SizeProvider("fontSize");
const radius = new SizeProvider("radius");

export default function useStyles() {
  const { theme } = useTheme();
  const styles: Styles = useMemo(() => {
    const themes = config.getProperty("themes");
    const colors = config.getProperty("colors");
    return {
      colors: {
        ...colors,
        ...themes[theme],
      },
      fontSize,
      spacing,
      radius,
    };
  }, [theme]);

  return styles;
}
