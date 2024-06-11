import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text, formatDate } from "expo-helpers";
export default function () {
  const date = new Date();
  return (
    <>
      <Stack.Screen options={{ title: "Format date" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>LT: {formatDate("LT", date)}</Text>
        <Text>LTS: {formatDate("LTS", date)}</Text>
        <Text>L: {formatDate("L", date)}</Text>

        <Text>lL: {formatDate("lL", date)}</Text>
        <Text>LL: {formatDate("LL", date)}</Text>
        <Text>LLL: {formatDate("LLL", date)}</Text>
        <Text>LLLL: {formatDate("LLLL", date)}</Text>
      </ScrollView>
    </>
  );
}
