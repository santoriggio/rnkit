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

import { useEffect, useState } from "react";
import { SpacingProps, spacingProps } from "../components/Box";
import { Size, getSpacingSize, isValidSize } from "./useStyles";

type Props = SpacingProps & Record<any, any>;
type Return = Partial<Record<keyof SpacingProps, Size>>;
type RawReturn = Partial<Record<keyof SpacingProps, number>>;
export default function useSpacingProps(props: Props): Return {
  const [r, setR] = useState({});
  useEffect(() => {
    setR(extrapolateValidProps(props));
  }, [props]);
  return r;
}
/*
 * Return the props as numbers and not as sizes
 *
 *
 * */

export function useRawSpacingProps(props: Props): RawReturn {
  const extrapolated = extrapolateValidProps(props, true);
  return extrapolated;
}
/*
 *
 * raw param return all the props as numbers and not as sizes
 *
 *
 * */

function extrapolateValidProps(props: Props, raw: boolean = false) {
  if (typeof props !== "object" || Array.isArray(props)) return {};

  let ans = {};
  for (const prop in props) {
    if (typeof spacingProps[prop] !== "undefined") {
      const size = props[prop];
      if (isValidSize(size)) {
        ans = { ...ans, [prop]: raw ? getSpacingSize(size) : size };
      }
    }
  }
  return ans;
}
