import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useStyles } from "../hooks";
import Text from "./Text";
import { useMemo, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "./Checkbox";
import { SpacingProps } from "../types";
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

function isValue(value: any): value is Value {
  const isObject = typeof value === "object";
  const isNotArray = !Array.isArray(value);

  return isObject && isNotArray && value.text;
}
export default function Picker(props: PickerProps) {
  const { values = {}, limit = 1, loadingOnEmptyValues = true } = props;
  const { colors, spacing } = useStyles();
  const [selected, setSelected] = useState<string[] | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const is_empty =
    typeof values !== "object" || Object.keys(values).length === 0;

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

  const styles = useMemo(() => {
    return StyleSheet.create({
      picker: {},
      titleContainer: {
        marginBottom: spacing.get("xs"),
      },
      container: {
        borderColor: colors.border,
        borderWidth: 1,
        overflow: "hidden",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.get("m"),
      },
      headerText: {
        flex: 1,
      },
      chevron: {
        marginLeft: spacing.get("m"),
      },
      separator: {
        height: 1,
        backgroundColor: colors.border,
      },
      item: {
        flexDirection: "row",
        padding: spacing.get("m"),
        borderTopWidth: 1,
        borderColor: colors.border,
      },
    });
  }, [colors.border, spacing]);

  return (
    <View style={styles.picker}>
      {typeof props.title === "string" && props.title !== "" && (
        <View style={styles.titleContainer}>
          <Text bold size="l">
            {props.title}
          </Text>
        </View>
      )}
      <View style={styles.container}>
        <View
          onTouchStart={() => {
            setVisible((prev) => !prev);
          }}
          style={styles.header}
        >
          <Text style={styles.headerText}>{header}</Text>
          {loadingOnEmptyValues && is_empty === true ? (
            <ActivityIndicator size="small" color={colors.gray} />
          ) : (
            <Entypo
              style={styles.chevron}
              name={visible ? "chevron-up" : "chevron-down"}
              size={spacing.get("l")}
              color={colors.gray}
            />
          )}
        </View>
        <List
          visible={visible}
          values={values}
          styles={{ separator: styles.separator, item: styles.item }}
          limit={limit}
          selectItem={selectItem}
          selected={selected}
        />
      </View>
    </View>
  );
}

type ListProps = {
  visible: boolean;
  values: PickerProps["values"];
  styles: any;
  limit: number;
  selectItem: (id: string) => void;
  selected: any[];
};

type ValueWithId = Value & { id: string };

const List = ({
  visible,
  values = {},
  styles,
  limit,
  selectItem,
  selected,
}: ListProps) => {
  const list = Object.entries(values).map(([key, value]) => {
    if (isValue(value)) {
      return { id: key, ...value };
    }

    return { id: key, text: value };
  });

  const renderItem = (value: ValueWithId) => {
    return (
      <TouchableOpacity
        key={value.id}
        onPress={() => selectItem(value.id)}
        style={styles.item}
        activeOpacity={0.8}
      >
        {limit > 1 && (
          <Checkbox selected={selected && selected.includes(value.id)} />
        )}
        <Text>{value.text}</Text>
      </TouchableOpacity>
    );
  };

  if (visible === false) {
    return null;
  }

  return list.map(renderItem);
};
