import { Stack } from "expo-router";
import { View } from "react-native";
import { Button, useReload } from "expo-helpers";
export default function ReloadPage() {
  const { loading, setLoading } = useReload();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          title: "Reload",
        }}
      />
      <Button
        title="reload"
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      />
    </View>
  );
}
