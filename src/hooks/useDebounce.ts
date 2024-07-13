import { useEffect, useMemo } from "react";

// @ref: slash/useDebounce
export function useDebounce(callback: Function, delay: number) {
  const debounced = useMemo(() => {
    return debounce(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}

// @ref: lodash/debounce
function debounce(callback: Function, delay: number, stop: boolean = false) {
  let timer: string | number | NodeJS.Timeout | undefined;

  function debounced(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}
