import {
  StyleSheet,
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import useStyles from "../hooks/useStyles";
import React, { PropsWithChildren, useMemo } from "react";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { SpacingProps } from "../types";

type BoxProps = {
  backgroundColor?: ColorValue;
  horizontal?: boolean;
} & SpacingProps &
  TouchableOpacityProps;

function Box({
  backgroundColor,
  horizontal,
  onPress,
  onLongPress,
  ...props
}: PropsWithChildren<BoxProps>) {
  const { colors } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  // const disabled = !(
  //   typeof props.onPress === "function" ||
  //   typeof props.onLongPress === "function"
  // );
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: horizontal ? "row" : "column",
        backgroundColor: backgroundColor || undefined,
        borderColor: colors.border,
        ...spacingProps,
      },
    });
  }, [backgroundColor, spacingProps, horizontal, colors.border]);

  const componentProps: ViewProps = {
    ...props,
    style: [styles.container, props.style],
    children: props.children,
  };

  if (typeof onPress === "function" || typeof onLongPress === "function") {
    return React.createElement(TouchableOpacity, {
      ...componentProps,
      activeOpacity: 0.8,
      onPress,
      onLongPress,
    });
  }

  return React.createElement(View, componentProps);
}

export default Box;
