import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MenuListProps } from "../types";
import Text from "./Text";
import { useMemo } from "react";
import { useStyles } from "../hooks";
import Icon from "./Icon";
import { triggerAction } from "../utils";

export default function ButtonsList({
  list,
  variant = "android",
}: MenuListProps) {
  const { spacing, colors, fontSize, radius } = useStyles();
  const customStyle = useMemo(() => {
    const ios = StyleSheet.create({
      container: {
        backgroundColor: colors.background,
      },
      itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.get("xs"),
        paddingHorizontal: spacing.get("s"),
      },
      icon: {},
      iconContainer: {
        borderRadius: radius.get("xs"),
        height: spacing.get("3xl"),
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: spacing.get("s"),
      },
    });
    const android = StyleSheet.create({
      container: {},
      itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.get("m"),
        paddingHorizontal: spacing.get("l"),
      },
      iconContainer: {
        marginRight: spacing.get("m"),
      },
    });
    const styles = {
      ios,
      android,
    };

    return styles[variant];
  }, [spacing, colors, radius, variant]);
  return (
    <View style={customStyle.container}>
      {list.map((item, _) => {
        const handlePress = () => {
          triggerAction(item.onPress);
        };
        return (
          <TouchableOpacity
            key={_}
            style={customStyle.itemContainer}
            onPress={handlePress}
          >
            <View
              style={[
                customStyle.iconContainer,
                { backgroundColor: variant === "ios" ? item.color : undefined },
              ]}
            >
              <Icon
                name={item.icon}
                size={variant === "ios" ? fontSize.get("l") : undefined}
                color={variant === "ios" ? "white" : undefined}
              />
            </View>
            <Text size={variant === "android" && "l"}>{item.title}</Text>
            {item.subtitle && <Text color={colors.gray}>{item.subtitle}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
