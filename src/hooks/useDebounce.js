import { useEffect, useState } from "react";

// Named export (used in Home.jsx as: import { useDebounce } from "../hooks/useDebounce")
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}