import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import useStyles from "../hooks/useStyles";
import Box from "./Box";
import { useMemo } from "react";
import Text from "./Text";
import Icon from "./Icon";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { ButtonProps } from "../types";
import { isComplexIcon, triggerAction } from "../utils";

export default function Button({
  title,
  role = "primary",
  type = "filled",
  active = true,
  loading,
  icon,
  onPress,
  onLongPress,
  delayLongPress,
  ...props
}: ButtonProps) {
  const { radius, colors, spacing } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const tint = type === "gray" ? colors.gray : colors[role] || colors.primary;

  const handlePress = () => {
    if (loading || active === false) return;

    triggerAction(onPress);
  };
  const handleLongPress = () => {
    if (loading || active === false) return;

    triggerAction(onLongPress);
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
      onLongPress={handleLongPress}
      delayLongPress={delayLongPress}
      style={[styles.container, props.style]}
      activeOpacity={0.8}
    >
      {type !== "plain" && <Box backgroundColor={tint} style={styles.bg} />}
      {isComplexIcon(icon) && icon.position === "left" && (
        <Icon color={textColor} marginRight="s" {...icon} />
      )}
      <Text bold size="l" color={textColor}>
        {title}
      </Text>
      {typeof icon === "string" && (
        <Icon name={icon} color={textColor} marginLeft="s" />
      )}
      {isComplexIcon(icon) && icon.position === "right" && (
        <Icon color={textColor} marginLeft="s" {...icon} />
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
