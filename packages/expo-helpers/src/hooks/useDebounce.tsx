import { useState, useEffect, useRef } from "react";

export default function useDebounce<K extends any>(
  value: K,
  debounce: number = 300
) {
  const timeout = useRef<any>(null);
  const [debounced, setDebounced] = useState<K>(value);
  useEffect(() => {
    if (timeout.current > 0) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setDebounced(value);
    }, debounce);
  }, [value]);

  return debounced;
}
