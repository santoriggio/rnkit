import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertProps,
  AlertMethods,
  AlertButton,
  AlertShowParams,
  AlertMenuButton,
  AlertManager,
  TOAST_DURATION,
} from "../types";
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FullWindowOverlay } from "react-native-screens";
import {
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
  Pressable,
  Keyboard,
} from "react-native";
import { useStyles } from "../hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import isComplexIcon from "../utils/isComplexIcon";
import Icon from "./Icon";
import Text from "./Text";
import Button from "./Button";
import { triggerAction } from "../utils";

export default function AlertProvider({
  toastDuration = TOAST_DURATION,
  delay,
  hideKeyboardOnOpen = true,
}: AlertProps) {
  const { height } = useWindowDimensions();
  const { spacing, colors, fontSize } = useStyles();
  const stack = useRef<any[]>([]);
  const isOpen = useRef<boolean>(false);
  const [modal, setModal] = useState<any>({});
  const bottomsheet = useRef<BottomSheetModal>(null);

  const is_toast = modal.type === "toast";

  const show = (props: AlertShowParams) => {
    if (!props) return;

    if (isOpen.current) {
      stack.current = [props, ...stack.current];
      return;
    }

    if (hideKeyboardOnOpen && Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    setModal(props);
    isOpen.current = true;

    if (props.delay || delay) {
      // If delay is used the bottomsheet should expand after that delay
      setTimeout(() => {
        bottomsheet.current.present();
      }, props.delay || delay);
    } else {
      bottomsheet.current.present();
    }

    if (props.type === "toast") {
      setTimeout(() => {
        hide();
      }, props.duration || toastDuration);
    }
  };

  const hide = () => {
    const HIDE_DURARION = 500;
    bottomsheet.current.dismiss({
      duration: HIDE_DURARION,
    });

    setTimeout(() => {
      isOpen.current = false;

      if (stack.current.length > 0) {
        const last = stack.current.pop();
        show(last);
      }
    }, HIDE_DURARION + 100);
  };

  const ref = useRef<AlertMethods>({
    show,
    hide,
  });

  const onPressToast = () => {
    if (modal.type !== "toast") return;

    if (modal.onPress) {
      triggerAction(modal.onPress);
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
  const renderToastIcon = useCallback(() => {
    if (modal.type !== "toast") return null;

    const icons = {
      info: "information-circle-outline",
      warning: "warning-outline",
      danger: "close-circle",
      success: "checkmark-circle-outline",
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
    <BottomSheetModal
      ref={bottomsheet}
      enableDynamicSizing
      enablePanDownToClose
      maxDynamicContentSize={height * 0.7}
      backdropComponent={is_toast ? undefined : renderBackdrop}
      // @ts-ignore
      containerComponent={FullWindowOverlay}
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
            {renderToastIcon()}
            <View style={{ marginLeft: spacing.get("m") }}>
              <Text bold size="xl" numberOfLines={1} color="white">
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
          <Text
            bold
            size="xl"
            numberOfLines={1}
            marginLeft="l"
            marginTop="m"
            marginBottom="m"
            color={colors.text}
          >
            {modal.title}
          </Text>
          {modal.buttons.map((button: AlertMenuButton, _: number) => {
            const { hideOnPress = true } = button;
            const renderIcon = () => {
              if (typeof button.icon === "string") {
                return (
                  <Icon
                    marginRight="m"
                    color={colors.text}
                    name={button.icon}
                  />
                );
              }

              if (isComplexIcon(button.icon)) {
                return (
                  <Icon marginRight="m" color={colors.text} {...button.icon} />
                );
              }

              return null;
            };
            return (
              <TouchableOpacity
                key={_}
                onPress={() => {
                  if (hideOnPress) {
                    hide();
                  }
                  triggerAction(button.onPress);
                }}
                activeOpacity={0.8}
                style={{
                  padding: spacing.get("m"),
                  paddingHorizontal: spacing.get("l"),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {button.icon && renderIcon()}
                <Text color={colors.text} {...button.titleProps}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BottomSheetView>
      )}
      {modal.type === "alert" && (
        <BottomSheetView style={{ paddingBottom: spacing.get("2xl") }}>
          <View style={{ paddingHorizontal: spacing.get("m") }}>
            <Text
              bold
              size="xl"
              numberOfLines={1}
              marginTop="m"
              color={colors.text}
              style={{ textAlign: "center" }}
            >
              {modal.title}
            </Text>
            <Text
              marginTop="s"
              color={colors.text}
              style={{
                textAlign: "center",
                lineHeight: fontSize.get("m") * 1.3,
              }}
            >
              {modal.message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: spacing.get("m") / 2,
            }}
          >
            {modal.buttons.map((button: AlertButton, _: number) => {
              const {
                hideOnPress = true,
                type = "plain",
                role = "info",
              } = button;
              return (
                <Button
                  key={_}
                  role={role}
                  type={type}
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
    </BottomSheetModal>
  );
}

const Alert = new AlertManager();
export { Alert };
