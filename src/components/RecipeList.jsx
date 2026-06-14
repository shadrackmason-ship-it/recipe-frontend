import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe, updateRecipe } from "../api/recipes";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ refresh }) {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const loadRecipes = async () => {
    const data = await getRecipes();
    setRecipes(Array.isArray(data) ? data : data.data);
  };

  useEffect(() => {
    loadRecipes();
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    loadRecipes();
  };

  const startEdit = (recipe) => {
    setEditing(recipe.id);
    setForm(recipe);
  };

  const saveEdit = async () => {
    await updateRecipe(editing, form);
    setEditing(null);
    loadRecipes();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Recipes</h1>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {recipes.map((recipe) =>
          editing === recipe.id ? (
            <div key={recipe.id} className="bg-white p-4 rounded shadow space-y-2">
              <input
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input"
              />
              <input
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="input"
              />
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
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