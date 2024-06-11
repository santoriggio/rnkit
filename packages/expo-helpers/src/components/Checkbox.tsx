import { View } from "react-native";
import { useStyles } from "../hooks";
import { ReactNode, useMemo } from "react";
import { Entypo } from "@expo/vector-icons";
import Box from "./Box";
import Text from "./Text";
type CheckboxProps = {
  /*
   * @default primary
   * */
  color?: string;
  selected: boolean;
  title?: string;
  placeholder?: string | ((props: CheckboxProps) => ReactNode);
  required?: boolean;
};
function Placeholder(props: CheckboxProps) {
  if (typeof props.placeholder === "undefined") return null;

  if (typeof props.placeholder === "string") {
    return (
      <Text numberOfLines={1} marginLeft="s">
        {props.placeholder}
      </Text>
    );
  }
  if (typeof props.placeholder === "function") {
    return props.placeholder(props);
  }
  return null;
}
export default function Checkbox(props: CheckboxProps) {
  const { selected, color, required = false } = props;
  const { colors, spacing } = useStyles();

  const tint = useMemo(() => {
    if (color) {
      return color;
    }

    return colors.primary;
  }, [color, colors.primary]);
  return (
    <View>
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
      <Box horizontal>
        <Box
          marginRight="s"
          style={{
            borderWidth: 2.2,
            backgroundColor: selected ? tint : undefined,
            borderColor: selected ? tint : colors.gray,
            borderRadius: spacing.s,
            height: spacing.l,
            width: spacing.l,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selected && <Entypo name="check" color={"white"} size={spacing.m} />}
        </Box>
        <Placeholder {...props} />
      </Box>
    </View>
  );
}
