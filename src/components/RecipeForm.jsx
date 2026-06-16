import { useState } from "react";

function RecipeForm({ onAdd }) {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title: form.title,
      description: form.description,
      category: form.category,
      prep_time: Number(form.prep_time),
      cook_time: Number(form.cook_time),
      servings: Number(form.servings),
      ingredients: form.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: form.instructions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch("https://recipe-backend-30j8.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }
      const data = await response.json();
      console.log("Recipe created:", data);
      if (onAdd) {
        onAdd();
      }
      setForm({
        title: "",
        description: "",
        category: "",
        prep_time: "",
        cook_time: "",
        servings: "",
        ingredients: "",
        instructions: "",
      });
      alert("Recipe created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating recipe");
    }
  };

return (
  <div className="bg-white rounded-xl shadow-lg p-5 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-center mb-5">
      Create Recipe
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={form.title}
          onChange={handleChange}
          spellCheck={false}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          spellCheck={false}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <textarea
        name="description"
        placeholder="Recipe Description"
        value={form.description}
        onChange={handleChange}
        spellCheck={false}
        required
        className="w-full border rounded-lg px-3 py-2"
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          name="prep_time"
          placeholder="Prep Time"
          value={form.prep_time}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          name="cook_time"
          placeholder="Cook Time"
          value={form.cook_time}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={form.servings}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          value={form.ingredients}
          onChange={handleChange}
          spellCheck={false}
          rows="4"
          className="w-full border rounded-lg px-3 py-2"
        />
        <textarea
          name="instructions"
          placeholder="Instructions (one step per line)"
          value={form.instructions}
          onChange={handleChange}
          spellCheck={false}
          rows="4"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Create Recipe
      </button>
    </form>
  </div>
);
}

export default RecipeForm;