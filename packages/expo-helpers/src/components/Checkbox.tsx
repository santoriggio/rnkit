import { View } from "react-native";
import { useStyles } from "../hooks";
import { useMemo } from "react";
import { Entypo } from "@expo/vector-icons";
type CheckboxProps = {
  /*
   * @default primary
   * */
  color?: string;
  selected: boolean;
};
export default function Checkbox(props: CheckboxProps) {
  const { selected, color } = props;
  const { colors, spacing } = useStyles();

  const tint = useMemo(() => {
    if (color) {
      return color;
    }

    return colors.primary;
  }, [color, colors.primary, selected]);

  return (
    <View
      style={{
        borderWidth: 2.2,
        backgroundColor: selected ? tint : undefined,
        borderColor: selected ? tint : colors.gray,
        borderRadius: spacing.s,
        height: spacing.l,
        width: spacing.l,
      }}
    >
      {selected && <Entypo name="check" color={"white"} size={12} />}
    </View>
  );
}
