import { useEffect, useState, useCallback } from "react";
import { getRecipes, deleteRecipe, updateRecipe } from "../api/recipes";
import RecipeCard from "./RecipeCard";

function RecipeList({ refresh }) {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError]     = useState("");
  const [form, setForm] = useState({
    title: "", description: "", category: "",
    prep_time: "", cook_time: "", servings: "",
    ingredients: "", instructions: "",
  });

  const loadRecipes = useCallback(async () => {
    try {
      const data = await getRecipes();
      // Handle both { data: [...] } and plain array responses
      setRecipes(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Failed to load recipes:", err);
      setRecipes([]);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes, refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  const startEdit = (recipe) => {
    setEditing(recipe.id);
    setError("");
    setForm({
      title:        recipe.title        ?? "",
      description:  recipe.description  ?? "",
      category:     recipe.category     ?? "",
      prep_time:    recipe.prep_time    ?? "",
      cook_time:    recipe.cook_time    ?? "",
      servings:     recipe.servings     ?? "",
      ingredients:  Array.isArray(recipe.ingredients)  ? recipe.ingredients.join("\n")  : "",
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions.join("\n") : "",
    });
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveEdit = async () => {
    // Basic validation before hitting the API
    if (!form.title.trim()) { setError("Title is required"); return; }

    try {
      const updatedRecipe = {
        title:        form.title,
        description:  form.description,
        category:     form.category,
        prep_time:    Number(form.prep_time),
        cook_time:    Number(form.cook_time),
        servings:     Number(form.servings),
        ingredients:  form.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
        instructions: form.instructions.split("\n").map((i) => i.trim()).filter(Boolean),
      };
      await updateRecipe(editing, updatedRecipe);
      setEditing(null);
      setError("");
      loadRecipes();
    } catch (err) {
      console.error("Failed to update recipe:", err);
      setError("Failed to save changes. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Recipes</h1>
      {recipes.length === 0 && (
        <p className="text-gray-500 mt-4">No recipes found.</p>
      )}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {recipes.map((recipe) =>
          editing === recipe.id ? (
            <div key={recipe.id} className="bg-white p-4 rounded shadow space-y-3">
              <input name="title" value={form.title} onChange={handleChange}
                className="w-full border p-2 rounded" placeholder="Title" />
              <textarea name="description" value={form.description} onChange={handleChange}
                className="w-full border p-2 rounded" placeholder="Description" />
              <input name="category" value={form.category} onChange={handleChange}
                className="w-full border p-2 rounded" placeholder="Category" />
              <div className="grid grid-cols-3 gap-2">
                <input name="prep_time" type="number" value={form.prep_time} onChange={handleChange}
                  className="border p-2 rounded" placeholder="Prep (min)" />
                <input name="cook_time" type="number" value={form.cook_time} onChange={handleChange}
                  className="border p-2 rounded" placeholder="Cook (min)" />
                <input name="servings" type="number" value={form.servings} onChange={handleChange}
                  className="border p-2 rounded" placeholder="Servings" />
              </div>
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange}
                className="w-full border p-2 rounded" placeholder="Ingredients (one per line)" rows={3} />
              <textarea name="instructions" value={form.instructions} onChange={handleChange}
                className="w-full border p-2 rounded" placeholder="Instructions (one per line)" rows={4} />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button onClick={saveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                <button onClick={() => { setEditing(null); setError(""); }}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancel</button>
              </div>
            </div>
          ) : (
            <RecipeCard key={recipe.id} recipe={recipe} onEdit={startEdit} onDelete={handleDelete} />
          )
        )}
      </div>
    </div>
  );
}

export default RecipeList;