import {
  ColorValue,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import useStyles from "../hooks/useStyles";
import { useMemo } from "react";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { Size, SpacingProps } from "../types";
type TextInputProps = {
  size?: Size | (string & {});
  color?: ColorValue;
} & SpacingProps;

export default function TextInput(props: TextInputProps & RNTextInputProps) {
  const { color, size } = props;
  const { colors, fontSize } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        fontSize: fontSize.get(size),
        color: color || colors.text,
        ...spacingProps,
      },
    });
  }, [color, size, colors.text, fontSize, spacingProps]);

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
