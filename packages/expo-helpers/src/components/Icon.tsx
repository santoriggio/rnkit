// Icon.tsx
import React from "react";
import { IconProps, iconFamilies } from "../types";
import { useStyles } from "../hooks";

const Icon: React.FC<IconProps> = React.memo(
  ({ name, family = "Feather", size, color, style }) => {
    const { fontSize, colors } = useStyles();

    let IconComponent: any =
      (family && iconFamilies[family]) || iconFamilies.Feather;

    const iconExists =
      IconComponent.glyphMap && IconComponent.glyphMap.hasOwnProperty(name);

    // If the icon doesn't exist in the specified family, find it in other families

    console.log(family);

    if (!iconExists) {
      for (const iconFamily of Object.values(iconFamilies)) {
        if (
          iconFamily &&
          iconFamily.glyphMap &&
          iconFamily.glyphMap.hasOwnProperty(name)
        ) {
          IconComponent = iconFamily;
          break;
        }
      }
    }

    return (
      <IconComponent
        name={name}
        size={size || fontSize.get("xl")}
        color={color || colors.text}
        style={style}
      />
    );
  }
);

export default Icon;
