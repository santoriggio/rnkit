import { useEffect, useRef, useState } from "react";
import { useStyles } from "../hooks";
import { InputProps } from "../types";
import useDebounce from "../hooks/useDebounce";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import Text from "./Text";
export default function Input({
  initialValue,
  title,
  placeholder,
  onChangeText,
  debounce,
  required,
}: InputProps) {
  const { spacing, colors, radius, fontSize } = useStyles();
  const [value, setValue] = useState<string>(initialValue);
  const debounced = useDebounce(value, debounce);
  const validDebounce = typeof debounce === "number" && debounce > 0;
  const prevValue = useRef<string>("");
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
  return (
    <View>
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
      <TextInput
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder || title || "Write here"}
        style={{
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.get("m"),
          padding: spacing.get("m"),
          fontSize: fontSize.get("m"),
        }}
        selectionColor={colors.primary}
        cursorColor={colors.primary}
      />
    </View>
  );
}
