import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useStyles } from "../hooks";
import Box, { SpacingProps } from "./Box";
import Text from "./Text";
import { useCallback, useMemo, useState } from "react";
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
  loadingOnEmptyValues?: boolean;
} & SpacingProps;
type PickerItemProps = {
  id: string;
  selected: boolean;
  onPress: (id: string) => void;
  text: string;
  limit: number;
};
function isValue(value: any): value is Value {
  const isObject = typeof value === "object";
  const isNotArray = !Array.isArray(value);

  return isObject && isNotArray && value.text;
}
function PickerItem(props: PickerItemProps) {
  const { selected, onPress, id, text, limit } = props;
  const { colors } = useStyles();

  // const is_selectable =
  //   limit === 1 || (selected && selected.length < limit);
  const press = () => {
    onPress(id);
  };
  const textColor = useMemo(() => {
    if (selected) {
      return colors.primary;
    }

    // if (is_selectable === false) {
    //   return colors.gray;
    // }
    return colors.text;
  }, [colors.primary, colors.text, selected]);
  return (
    <>
      <View style={{ height: 1, backgroundColor: colors.border }} />
      <Box horizontal padding="m" onPress={press} style={styles.item}>
        {limit > 1 && <Checkbox selected={selected} />}
        <Text color={textColor}>{text}</Text>
      </Box>
    </>
  );
}
// const MemoPickerItem = memo(PickerItem)
export default function Picker(props: PickerProps) {
  const { values = {}, limit = 1, loadingOnEmptyValues = true } = props;
  const { colors, getSpacingSize } = useStyles();
  const [selected, setSelected] = useState<string[] | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const is_empty =
    typeof values !== "object" || Object.keys(values).length === 0;

  const renderList = useCallback(() => {
    const list = Object.keys(values);

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
    const renderItem = (key: string) => {
      const value = values[key];
      const is_value = isValue(value);
      return (
        <PickerItem
          key={key}
          id={key}
          onPress={selectItem}
          selected={selected && selected.includes(key)}
          limit={limit}
          text={is_value ? value.text : value}
        />
      );
    };

    return list.map(renderItem);
  }, [values, selected, limit]);
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
  const onPress = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);
  const dynamicStyles = useMemo(() => {
    return StyleSheet.create({
      picker: {},
      titleContainer: {},
      container: {},
      header: {},
    });
  }, []);
  return (
    <View style={dynamicStyles.picker}>
      {typeof props.title === "string" && props.title !== "" && (
        <Box marginBottom="xs">
          <Text bold size="l">
            {props.title}
          </Text>
        </Box>
      )}
      <Box style={styles.container}>
        <Box padding="m" style={styles.header} horizontal onPress={onPress}>
          <Text style={styles.headerText}>{header}</Text>
          {loadingOnEmptyValues && is_empty === true ? (
            <ActivityIndicator size="small" color={colors.gray} />
          ) : (
            <Entypo
              style={{ marginLeft: getSpacingSize("m") }}
              name={visible ? "chevron-up" : "chevron-down"}
              size={getSpacingSize("l")}
              color={colors.gray}
            />
          )}
        </Box>

        {visible && renderList()}
      </Box>
    </View>
  );
}
/**
 *
 */
/*
 *
 *
 
            {Object.keys(values).map((value_key) => {
              const value = values[value_key];
              const is_value = isValue(value);
              return (
                <Text key={value_key}>{is_value ? value.text : value}</Text>
              );
              return (
                <PickerItem
                  key={value_key}
                  onPress={selectItem}
                  id={value_key}
                  limit={limit}
                  selected={selected && selected.includes(value_key)}
                  text={is_value ? value.text : value}
                />
              );
            })}
 *
 *
 * */
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
  separator: {
    height: 1,
  },
  item: {
    alignItems: "center",
  },
  hidden: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
});
