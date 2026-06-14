import { useEffect, useState } from "react";
import { searchRecipes, getCategories } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

import { layout } from "../styles";
import { useThemeStyles } from "../styles/useThemeStyles";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const debouncedQuery = useDebounce(query, 500);
  const t = useThemeStyles();

useEffect(() => {
  async function loadCategories() {
    const response = await getCategories();
    setCategories(["All", ...(response?.data || [])]);
  }
  loadCategories();
}, []);

useEffect(() => {
  async function fetchData() {
    setLoading(true);

    const response = await searchRecipes(debouncedQuery, activeCategory);

    setRecipes(response?.data?.data || []);

    setLoading(false);
  }

  fetchData();
}, [debouncedQuery, activeCategory]);

  return (
    <main className={`${layout.page} ${t.background} ${t.text}`}>

      <SearchBar onSearch={setQuery} loading={loading} />

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      <section className={layout.section}>

        {loading && <p>Searching recipes...</p>}

        {!loading && recipes.length === 0 && (
          <p className="text-gray-400 mt-10">No recipes found</p>
        )}

        <div className={layout.grid}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

      </section>
    </main>
  );
}