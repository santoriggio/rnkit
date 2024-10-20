// Icon.tsx
import React, { useMemo } from "react";
import { IconProps, iconFamilies } from "../types";
import { useStyles } from "../hooks";
import { StyleSheet } from "react-native";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { triggerAction } from "../utils";

export default function Icon({
  name,
  family = "Feather",
  size,
  color,
  style,
  onPress,
  onLongPress,
  ...props
}: IconProps) {
  const { fontSize, colors } = useStyles();
  const spacingProps = useRawSpacingProps(props);

  let IconComponent: any =
    (family && iconFamilies[family]) || iconFamilies.Feather;

  const iconExists =
    IconComponent.glyphMap && IconComponent.glyphMap.hasOwnProperty(name);

  // If the icon doesn't exist in the specified family, find it in other families

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
  const handlePress = () => triggerAction(onPress);
  const handleLongPress = () => triggerAction(onLongPress);

  const iconSize = useMemo(() => {
    if (typeof size === "number") {
      return size;
    }

    if (typeof size === "string") {
      return fontSize.get(size);
    }

    return fontSize.get("xl");
  }, [size, fontSize]);

  const customStyle = useMemo(() => {
    return StyleSheet.create({
      icon: {
        width: iconSize,
        textAlign: "center",
        ...spacingProps,
        ...style,
      },
    });
  }, [iconSize, style, spacingProps]);

  return (
    <IconComponent
      name={name}
      size={iconSize}
      color={color || colors.text}
      style={customStyle.icon}
      onPress={onPress && handlePress}
      onLongPress={onLongPress && handleLongPress}
      suppressHighlighting
    />
  );
}
