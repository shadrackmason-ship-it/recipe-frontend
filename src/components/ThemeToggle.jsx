import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
        border transition
        ${
          themeMode === "dark"
            ? "bg-black text-white border-gray-700 hover:bg-gray-900"
            : "bg-white text-black border-gray-300 hover:bg-gray-100"
        }
      `}
    >
   
      <span>
        {themeMode === "dark" ? "" : ""}
      </span>

      <span>
        {themeMode === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}