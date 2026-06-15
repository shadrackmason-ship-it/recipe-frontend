import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// safe initial theme loader
function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  try {
    return localStorage.getItem("theme") || "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // apply dark class for Tailwind
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // persist theme
    try {
      localStorage.setItem("theme", themeMode);
    } catch {
      // ignore in test environments
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}