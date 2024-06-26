import { ViewStyle } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

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
  //spacing
  padding: null,
  paddingBottom: null,
  paddingTop: null,
  paddingLeft: null,
  paddingRight: null,
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

export type SpacingSizeKey = Size | (string & {});
//TODO: add types
export type Theme = {
  isDark: boolean;
  text: string;
  card: string;
  background: string;
  border: string;
} & Partial<Colors>;

export type ButtonProps = {
  title?: string;
  onPress: () => void;
  icon?: string;
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

export type AlertMenuOptions = {
  title: string;
  buttons: {
    icon?: string;
    title: string;
    subtitle?: string;
    onPress: Press<any>;
  }[];
};
export type AlertOptions = {
  title: string;
  message: string;
  buttons?: Partial<ButtonProps>[];
};
export type AlertProps = {};
export type AlertShowParams = {};
export type AlertMethods = {
  show: (params: AlertShowParams) => void;
  hide: () => void;
};

type VoidPress<T> = (params: T) => void;
type ActionPressLink = {
  action: "link";
  link: string;
};
type ActionPressAlert = {
  action: "alert";
  type: "toast" | "menu";
  params: any;
};
type ActionPress = ActionPressLink | ActionPressAlert;
export type Press<T> = VoidPress<T> | ActionPress;

export type InputProps = {
  placeholder?: string;
  title?: string;
  required?: boolean;
  onChangeText: (text: string) => void;
  debounce?: number;
};

export type BoxProps = {
  backgroundColor?: string;
  horizontal?: boolean;
} & SpacingProps &
  TouchableOpacityProps;
