import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-bold border-b-2 border-white pb-1"
      : "opacity-80 hover:opacity-100";

  return (
    <div className="bg-blue-600 text-white shadow-md">
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Recipe Manager</h1>

        {/* HAMBURGER BUTTON (MOBILE ONLY) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            Create
          </NavLink>

          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/create" onClick={() => setOpen(false)} className={linkClass}>
            Create
          </NavLink>

          <NavLink to="/favorites" onClick={() => setOpen(false)} className={linkClass}>
            Favorites
          </NavLink>
        </div>
      )}
    </div>
  );
}