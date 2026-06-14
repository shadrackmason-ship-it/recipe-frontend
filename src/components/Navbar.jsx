import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useThemeStyles } from "../styles/useThemeStyles";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useThemeStyles();

  return (
    <header className={`w-full border-b ${t.border} ${t.background}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className={`text-xl font-bold ${t.text}`}>
          Recipe<span className="text-orange-500">Hub</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a className={`hover:text-orange-500 ${t.text}`} href="#">Home</a>
          <a className={`hover:text-orange-500 ${t.text}`} href="#">Recipes</a>
          <a className={`hover:text-orange-500 ${t.text}`} href="#">Categories</a>
          <a className={`hover:text-orange-500 ${t.text}`} href="#">About</a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            className={`md:hidden text-2xl ${t.text}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-3 border-t ${t.border} ${t.background}`}>
          <a className={t.text} href="#">Home</a>
          <a className={t.text} href="#">Recipes</a>
          <a className={t.text} href="#">Categories</a>
          <a className={t.text} href="#">About</a>
        </div>
      )}
    </header>
  );
}