import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function SearchBar({ onSearch, loading = false }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clean = query.trim();
    if (!clean) return;

    onSearch(clean);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">

      <div className="flex items-center gap-3 mb-3">

        <form onSubmit={handleSubmit} className="flex-1">
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search recipes..."
            className="
              w-full p-3 border border-gray-300 rounded-lg outline-none
              focus:ring-2 focus:ring-orange-400
              dark:bg-black dark:text-white dark:border-gray-700
            "
          />
        </form>

        <ThemeToggle />
      </div>

      {loading && (
        <p className="text-center text-sm text-gray-400">
          Searching...
        </p>
      )}
    </div>
  );
}