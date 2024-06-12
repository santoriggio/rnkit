import { Stack } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { Checkbox, useStyles, Text } from "expo-helpers";
import { useState } from "react";
export default function () {
  const [selected, setSelected] = useState<boolean>(false);
  const { getSpacingSize } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Checkbox" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: getSpacingSize('m') }}
      >
        <Pressable
          onPress={() => {
            setSelected((prev) => !prev);
          }}
        >
          <Checkbox
            title="Title"
            placeholder={(props) => {
              return (
                <Text
                  onPress={() => {
                    alert("Pressed");
                  }}
                  style={{ textDecorationLine: "underline" }}
                >
                  {props.title}
                </Text>
              );
            }}
            selected={selected}
          />
        </Pressable>
      </ScrollView>
    </>
  );
}
