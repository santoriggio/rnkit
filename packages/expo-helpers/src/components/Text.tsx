import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { PropsWithChildren, useMemo } from "react";
import useStyles from "../hooks/useStyles";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { Size, SpacingProps } from "../types";


export default function Text(props: PropsWithChildren<TextProps>) {
  const { color, size = "m", bold } = props;
  const { colors, fontSize } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const styles = useMemo(() => {
    return StyleSheet.create({
      style: {
        color: color || colors.text,
        fontSize: fontSize.get(size),
        fontWeight: bold ? "bold" : undefined,
        ...spacingProps,
      },
    });
  }, [colors.text, fontSize, color, spacingProps, size, bold]);

  return (
    <RNText {...props} style={[styles.style, props.style]}>
      {props.children}
    </RNText>
  );
}
