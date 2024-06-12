import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { SpacingProps } from "./Box";
import { PropsWithChildren, useMemo } from "react";
import useStyles from "../hooks/useStyles";
import config, { FontSizes } from "../utils/config";
import { useRawSpacingProps } from "../hooks/useSpacingProps";

type TextProps = {
  color?: string;
  size?: keyof FontSizes | (string & {});
  bold?: boolean;
} & SpacingProps &
  RNTextProps;

export default function Text(props: PropsWithChildren<TextProps>) {
  const { color, size = "m", bold } = props;
  const { colors } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const styles = useMemo(() => {
    const fontSizes = config.getProperty("fontSizes");
    return StyleSheet.create({
      style: {
        color: color || colors.text,
        fontSize: fontSizes[size] || fontSizes.m,
        fontWeight: bold ? "bold" : undefined,
        ...spacingProps,
      },
    });
  }, [colors.text, color, spacingProps, size, bold]);

  return (
    <RNText {...props} style={[styles.style, props.style]}>
      {props.children}
    </RNText>
  );
}
