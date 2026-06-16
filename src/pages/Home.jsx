import { useEffect, useState } from "react";
import { searchRecipes, getCategories } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

import { layout } from "../styles";
import { useThemeStyles } from "../styles/useThemeStyles";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import RecipeForm from "../components/RecipeForm";
import FavoritesToggle from "../components/FavoritesToggle"
import ReviewForm from "../components/ReviewForm";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const debouncedQuery = useDebounce(query, 500);
  const t = useThemeStyles();

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getCategories();

        const data = Array.isArray(res?.data)
          ? res.data
          : res?.data?.categories || [];

        setCategories(["All", ...data]);
      } catch (err) {
        console.error(err);
        setCategories(["All"]);
      }
    }

    loadCategories();
  }, []);

  // Load recipes
  useEffect(() => {
    async function loadRecipes() {
      try {
        setLoading(true);

        const res = await searchRecipes(debouncedQuery, activeCategory);

        setRecipes(res?.data?.data || res?.data || []);
      } catch (err) {
        console.error(err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [debouncedQuery, activeCategory]);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };
  

  return (
    <main className={`${layout.page} ${t.background} ${t.text}`}>
      {/* SEARCH SYSTEM (Member 3) */}
      <SearchBar onSearch={setQuery} loading={loading} />

      {/* CATEGORY SYSTEM (Member 3) */}
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
     <RecipeForm onAdd={triggerRefresh} /> 
      <RecipeList recipes={recipes} loading={loading} refresh={refresh}/>
      <FavoritesToggle />
     <ReviewForm
  recipeId={1}
  onSubmit={(data) => {
    setReview(data);
  }}
/>
{review && (
  <div className="p-4 mt-4 bg-green-100 rounded">
    <h3>Latest Review:</h3>
    <p>Recipe ID: {review.recipeId}</p>
    <p>Rating: {review.rating}</p>
    <p>Comment: {review.comment}</p>
  </div>
)}
    </main>
  );
}