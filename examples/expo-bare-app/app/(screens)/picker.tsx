import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Picker, useStyles } from "expo-helpers";
export default function () {
  const { spacing } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Picker" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.m }}
      >
        <Picker
          title="Picker"
          placeholder="placeholder"
          values={{
            sunrise: { text: "Sunrise", color: "#FFA500" },
            ocean: { text: "Ocean", color: "#1E90FF" },
            forest: { text: "Forest", color: "#228B22" },
            sunset: { text: "Sunset", color: "#FF4500" },
            mountain: { text: "Mountain", color: "#A9A9A9" },
            simpleString: "Just a simple string value",
            sky: { text: "Sky", color: "#87CEEB" },
            desert: { text: "Desert", color: "#EDC9AF" },
            city: { text: "City at Night", color: "#2F4F4F" },
            space: { text: "Outer Space", color: "#000000" },
          }}
        />
      </ScrollView>
    </>
  );
}
