import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "expo-helpers";
export default function () {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Text",
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text size="xs">Text</Text>
        <Text size="s">Text</Text>
        <Text size="m">Text</Text>
        <Text size="l">Text</Text>
        <Text size="xl">Text</Text>
        <Text size="2xl">Text</Text>
        <Text size="3xl">Text</Text>
      </ScrollView>
    </>
  );
}
