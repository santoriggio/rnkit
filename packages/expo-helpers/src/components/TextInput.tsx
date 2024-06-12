import {
  ColorValue,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import useStyles from "../hooks/useStyles";
import { useMemo } from "react";
import { SpacingProps } from "./Box";
import config, { FontSizes } from "../utils/config";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
type TextInputProps = {
  size?: keyof FontSizes | (string & {});
  color?: ColorValue;
} & SpacingProps;

export default function TextInput(props: TextInputProps & RNTextInputProps) {
  const { color, size } = props;
  const { colors } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const styles = useMemo(() => {
    const fontSizes = config.getProperty("fontSizes");
    return StyleSheet.create({
      container: {
        fontSize: (size && fontSizes[size]) || fontSizes.m,
        color: color || colors.text,
        ...spacingProps,
      },
    });
  }, [color, size, colors.text, spacingProps]);

  return (
    <RNTextInput
      selectionColor={colors.primary}
      cursorColor={colors.primary}
      selectionHandleColor={colors.primary}
      placeholderTextColor={colors.gray}
      {...props}
      style={[styles.container, props.style]}
    />
  );
}
