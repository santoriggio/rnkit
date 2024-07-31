import { ComplexIconProps } from "../types";

export default function isComplexIcon(icon: any): icon is ComplexIconProps {
  return typeof icon === "object";
}
