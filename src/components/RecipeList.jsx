import { useEffect, useState, useCallback } from "react";
import { getRecipes, deleteRecipe, updateRecipe } from "../api/recipes";
import RecipeCard from "./RecipeCard";

function RecipeList({ refresh }) {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    ingredients: "",
    instructions: "",
  });

  const loadRecipes = useCallback(async () => {
    const data = await getRecipes();
    setRecipes(Array.isArray(data) ? data : data.data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadRecipes();
    };
    fetchData();
  }, [loadRecipes, refresh]);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    loadRecipes();
  };

  const startEdit = (recipe) => {
    setEditing(recipe.id);
    setForm({
      title: recipe.title || "",
      description: recipe.description || "",
      category: recipe.category || "",
      prep_time: recipe.prep_time || "",
      cook_time: recipe.cook_time || "",
      servings: recipe.servings || "",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join("\n")
        : "",
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.join("\n")
        : "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const updatedRecipe = {
      title: form.title,
      description: form.description,
      category: form.category,
      prep_time: Number(form.prep_time),
      cook_time: Number(form.cook_time),
      servings: Number(form.servings),
      ingredients: form.ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      instructions: form.instructions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
    };
    await updateRecipe(editing, updatedRecipe);
    setEditing(null);
    loadRecipes();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Recipes</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {recipes.map((recipe) =>
          editing === recipe.id ? (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded shadow space-y-3"
            >
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Description"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Category"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  name="prep_time"
                  type="number"
                  value={form.prep_time}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Prep"
                />
                <input
                  name="cook_time"
                  type="number"
                  value={form.cook_time}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Cook"
                />
                <input
                  name="servings"
                  type="number"
                  value={form.servings}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Servings"
                />
              </div>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Ingredients (one per line)"
                rows={3}
              />
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Instructions (one per line)"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={startEdit}
              onDelete={handleDelete}
            />
          )
        )}
      </div>
    </div>
  );
}

export default RecipeList;