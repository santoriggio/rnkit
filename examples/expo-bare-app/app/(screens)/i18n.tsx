import { Text, i18n } from "expo-helpers";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function () {
  return (
    <>
      <Stack.Screen options={{ title: "i18n" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
      >
        <Text>{i18n.locale}</Text>
        <Text>{i18n.t("greetings")}</Text>
      </ScrollView>
    </>
  );
}
