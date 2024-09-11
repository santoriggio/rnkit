import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { MenuList, Text } from "expo-helpers";
export default function MenuListPage() {
  return (
    <>
      <Stack.Screen options={{ title: "MenuList" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MenuList
          border
          variant="ios"
          marginHorizontal='m'
          list={[
            {
              title: "Settings",
              icon: "cog",
              color: "red",
              right: (item) => {
                return <Text>IT</Text>;
              },
            },
            {
              title: "Notifications",
              icon: "bell",
              loading: true,
              color: "green",
              onPress: {
                action: "alert",
                params: {
                  type: "toast",
                  title: "AAA",
                  message: "BBB",
                  role: "info",
                },
              },
            },
          ]}
        />
        <MenuList
          variant="android"
          marginTop="m"
          marginHorizontal="s"
          list={[
            { title: "Settings", icon: "cog", color: "red" },
            {
              title: "Notifications",
              icon: "bell",
              color: "green",
              onPress: {
                action: "alert",
                params: {
                  type: "toast",
                  title: "AAA",
                  message: "BBB",
                  role: "info",
                },
              },
            },
          ]}
        />
      </ScrollView>
    </>
  );
}
