import { useEffect, useMemo, useRef, useState } from "react";
import { useStyles } from "../hooks";
import { InputProps } from "../types";
import useDebounce from "../hooks/useDebounce";
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import Text from "./Text";
import TextInput from "./TextInput";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import Icon from "./Icon";
import isComplexIcon from "../utils/isComplexIcon";
export default function Input({
  initialValue,
  title,
  placeholder,
  onChangeText = () => {
    // Default fn
  },
  debounce,
  required,
  style,
  type = "text",
  icon,
  keyboardType,
  ...props
}: InputProps) {
  const { spacing, colors, radius, fontSize } = useStyles();
  const [value, setValue] = useState<string>(initialValue);
  const debounced = useDebounce(value, debounce);
  const validDebounce = typeof debounce === "number" && debounce > 0;
  const prevValue = useRef<string>("");
  const spacingProps = useRawSpacingProps(props);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    type === "password" ? true : false
  );
  useEffect(() => {
    if (validDebounce && prevValue.current !== debounced) {
      onChangeText(debounced);
    }

    prevValue.current = debounced;
  }, [debounced]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;

    setValue(text);

    if (validDebounce === false) {
      onChangeText(text);
    }
  };

  const customKeyboardType = useMemo(() => {
    if (keyboardType) return keyboardType;

    if (type === "email") return "email-address";
    if (type === "number") return "numeric";
    if (type === "phone") return "phone-pad";

    return "default";
  }, [keyboardType, type]);

  const customStyle = useMemo(() => {
    return StyleSheet.create({
      container: {
        ...spacingProps,
        ...style,
      },
    });
  }, [spacingProps, style]);

  return (
    <View style={customStyle.container}>
      {title && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing.get("xs"),
            flex: 1,
          }}
        >
          <Text numberOfLines={1} size="l" bold>
            {title}
          </Text>
          {required && (
            <Text size="l" bold color={colors.danger}>
              *
            </Text>
          )}
        </View>
      )}
      <View
        style={{
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.get("m"),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: spacing.get("m"),
        }}
      >
        {typeof icon === "string" && (
          <Icon marginRight="m" name={icon} size={fontSize.get("l")} />
        )}
        {isComplexIcon(icon) && icon.position === "left" && (
          <Icon marginRight="m" size={fontSize.get("l")} {...icon} />
        )}
        <TextInput
          defaultValue={value}
          onChange={onChange}
          placeholder={placeholder || title || "Write here"}
          style={{
            flex: 1,
            paddingVertical: spacing.get("m"),
          }}
          autoCapitalize={
            customKeyboardType === "email-address" ? "none" : undefined
          }
          keyboardType={customKeyboardType}
          secureTextEntry={secureTextEntry}
        />
        {type !== "password" &&
          isComplexIcon(icon) &&
          icon.position === "right" && (
            <Icon marginLeft="m" size={fontSize.get("l")} {...icon} />
          )}
        {type === "password" && (
          <Icon
            name={secureTextEntry ? "eye" : "eye-off"}
            size={fontSize.get("l")}
            onPress={() => {
              setSecureTextEntry((prev) => !prev);
            }}
          />
        )}
      </View>
    </View>
  );
}
