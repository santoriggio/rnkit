import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import useStyles from "../hooks/useStyles";
import Box from "./Box";
import { useMemo } from "react";
import Text from "./Text";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { SpacingProps } from "../types";

export type ButtonProps = {
  title?: string;
  onPress: (button: ButtonProps) => void;
  //optional
  icon?: string;
  role?: "primary" | "danger" | "info" | "warning" | "success";
  type?: "plain" | "filled" | "gray" | "tinted";
  active?: boolean;
  loading?: boolean;
  textColor?: string;
} & SpacingProps &
  Omit<TouchableOpacityProps, "role">;

export default function Button(props: ButtonProps) {
  const { title, role = "primary", type = "filled", active = true } = props;
  const { radius, colors, spacing } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const tint = type === "gray" ? colors.gray : colors[role] || colors.primary;

  const onPress = () => {
    if (props.loading || active === false) return;

    if (typeof props.onPress === "function") {
      return props.onPress(props);
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
    });
  }, [radius, spacingProps, spacing, type]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, props.style]}
      activeOpacity={0.5}
    >
      {type !== "plain" && <Box backgroundColor={tint} style={styles.bg} />}
      <Text bold size="l" color={textColor}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
