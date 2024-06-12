import {
  StyleSheet,
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import useStyles, { SpacingSizeKey } from "../hooks/useStyles";
import { PropsWithChildren, useMemo } from "react";
import { useRawSpacingProps } from "../hooks/useSpacingProps";

type BoxProps = {
  backgroundColor?: ColorValue;
  horizontal?: boolean;
} & SpacingProps &
  TouchableOpacityProps;

export const spacingProps = {
  //margin
  margin: null,
  marginBottom: null,
  marginTop: null,
  marginLeft: null,
  marginRight: null,
  //spacing
  padding: null,
  paddingBottom: null,
  paddingTop: null,
  paddingLeft: null,
  paddingRight: null,
  //radius
} as const;

export type SpacingProps = Partial<
  Record<keyof typeof spacingProps, SpacingSizeKey>
>;

export default function Box(props: PropsWithChildren<BoxProps>) {
  const { backgroundColor, horizontal } = props;
  const { colors } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const disabled = !(
    typeof props.onPress === "function" ||
    typeof props.onLongPress === "function"
  );
  const styles = useMemo(() => {
    const bg = backgroundColor || undefined;
    return StyleSheet.create({
      container: {
        flexDirection: horizontal ? "row" : "column",
        backgroundColor: bg,
        borderColor: colors.border,
        ...spacingProps,
      },
    });
  }, [backgroundColor, spacingProps, horizontal, colors.border]);
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      {...props}
      style={[styles.container, props.style]}
    >
      {props.children}
    </TouchableOpacity>
  );
}
