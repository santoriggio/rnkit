import { View } from "react-native";
import { useStyles } from "../hooks";
import { ReactNode, useMemo } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRawSpacingProps } from "../hooks/useSpacingProps";
import { SpacingProps } from "../types";
type CheckboxProps = {
  /*
   * @default primary
   * */
  color?: string;
  selected: boolean;
  title?: string;
  placeholder?: string | ((props: CheckboxProps) => ReactNode);
  required?: boolean;
} & SpacingProps;
// function Placeholder(props: CheckboxProps) {
//   if (typeof props.placeholder === "undefined") return null;
//
//   if (typeof props.placeholder === "string") {
//     return (
//       <Text numberOfLines={1} marginLeft="s">
//         {props.placeholder}
//       </Text>
//     );
//   }
//   if (typeof props.placeholder === "function") {
//     return props.placeholder(props);
//   }
//   return null;
// }
export default function Checkbox({
  selected,
  color,
  // required = true,
  ...props
}: CheckboxProps) {
  const { colors, spacing } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const tint = useMemo(() => {
    if (color) {
      return color;
    }

    return colors.primary;
  }, [color, colors.primary]);
  return (
    <View
      style={{
        borderWidth: 2.2,
        backgroundColor: selected ? tint : colors.card,
        borderColor: selected ? tint : colors.border,
        borderRadius: spacing.get("xs"),
        height: spacing.get("xl"),
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        ...spacingProps,
      }}
    >
      {selected && (
        <Entypo name="check" color="white" size={spacing.get("l")} />
      )}
    </View>
  );
}

/*
 
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
      <Box horizontal style={styles.placeholderContainer}>
        <Box
          marginRight="s"
          style={{
            borderWidth: 2.2,
            backgroundColor: selected ? tint : undefined,
            borderColor: selected ? tint : colors.gray,
            borderRadius: getSpacingSize("xs"),
            height: getSpacingSize("l"),
            width: getSpacingSize("l"),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selected && (
            <Entypo name="check" color={"white"} size={getSpacingSize("m")} />
          )}
        </Box>
        <Placeholder {...props} />
      </Box>
    </View>
  );
 *
 *
 * */
