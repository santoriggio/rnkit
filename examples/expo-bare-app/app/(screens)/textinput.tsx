import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { TextInput } from "expo-helpers";
export default function () {
  return (
    <>
      <Stack.Screen options={{ title: "TextInput" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TextInput placeholder="Write here..." />
      </ScrollView>
    </>
  );
}
