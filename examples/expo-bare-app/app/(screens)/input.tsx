import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Input, useStyles } from "expo-helpers";
import { useState } from "react";
export default function() {
  const { spacing } = useStyles();
  const [inputValue, setInputValue] = useState<string>("ciao");
  return (
    <>
      <Stack.Screen options={{ title: "Input" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.get("m") }}
      >
        <Input
          initialValue={inputValue}
          title="Title"
          onChangeText={(text) => {
            console.log(text);
          }}
        />
        <Input
          title="Input with debounce"
          onChangeText={(text) => {
            console.log(text);
          }}
          debounce={300}
        />
        <Input
          title="Very long title, sooooo long that cant fit"
          required
          onChangeText={(text) => {
            console.log(text);
          }}
        />
      </ScrollView>
    </>
  );
}
