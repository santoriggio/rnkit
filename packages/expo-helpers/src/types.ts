import {
  TextStyle,
  ViewStyle,
  TextProps as RNTextProps,
  TouchableOpacityProps,
  KeyboardType,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Feather,
  Foundation,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const sizes = {
  xs: null,
  s: null,
  m: null,
  l: null,
  xl: null,
};
export const spacingProps = {
  //margin
  margin: null,
  marginBottom: null,
  marginTop: null,
  marginLeft: null,
  marginRight: null,
  marginHorizontal: null,
  marginVertical: null,
  //spacing
  padding: null,
  paddingBottom: null,
  paddingTop: null,
  paddingLeft: null,
  paddingRight: null,
  paddingHorizontal: null,
  paddingVertical: null,
  //radius
};
export type Size = keyof typeof sizes;
export type Role = "primary" | "danger" | "info" | "warning" | "success";

export type Colors = {
  primary: string;
  secondary: string;
  info: string;
  warning: string;
  success: string;
  danger: string;
  link: string;
  gray: string;
};

export const TOAST_DURATION = 1500;
export class AlertManager {
  private ref: AlertMethods;
  public register(ref: AlertMethods) {
    this.ref = ref;
  }

  public toast({
    title,
    message,
    role = "info",
    duration = TOAST_DURATION,
    ...params
  }: AlertToastOptions) {
    this.ref.show({
      type: "toast",
      title,
      message,
      role,
      duration,
      ...params,
    });
  }
  public menu({ title, buttons, ...params }: AlertMenuOptions) {
    return this.ref.show({
      type: "menu",
      title,
      buttons,
      ...params,
    });
  }
  public alert({
    title,
    message,
    buttons = [{ title: "Ok", type: "plain", onPress: () => {} }],
    ...params
  }: AlertOptions) {
    return this.ref.show({
      type: "alert",
      title,
      message,
      buttons,
      ...params,
    });
  }

  public hide() {
    return this.ref.hide();
  }

  public show(params: AlertShowParams) {
    if (params.type === "toast") {
      return this.ref.show({
        ...params,
        type: "toast",
      });
    }
    return this.ref.show(params);
  }
}
export type SpacingSizeKey = Size | (string & {});
//TODO: add types
export type Theme = {
  isDark: boolean;
  text: string;
  card: string;
  background: string;
  border: string;
} & Partial<Colors>;

export type IconProps = {
  name: string;
  family?: keyof typeof iconFamilies;
  size?: number;
  color?: string;
  style?: TextStyle;
  onPress?: Press;
  onLongPress?: Press;
};

export const iconFamilies = {
  FontAwesome,
  Ionicons,
  Feather,
  Foundation,
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
};

export type ComplexIconProps = {
  position?: "left" | "right";
} & IconProps;

export type ButtonProps = {
  title?: string;
  onPress: Press;
  onLongPress?: Press;
  delayLongPress?: number;
  icon?: string | ComplexIconProps;
  role?: Role;
  type?: "plain" | "filled" | "gray" | "tinted";
  active?: boolean;
  loading?: boolean;
  textColor?: string;
  style?: ViewStyle;
} & SpacingProps;

export type SpacingProps = Partial<
  Record<keyof typeof spacingProps, SpacingSizeKey>
>;

export type TextProps = {
  color?: string;
  size?: Size | (string & {});
  bold?: boolean;
} & SpacingProps &
  RNTextProps;

export type AlertMenuButton = {
  icon?: string | Omit<ComplexIconProps, "position">;
  title: string;
  subtitle?: string;
  titleProps?: TextProps;
  onPress: Press;
  /**
   * @default true
   */
  hideOnPress?: boolean;
};
export type AlertMenuOptions = {
  title: string;
  delay?: number;
  buttons: AlertMenuButton[];
};
export type AlertToastOptions = {
  title: string;
  message: string;
  /*
   * @default primary
   */
  role?: Extract<Role, "info" | "danger" | "warning" | "success">;
  /*
   * Duration in milliseconds
   * @default 1500
   */
  duration?: number;
  link?: string;
  delay?: number;
};

export type AlertButton = ButtonProps & Pick<AlertMenuButton, "hideOnPress">;

type AlertWithType<C, Type extends string> = C & { type: Type };

export type AlertOptions = {
  title: string;
  delay?: number;
  message: string;
  buttons?: AlertButton[];
};

export type AlertProps = {
  toastDuration?: number;
  delay?: number;
};
export type AlertShowParams =
  | AlertWithType<AlertToastOptions, "toast">
  | AlertWithType<AlertOptions, "alert">
  | AlertWithType<AlertMenuOptions, "menu">;

export type AlertMethods = {
  hide: () => void;
  show: (params: AlertShowParams) => void;
};

export type VoidPress = () => void;
export type ActionPressLink = {
  action: "link";
  link: string;
};
export type ActionPressAlert = {
  action: "alert";
  params: AlertShowParams;
};
export type ActionPress = ActionPressLink | ActionPressAlert;
export type Press = VoidPress | ActionPress;

export type InputProps = {
  initialValue?: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
  onChangeText: (text: string) => void;
  debounce?: number;
  icon?: string | ComplexIconProps;
  style?: ViewStyle;
  type?: "text" | "number" | "email" | "password" | "phone";
  keyboardType?: KeyboardType;
} & SpacingProps;

export type BoxProps = {
  backgroundColor?: string;
  horizontal?: boolean;
} & SpacingProps &
  TouchableOpacityProps;

type MenuItem = {
  title: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  onPress?: Press;
  loading?: boolean;
  component?: (item: MenuItem) => JSX.Element;
};

export type MenuListProps = {
  list: MenuItem[];
  variant?: "ios" | "android";
  style?: ViewStyle;
  /**
   * @ios only
   */
  border?: boolean;
} & SpacingProps;
