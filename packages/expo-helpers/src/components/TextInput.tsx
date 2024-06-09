import {
  ColorValue,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import useStyles, { spacingSizes } from "../hooks/useStyles";
import { useMemo } from "react";
import { SpacingProps } from "./Box";
import config, { FontSizes } from "../utils/config";
type TextInputProps = {
  size?: keyof FontSizes | (string & {});
  color?: ColorValue;
} & SpacingProps;

export default function TextInput(props: TextInputProps & RNTextInputProps) {
  const { color, size } = props;
  const { colors } = useStyles();
  const styles = useMemo(() => {
    const fontSizes = config.getProperty("fontSizes");
    return StyleSheet.create({
      container: {
        fontSize: (size && fontSizes[size]) || fontSizes.m,
        color: color || colors.text,

        margin: props.margin && spacingSizes[props.margin],
        marginBottom: props.marginBottom && spacingSizes[props.marginBottom],
        marginTop: props.marginTop && spacingSizes[props.marginTop],
        marginLeft: props.marginLeft && spacingSizes[props.marginLeft],
        marginRight: props.marginRight && spacingSizes[props.marginRight],

        padding: props.padding && spacingSizes[props.padding],
        paddingBottom: props.paddingBottom && spacingSizes[props.paddingBottom],
        paddingTop: props.paddingTop && spacingSizes[props.paddingTop],
        paddingLeft: props.paddingLeft && spacingSizes[props.paddingLeft],
        paddingRight: props.paddingRight && spacingSizes[props.paddingRight],
      },
    });
  }, [color, size, colors.text, props]);

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
