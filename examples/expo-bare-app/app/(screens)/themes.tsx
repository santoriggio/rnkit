import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Button, Text, config, useStyles, useTheme } from "expo-helpers";
export default function () {
  const { colors, spacing } = useStyles();
  const { setTheme } = useTheme();
  const themes = config.getProperty("themes");
  return (
    <>
      <Stack.Screen options={{ title: "Theme" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.m }}
      >
        {Object.keys(colors).map((color_key) => {
          const color = colors[color_key];
          return (
            <Text key={color_key}>
              {color_key}: {JSON.stringify(color)}
            </Text>
          );
        })}
        <Button
          title="automatic"
          marginTop="m"
          onPress={() => {
            setTheme(null);
          }}
        />
        {Object.keys(themes).map((theme_key) => {
          // const theme = themes[theme_key];
          return (
            <Button
              key={theme_key}
              title={theme_key}
              marginTop="m"
              onPress={() => {
                setTheme(theme_key);
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
