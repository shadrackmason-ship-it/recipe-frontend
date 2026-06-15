import { useTheme } from "../context/ThemeContext";

export function useThemeStyles() {
  const { themeMode } = useTheme();

  const isDark = themeMode === "dark";

  return {
    background: isDark ? "bg-black" : "bg-white",
    text: isDark ? "text-white" : "text-black",

    mutedText: isDark ? "text-gray-400" : "text-gray-600",

    card: isDark
      ? "bg-black border-gray-700"
      : "bg-white border-gray-200",

    border: isDark ? "border-gray-700" : "border-gray-200",

    nav: isDark ? "bg-black" : "bg-white",
  };
}