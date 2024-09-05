import { Text, i18n } from "expo-helpers";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function() {
  return (
    <>
      <Stack.Screen options={{ title: "i18n" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
      >
        <Text>{i18n.locale}</Text>
        <Text>{i18n.t("greetings")}</Text>
        <Text>{i18n.t("nested.key")}</Text>
        <Text>{i18n.t("numbers", { count: 1 })}</Text>
        <Text>{i18n.t('greetings_name', {name:'Santo'})}</Text>
        <Text>{i18n.t('greetings_nested_name.formal', {name:'Santo'})}</Text>
        <Text>{i18n.t('greetings_nested_name.friends', {name:'Santo'})}</Text>
      </ScrollView>
    </>
  );
}
