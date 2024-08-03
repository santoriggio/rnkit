import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
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
          title="Alert"
          marginBottom="m"
          onPress={() => {
            Alert.alert({
              title: "Alert",
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum pharetra enim. Sed nulla purus, tincidunt sed mollis id, ultricies.",
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
        {MenuSection()}
      </ScrollView>
    </>
  );
}

function MenuSection() {
  return (
    <View>
      <Text bold size="xl" marginTop="m" marginBottom="m">
        Menu
      </Text>
      <Button
        title="Menu length=1"
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
        title="Menu length=3"
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
              {
                title: "Button2",
                onPress: () => {
                  alert("Button1");
                },
              },
              {
                title: "Button3",
                onPress: () => {
                  alert("Button1");
                },
              },
            ],
          });
        }}
      />
      <Button
        title="Menu with icons"
        marginBottom="s"
        onPress={() => {
          Alert.menu({
            title: "Menu with icons",
            buttons: [
              {
                title: "Button1",
                icon: "pencil",
                onPress: () => {
                  alert("Button1");
                },
              },
              {
                title: "Button2",
                icon: "share-social",
                onPress: () => {
                  alert("Button1");
                },
              },
              {
                title: "Button3",
                icon: {
                  name: "trash",
                  color: "red",
                },
                onPress: () => {
                  alert("Button1");
                },
              },
            ],
          });
        }}
      />
    </View>
  );
}
