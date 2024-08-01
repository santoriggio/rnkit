import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import useStyles from "../hooks/useStyles";
import Box from "./Box";
import { useMemo } from "react";
import Text from "./Text";
import Icon from "./Icon";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { ButtonProps } from "../types";
import isComplexIcon from "../utils/isComplexIcon";

export default function Button({
  title,
  role = "primary",
  type = "filled",
  active = true,
  loading,
  icon,
  onPress,
  ...props
}: ButtonProps) {
  const { radius, colors, spacing } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const tint = type === "gray" ? colors.gray : colors[role] || colors.primary;

  const handlePress = () => {
    if (loading || active === false) return;

    if (typeof onPress === "function") {
      return onPress();
    }
  };
  const textColor = useMemo(() => {
    if (typeof props.textColor !== "undefined") {
      return props.textColor;
    }
    if (type === "filled") {
      return "#fff";
    }
    return colors[role] || colors.primary;
  }, [props.textColor, type, role, colors]);
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: radius.get("m"),
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: spacing.get("m"),
        paddingHorizontal: spacing.get("xs"),
        ...spacingProps,
      },
      bg: {
        ...StyleSheet.absoluteFillObject,
        opacity: type === "filled" ? 1 : 0.25,
      },
      activityIndicator: {
        marginLeft: spacing.get("m"),
      },
    });
  }, [radius, spacingProps, spacing, type]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, props.style]}
      activeOpacity={0.5}
    >
      {type !== "plain" && <Box backgroundColor={tint} style={styles.bg} />}
      {isComplexIcon(icon) && icon.position === "left" && (
        <Icon color={textColor} {...icon} />
      )}
      <Text bold size="l" color={textColor}>
        {title}
      </Text>
      {typeof icon === "string" && <Icon name={icon} color={textColor} />}
      {isComplexIcon(icon) && icon.position === "right" && (
        <Icon color={textColor} {...icon} />
      )}
      {loading && (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  );
}
