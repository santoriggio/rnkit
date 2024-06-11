import { StyleSheet } from "react-native";
import { useStyles } from "../hooks";
import Box from "./Box";
import Text from "./Text";
import { useMemo, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "./Checkbox";
type Value = {
  text: string;
  color?: string;
  icon?: string;
};
type PickerProps = {
  title?: string;
  placeholder?: string;
  values: Record<string, string | Value>;
  required?: boolean;
  limit?: number;
};
function isValue(value: any): value is Value {
  const isObject = typeof value === "object";
  const isNotArray = !Array.isArray(value);

  return isObject && isNotArray && value.text;
}
export default function Picker(props: PickerProps) {
  const { values = {}, required = false, limit = 1 } = props;
  const { colors, spacing } = useStyles();
  const [selected, setSelected] = useState<string[] | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const selectItem = (key: string) => {
    if (limit === 1) {
      setVisible(false);
      return setSelected([key]);
    }

    setSelected((prev) => {
      if (prev === null) {
        return [key];
      }

      const index = prev.indexOf(key);

      if (index >= 0) {
        return selected.filter((x) => x !== key);
      }

      if (prev.length === limit) return prev;

      return [...prev, key];
    });
  };
  const header = useMemo(() => {
    if (selected && selected.length > 0) {
      let formatted_select = [];
      selected.forEach((value_key) => {
        const value = values[value_key];
        if (isValue(value)) {
          formatted_select.push(value.text);
        }

        if (typeof values[value_key] === "string") {
          formatted_select.push(values[value_key]);
        }
      });
      return formatted_select.join(", ");
    }

    if (props.placeholder && props.placeholder !== "") {
      return props.placeholder;
    }

    if (props.title && props.title !== "") {
      return props.title;
    }

    return null;
  }, [props.title, props.placeholder, values, selected]);
  return (
    <Box>
      {props.title && props.title !== "" && (
        <Box horizontal marginBottom="s">
          <Text bold numberOfLines={1} size="l">
            {props.title}{" "}
          </Text>
          {required && (
            <Text size="l" bold color={colors.danger}>
              *
            </Text>
          )}
        </Box>
      )}
      <Box
        radius
        backgroundColor={colors.background}
        onPress={() => {
          setVisible((prev) => !prev);
        }}
        activeOpacity={0.5}
        style={styles.container}
      >
        <Box
          horizontal
          backgroundColor={colors.background}
          padding="m"
          style={styles.header}
        >
          <Text style={styles.headerText} marginRight="m">
            {header}
          </Text>
          <Entypo
            name={visible ? "chevron-up" : "chevron-down"}
            size={spacing.l}
            color={colors.gray}
          />
        </Box>

        {visible && (
          <Box style={styles.picker}>
            {Object.keys(values).map((value_key) => {
              const value = values[value_key];
              const is_value = isValue(value);
              const text = is_value ? value.text : value;
              const is_selected = selected && selected.includes(value_key);
              const is_selectable = selected && selected.length < limit;

              const textColor = () => {
                if (is_selected) {
                  return colors.primary;
                }

                if (is_selectable === false) {
                  return colors.gray;
                }

                return undefined;
              };
              return (
                <Box
                  key={value_key}
                  horizontal
                  padding="m"
                  onPress={() => selectItem(value_key)}
                  style={styles.item}
                >
                  {limit > 1 && <Checkbox selected={is_selected} />}
                  <Text color={textColor()}>{text}</Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
  },
  headerText: { flex: 1 },
  picker: {},
  item: {
    borderTopWidth: 1,
  },
  hidden: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
});
