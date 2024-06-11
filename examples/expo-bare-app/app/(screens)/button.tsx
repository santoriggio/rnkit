import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Box, Button, ButtonProps, Text, useStyles } from "expo-helpers";
const getIcon = (role: ButtonProps["role"]) => {
  switch (role) {
    case "primary":
      return "🥇";
    case "info":
      return "ℹ️";
    case "danger":
      return "‼️";
    case "warning":
      return "⚠️";
    case "success":
      return "✅";
  }
};
const renderButtons = (role: ButtonProps["role"] = "primary") => {
  return (
    <Box marginBottom="m">
      <Text bold marginBottom="m">
        {role}
      </Text>
      <Box horizontal style={{ justifyContent: "space-around" }}>
        <Button
          role={role}
          type="plain"
          title={getIcon(role)}
          onPress={() => {}}
          margin="m"
          style={{ flex: 1 }}
        />
        <Button
          role={role}
          type="gray"
          title={getIcon(role)}
          onPress={() => {}}
          margin="m"
          style={{ flex: 1 }}
        />
        <Button
          role={role}
          type="tinted"
          title={getIcon(role)}
          onPress={() => {}}
          margin="m"
          style={{ flex: 1 }}
        />
        <Button
          role={role}
          title={getIcon(role)}
          onPress={() => {}}
          margin="m"
          style={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};
export default function () {
  const { spacing } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Button" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.m }}
      >
        <Box horizontal marginBottom="xl">
          <Text bold style={{ flex: 1, textAlign: "center" }}>
            Plain
          </Text>
          <Text bold style={{ flex: 1, textAlign: "center" }}>
            Gray
          </Text>
          <Text bold style={{ flex: 1, textAlign: "center" }}>
            Tinted
          </Text>
          <Text bold style={{ flex: 1, textAlign: "center" }}>
            Filled
          </Text>
        </Box>
        {renderButtons("primary")}
        {renderButtons("info")}
        {renderButtons("danger")}
        {renderButtons("warning")}
        {renderButtons("success")}
      </ScrollView>
    </>
  );
}
