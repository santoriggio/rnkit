import { Linking } from "react-native";
import { Alert } from "../components/Alert";
import { Press } from "../types";

export default function triggerAction(action: Press) {
  if (typeof action === "undefined" || action === null) return;

  if (typeof action === "function") return action();

  if (action.action === "link") {
    return Linking.openURL(action.link);
  }

  if (action.action === "alert") {
    return Alert.show(action.params);
  }
}
