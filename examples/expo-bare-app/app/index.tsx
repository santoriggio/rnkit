import { Box, Text, useStyles } from "expo-helpers";
import { Stack, router } from "expo-router";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
type Screen = {
  screenName: string;
  title: string;
};
type Separator = {
  title?: string;
  separator: true;
};
const screens: (Screen | Separator)[] = [
  {
    separator: true,
    title: "Components",
  },
  {
    screenName: "box",
    title: "📦 Box",
  },
  {
    screenName: "text",
    title: "📘 Text",
  },
  {
    screenName: "button",
    title: "🕹️ Button",
  },
  {
    screenName: "textinput",
    title: "⌨️ TextInput",
  },
  {
    screenName: "picker",
    title: "🪝 Picker",
  },
  {
    screenName: "checkbox",
    title: "✔️ Checkbox",
  },
  {
    separator: true,
    title: "Utils",
  },
  {
    screenName: "i18n",
    title: "🎭 i18n",
  },
  {
    screenName: "themes",
    title: "🤹 Themes",
  },
  {
    screenName: "formatdate",
    title: "🗓️ FormatDate",
  },
];

function isSeparator(component: any): component is Separator {
  return typeof component.separator === "boolean" && component.separator;
}

export default function Page() {
  const { colors } = useStyles();
  const renderItem: ListRenderItem<Screen | Separator> = ({ item }) => {
    const is_separator = isSeparator(item);
    return (
      <Box
        padding="m"
        backgroundColor={colors.background}
        disabled={is_separator}
        onPress={() => {
          if (is_separator) {
            return;
          }

          router.push(item.screenName);
        }}
      >
        <Text bold={is_separator}>{item.title}</Text>
      </Box>
    );
  };
  return (
    <>
      <Stack.Screen options={{ title: "Expo-helpers" }} />
      <FlatList
        data={screens}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        ItemSeparatorComponent={() => {
          return (
            <Box backgroundColor={colors.border} style={styles.separator} />
          );
        }}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
  },
  separator: {
    height: 1,
  },
});
