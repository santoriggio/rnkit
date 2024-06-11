import { ScrollView } from "react-native";
import { Text, Box } from "expo-helpers";
import { Stack } from "expo-router";
export default function () {
  return (
    <>
      <Stack.Screen options={{ title: "Box" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Box backgroundColor={"red"}>
          <Text>Red box</Text>
        </Box>
      </ScrollView>
    </>
  );
}
