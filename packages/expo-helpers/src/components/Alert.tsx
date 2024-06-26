import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertProps,
  AlertMethods,
  AlertOptions,
  Role,
  AlertMenuOptions,
  ButtonProps,
} from "../types";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import Text from "./Text";
import {
  View,
  Platform,
  useWindowDimensions,
  Pressable,
  Linking,
} from "react-native";
import { useStyles } from "../hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "./Button";
type ToastOptions = {
  title: string;
  message: string;
  /*
   * @default primary
   */
  role?: Extract<Role, "info" | "danger" | "warning">;
  /*
   * Duration in milliseconds
   * @default 1500
   */
  duration?: number;
  link?: string;
};
class AlertManager {
  private ref: AlertMethods;
  public register(ref: AlertMethods) {
    this.ref = ref;
  }

  public toast({
    title,
    message,
    role = "info",
    duration = 1500,
    ...params
  }: ToastOptions) {
    this.ref.show({
      type: "toast",
      title,
      message,
      role,
      duration,
      ...params,
    });
  }
  public menu({ title, buttons }: AlertMenuOptions) {
    return this.ref.show({
      type: "menu",
      title,
      buttons,
    });
  }
  public alert({
    title,
    message,
    buttons = [{ title: "Ok", type: "plain", onPress: () => {} }],
  }: AlertOptions) {
    return this.ref.show({
      type: "alert",
      title,
      message,
      buttons,
    });
  }
}

export default function AlertProvider({}: AlertProps) {
  const { height } = useWindowDimensions();
  const { spacing, colors, fontSize } = useStyles();
  const [modal, setModal] = useState<any>({});
  const bottomsheet = useRef<BottomSheet>(null);

  const is_toast = modal.type === "toast";

  const show = (props: any) => {
    setModal(props);
    bottomsheet.current.expand();

    if (props.type === "toast") {
      setTimeout(() => {
        hide();
      }, props.duration);
    }
  };

  const hide = () => {
    bottomsheet.current.close();
  };

  const ref = useRef<AlertMethods>({
    show,
    hide,
  });

  const onPressToast = () => {
    if (modal.type !== "toast") return;

    if (modal.link) {
      Linking.openURL(modal.link);
    }

    return hide();
  };
  useEffect(() => {
    Alert.register(ref.current);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        onPress={hide}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const renderIcon = useCallback(() => {
    if (modal.type !== "toast") return null;

    const icons = {
      info: "information-circle-outline",
      warning: "warning-outline",
      danger: "close-circle",
    };

    return (
      <Ionicons
        name={icons[modal.role]}
        size={fontSize.get("xl")}
        color="white"
      />
    );
  }, [modal.type, modal.role]);

  return (
    <BottomSheet
      ref={bottomsheet}
      enableDynamicSizing
      enablePanDownToClose
      maxDynamicContentSize={height * 0.7}
      backdropComponent={is_toast ? undefined : renderBackdrop}
      enableOverDrag={Platform.select({
        ios: true,
        android: is_toast,
      })}
      detached
      handleComponent={is_toast ? null : undefined}
      backgroundStyle={{
        backgroundColor: is_toast ? colors[modal.role] : colors.background,
      }}
      style={{
        marginHorizontal: is_toast ? spacing.get("m") : 0,
      }}
      bottomInset={is_toast ? spacing.get("3xl") : 0}
    >
      {modal.type === "toast" && (
        <BottomSheetView>
          <Pressable
            onPress={onPressToast}
            style={{
              padding: spacing.get("m"),
              paddingBottom: spacing.get("m"),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderIcon()}
            <View style={{ marginLeft: spacing.get("m") }}>
              <Text bold size="l" numberOfLines={1} color="white">
                {modal.title}
              </Text>
              <Text color="white" numberOfLines={2}>
                {modal.message}
              </Text>
            </View>
          </Pressable>
        </BottomSheetView>
      )}
      {modal.type === "menu" && (
        <BottomSheetView
          style={{
            paddingBottom: spacing.get("2xl"),
          }}
        >
          <Text bold size="l" numberOfLines={1} marginLeft="m" marginBottom="m">
            {modal.title}
          </Text>
          {modal.buttons.map((button, _) => {
            return (
              <TouchableOpacity
                key={_}
                onPress={button.onPress}
                activeOpacity={0.8}
                style={{
                  padding: spacing.get("m"),
                }}
              >
                <Text>{button.title}</Text>
              </TouchableOpacity>
            );
          })}
        </BottomSheetView>
      )}
      {modal.type === "alert" && (
        <BottomSheetView style={{ paddingBottom: spacing.get("2xl") }}>
          <Text
            bold
            size="l"
            numberOfLines={1}
            marginTop="s"
            style={{ textAlign: "center" }}
          >
            {modal.title}
          </Text>
          <Text style={{ textAlign: "center" }}>{modal.message}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: spacing.get("m") / 2,
            }}
          >
            {modal.buttons.map((button: ButtonProps, _: number) => {
              return (
                <Button
                  key={_}
                  {...button}
                  style={{ flex: 1, margin: spacing.get("m") / 2 }}
                  onPress={() => {
                    if (typeof button.onPress === "function") {
                      button.onPress();
                    }
                    hide();
                  }}
                />
              );
            })}
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}

const Alert = new AlertManager();
export { Alert };
