import { useState } from "react";
import { createRecipe } from "../api/recipes";

export default function RecipeForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    prep_time: "",
    cook_time: "",
    servings: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = await createRecipe({
      ...form,
      prep_time: Number(form.prep_time),
      cook_time: Number(form.cook_time),
      servings: Number(form.servings),
    });
    onAdd(newRecipe);

    setForm({
      title: "",
      description: "",
      category: "",
      prep_time: "",
      cook_time: "",
      servings: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
      <input name="prep_time" value={form.prep_time} onChange={handleChange} placeholder="Prep Time" className="input" />
      <input name="cook_time" value={form.cook_time} onChange={handleChange} placeholder="Cook Time" className="input" />
      <input name="servings" value={form.servings} onChange={handleChange} placeholder="Servings" className="input" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Recipe
      </button>
    </form>
  );
}