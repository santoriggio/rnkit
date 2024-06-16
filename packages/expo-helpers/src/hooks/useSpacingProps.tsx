/**
 *
 *
 *
 * Use component props and extrapolate the spacing style props like
 * margin, marginTop, marginBottom, padding, ..., radius...
 *
 *
 * @param props any props of any component
 * @returns styled object
 *
 */

import { Size, SpacingProps, spacingProps } from "../types";
import useStyles, { isValidSize } from "./useStyles";

type Props = SpacingProps & Record<any, any>;
type Return = Partial<Record<keyof SpacingProps, Size>>;
type RawReturn = Partial<Record<keyof SpacingProps, number>>;
export default function useSpacingProps(props: Props): Return {
  return useExtrapolateValidProps(props);
}
/*
 * Return the props as numbers and not as sizes
 *
 *
 * */

export function useRawSpacingProps(props: Props): RawReturn {
  return useExtrapolateValidProps(props, true);
}
/*
 *
 * raw param return all the props as numbers and not as sizes
 *
 *
 * */

function useExtrapolateValidProps(props: Props, raw: boolean = false) {
  const { spacing } = useStyles();

  if (typeof props !== "object" || Array.isArray(props)) return {};
  let ans = {};
  for (const prop in props) {
    if (typeof spacingProps[prop] !== "undefined") {
      const size = props[prop];
      if (isValidSize(size)) {
        ans = { ...ans, [prop]: raw ? spacing.get(size) : size };
      }
    }
  }
  return ans;
}
