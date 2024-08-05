import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Input, useStyles } from "expo-helpers";
import { useState } from "react";
export default function () {
  const { spacing } = useStyles();
  const [inputValue, setInputValue] = useState<string>("ciao");
  return (
    <>
      <Stack.Screen options={{ title: "Input" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          gap: spacing.get("m"),
          padding: spacing.get("m"),
        }}
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
        <Input title="Input with icon on left" icon="email" />
        <Input
          title="Input with icon on right"
          icon={{ name: "email", position: "right" }}
        />
        <Input title="Input with type password" type="password" />
        <Input title="Input with type email" type="email" />
      </ScrollView>
    </>
  );
}
