import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Button, Alert, useStyles, Text } from "expo-helpers";
import { useState } from "react";
export default function() {
  const { spacing } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Alert" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.get("m") }}
      >
        <Button
          title="Info toast"
          marginBottom="m"
          role="info"
          onPress={() => {
            Alert.toast({
              title: "Title",
              message: "Message",
              link: "expo-bare-app://picker",
            });
          }}
        />
        <Button
          title="Menu"
          marginBottom="m"
          onPress={() => {
            Alert.menu({
              title: "Menu",
              buttons: [
                {
                  title: "Button1",
                  onPress: () => {
                    alert("Button1");
                  },
                },
              ],
            });
          }}
        />
        <Button
          title="Alert"
          marginBottom="m"
          onPress={() => {
            Alert.alert({
              title: "Alert",
              message: "This is an alert",
            });
          }}
        />
        <Button
          title="Alert with custom buttons"
          marginBottom="m"
          onPress={() => {
            Alert.alert({
              title: "Custom buttons",
              message: "This alert has custom buttons",
              buttons: [
                {
                  title: "Cancel",
                  role: "info",
                  onPress: () => { },
                },
                {
                  title: "Delete",
                  role: "danger",
                  onPress: () => { },
                },
              ],
            });
          }}
        />
      </ScrollView>
    </>
  );
}
