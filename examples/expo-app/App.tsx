import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text, i18n } from "expo-helpers";
export default function App() {
  return (
    <View style={styles.container}>
      <Text bold>{i18n.locale}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
