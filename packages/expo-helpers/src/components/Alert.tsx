import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertProps,
  AlertMethods,
  AlertButton,
  AlertShowParams,
  AlertManager,
  AlertMenuButton,
  TOAST_DURATION,
} from "../types";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { FullWindowOverlay } from "react-native-screens";

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

export default function AlertProvider({
  toastDuration = TOAST_DURATION,
}: AlertProps) {
  const { height } = useWindowDimensions();
  const { spacing, colors, fontSize } = useStyles();
  const [modal, setModal] = useState<any>({});
  const bottomsheet = useRef<BottomSheet>(null);

  const is_toast = modal.type === "toast";

  const show = (props: AlertShowParams) => {
    setModal(props);
    bottomsheet.current.expand();

    if (props.type === "toast") {
      setTimeout(() => {
        hide();
      }, props.duration || toastDuration);
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
  }, [modal.type, fontSize, modal.role]);

  return (
    <BottomSheet
      ref={bottomsheet}
      enableDynamicSizing
      enablePanDownToClose
      maxDynamicContentSize={height * 0.7}
      backdropComponent={is_toast ? undefined : renderBackdrop}
      // @ts-ignore
      containerComponent={Platform.OS === "ios" ? FullWindowOverlay : undefined}
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
          {modal.buttons.map((button: AlertMenuButton, _) => {
            const { hideOnPress = true } = button;
            return (
              <TouchableOpacity
                key={_}
                onPress={() => {
                  if (hideOnPress) {
                    hide();
                  }
                }}
                activeOpacity={0.8}
                style={{
                  padding: spacing.get("m"),
                }}
              >
                <Text {...button.titleProps}>{button.title}</Text>
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
            {modal.buttons.map((button: AlertButton, _: number) => {
              const { hideOnPress = true } = button;
              return (
                <Button
                  key={_}
                  {...button}
                  style={{ flex: 1, margin: spacing.get("m") / 2 }}
                  onPress={() => {
                    if (typeof button.onPress === "function") {
                      button.onPress();
                    }
                    if (hideOnPress) {
                      hide();
                    }
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
