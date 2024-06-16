import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useStyles } from "../hooks";
import Text from "./Text";
import { PureComponent, useEffect, useMemo, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "./Checkbox";
import { SpacingProps } from "../types";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
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
  const { colors, spacing, radius } = useStyles();
  const spacingProps = useRawSpacingProps(props);
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
      picker: {
        ...spacingProps,
      },
      titleContainer: {
        marginBottom: spacing.get("xs"),
      },
      container: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radius.get("m"),
        overflow: "hidden",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.get("m"),
        backgroundColor: colors.background,
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
        alignItems: "center",
        padding: spacing.get("m"),
        borderTopWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
      },
    });
  }, [colors.border, colors.background, spacing, radius, spacingProps]);

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
  const chunkSize = 15;
  const [list, setList] = useState<ValueWithId[]>([]);

  useEffect(() => {
    if (visible) {
      getChunks();
    } else {
      setList([]);
    }
    //HACK: Remove eslint error abount getChunks() in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const getChunks = async () => {
    const formatted_list = Object.entries(values).map(([key, value]) => {
      if (isValue(value)) {
        return { id: key, ...value };
      }

      return { id: key, text: value };
    });
    let loadedChunk = 0;
    const loadChunk = (chunk: ValueWithId[]) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("chunk", loadedChunk);
          loadedChunk++;
          setList((prev) => [...prev, ...chunk]);
          resolve(true);
        }, 50);
      });
    };
    for (let i = 0; i < formatted_list.length; i += chunkSize) {
      const chunk = formatted_list.slice(i, i + chunkSize);
      await loadChunk(chunk);
    }
  };

  const renderItem = (value: ValueWithId) => {
    return (
      <ListItem
        key={value.id}
        item={value}
        limit={limit}
        selected={selected && selected.includes(value.id)}
        onPress={selectItem}
        styles={{
          container: styles.item,
        }}
      />
    );
  };

  if (visible === false) {
    return null;
  }

  return list.map(renderItem);
};
type ListItemProps = {
  item: ValueWithId;
  selected: boolean;
  styles: any;
  limit: number;
  onPress: (id: string) => void;
};
class ListItem extends PureComponent<ListItemProps> {
  render() {
    const { item, selected, onPress, limit, styles } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress(item.id)}
        style={styles.container}
        activeOpacity={0.8}
      >
        {limit > 1 && <Checkbox marginRight="m" selected={selected} />}
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  }
}
