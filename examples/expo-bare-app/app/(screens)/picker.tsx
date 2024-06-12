import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Picker, useStyles } from "expo-helpers";
const values = {
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
};
export default function() {
  const { getSpacingSize } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Picker" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: getSpacingSize("m") }}
      >
        <Picker
          title="Picker"
          placeholder="Seleziona un elemento"
          values={values}
          marginBottom="m"
        />
        <Picker
          title="Picker limit=5"
          placeholder="Seleziona più elementi"
          limit={5}
          marginBottom="m"
          values={values}
        />

        <Picker
          title="Empty picker"
          placeholder="Seleziona più elementi"
          limit={5}
          values={{}}
        />
      </ScrollView>
    </>
  );
}
