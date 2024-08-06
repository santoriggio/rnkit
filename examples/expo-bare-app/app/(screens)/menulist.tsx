import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { MenuList } from "expo-helpers";
export default function MenuListPage() {
  return (
    <>
      <Stack.Screen options={{ title: "MenuList" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MenuList
          list={[
            { title: "Settings", icon: "cog", color: "red" },
            {
              title: "Notifications",
              icon: "bell",
              color: "green",
              onPress: {
                action: "alert",
                params: { type: "toast", title: "AAA", message: "BBB", role:'info', },
              },
            },
          ]}
        />
      </ScrollView>
    </>
  );
}
