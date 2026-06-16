import { useEffect, useState } from "react";
import { searchRecipes, getCategories } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

import { layout } from "../styles";
import { useThemeStyles } from "../styles/useThemeStyles";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import RecipeForm from "../components/RecipeForm";
import FavoritesToggle from "../components/FavoritesToggle";
import ReviewForm from "../components/ReviewForm";

export default function Home() {
  const [recipes, setRecipes]       = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [review, setReview]         = useState(null);
  const [refresh, setRefresh]       = useState(false);

  const [query, setQuery]                   = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const debouncedQuery = useDebounce(query, 500);
  const t = useThemeStyles();

  // Load categories once on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getCategories();
        const data = Array.isArray(res?.data)
          ? res.data
          : res?.data?.categories ?? [];
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategories(["All"]);
      }
    }
    loadCategories();
  }, []);

  // Reload recipes when search query, category, or refresh flag changes
  useEffect(() => {
    async function loadRecipes() {
      setLoading(true);
      try {
        const res = await searchRecipes(debouncedQuery, activeCategory);
        setRecipes(res?.data?.data ?? res?.data ?? []);
      } catch (err) {
        console.error("Failed to load recipes:", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    loadRecipes();
  }, [debouncedQuery, activeCategory, refresh]); // ✅ refresh now triggers a reload

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <main className={`${layout.page} ${t.background} ${t.text}`}>
      <SearchBar onSearch={setQuery} loading={loading} />

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* RecipeForm adds a new recipe, then triggers a list reload */}
      <RecipeForm onAdd={triggerRefresh} />

      <RecipeList recipes={recipes} loading={loading} refresh={refresh} />

      <FavoritesToggle />

      {/* TODO: replace hardcoded recipeId={1} with a real selected recipe id */}
      <ReviewForm
        recipeId={1}
        onSubmit={(data) => setReview(data)}
      />

      {review && (
        <div className="p-4 mt-4 bg-green-100 rounded">
          <h3 className="font-semibold mb-1">Latest Review</h3>
          <p>Recipe ID: {review.recipeId}</p>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      )}
    </main>
  );
}