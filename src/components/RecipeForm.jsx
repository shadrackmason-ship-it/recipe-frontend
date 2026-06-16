import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://recipe-backend-30j8.onrender.com";

const EMPTY_FORM = {
  title: "", description: "", category: "",
  prep_time: "", cook_time: "", servings: "",
  ingredients: "", instructions: "",
};

function RecipeForm({ onAdd }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const recipeData = {
      title:        form.title,
      description:  form.description,
      category:     form.category,
      prep_time:    Number(form.prep_time),
      cook_time:    Number(form.cook_time),
      servings:     Number(form.servings),
      ingredients:  form.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
      instructions: form.instructions.split("\n").map((i) => i.trim()).filter(Boolean),
    };

    try {
      const token = localStorage.getItem("token");
      // ✅ Fixed: was pointing to /register/ (auth route), now correctly /recipes/
      const response = await fetch(`${API_BASE}/recipes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(recipeData),
      });

      let data;
      try { data = await response.json(); } catch { /* no body */ }

      if (!response.ok) {
        const detail = data?.detail;
        throw new Error(
          typeof detail === "string" ? detail :
          Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") :
          "Failed to create recipe"
        );
      }

      setForm(EMPTY_FORM);
      onAdd?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-5">Create Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Recipe Title"
            value={form.title} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2" />
          <input type="text" name="category" placeholder="Category"
            value={form.category} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2" />
        </div>
        <textarea name="description" placeholder="Recipe Description"
          value={form.description} onChange={handleChange} required
          className="w-full border rounded-lg px-3 py-2" />
        <div className="grid grid-cols-3 gap-4">
          <input type="number" name="prep_time" placeholder="Prep Time (min)"
            value={form.prep_time} onChange={handleChange} required
            className="border rounded-lg px-3 py-2" />
          <input type="number" name="cook_time" placeholder="Cook Time (min)"
            value={form.cook_time} onChange={handleChange} required
            className="border rounded-lg px-3 py-2" />
          <input type="number" name="servings" placeholder="Servings"
            value={form.servings} onChange={handleChange} required
            className="border rounded-lg px-3 py-2" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <textarea name="ingredients" placeholder="Ingredients (one per line)"
            value={form.ingredients} onChange={handleChange} rows="4"
            className="w-full border rounded-lg px-3 py-2" />
          <textarea name="instructions" placeholder="Instructions (one step per line)"
            value={form.instructions} onChange={handleChange} rows="4"
            className="w-full border rounded-lg px-3 py-2" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60 transition">
          {loading ? "Creating…" : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;