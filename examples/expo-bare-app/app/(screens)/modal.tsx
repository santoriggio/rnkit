import { Stack } from "expo-router";
import { Alert, Button } from "expo-helpers";

export default function Modal() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Modal",
        }}
      />
      <Button
        title="Show Alert"
        onPress={() => {
          Alert.alert({
            title: "Alert title",
            message: "Alert message",
          });
        }}
      />
    </>
  );
}
