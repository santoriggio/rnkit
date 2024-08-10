import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MenuListProps } from "../types";
import Text from "./Text";
import { useMemo } from "react";
import { useStyles } from "../hooks";
import Icon from "./Icon";
import { triggerAction } from "../utils";
import { useRawSpacingProps } from "../hooks/useSpacingProps";

export default function ButtonsList({
  list,
  //@ts-ignore
  variant = Platform.OS,
  border,
  style,
  ...props
}: MenuListProps) {
  const { spacing, colors, fontSize, radius } = useStyles();
  const spacingProps = useRawSpacingProps(props);
  const customStyle = useMemo(() => {
    const ios = StyleSheet.create({
      container: {
        borderRadius: radius.get("m"),
        backgroundColor: colors.background,
        borderWidth: border ? 1 : 0,
        borderColor: colors.border,
        ...spacingProps,
        ...style,
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
      container: {
        ...spacingProps,
        ...style,
      },
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
  }, [spacing, colors, radius, style, border, variant, spacingProps]);
  return (
    <View style={customStyle.container}>
      {list.map((item, _) => {
        const { loading, component } = item;
        const renderRight = () => {
          if (loading) {
            return <ActivityIndicator size={"small"} color={colors.gray} />;
          }

          if (component) {
            return component(item);
          }

          if (variant === "ios") {
            return (
              <Icon
                name="chevron-right"
                color={colors.gray}
                size={fontSize.get("l")}
              />
            );
          }

          return null;
        };
        const handlePress = () => {
          triggerAction(item.onPress);
        };
        return (
          <TouchableOpacity
            key={_}
            style={customStyle.itemContainer}
            onPress={handlePress}
            activeOpacity={0.8}
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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text size={variant === "android" && "l"}>{item.title}</Text>
                {item.subtitle && (
                  <Text color={colors.gray}>{item.subtitle}</Text>
                )}
              </View>
              {renderRight()}
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: 1,
                backgroundColor: colors.border,
                left: spacing.get("5xl"),
                right: 0,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
