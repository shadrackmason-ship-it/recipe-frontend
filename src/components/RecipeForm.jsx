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
    ingredients: [],
    instructions: [],
  });
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setForm({
      ...form,
      ingredients: [...form.ingredients, ingredientInput],
    });
    setIngredientInput("");
  };

  const addInstruction = () => {
    if (!instructionInput.trim()) return;
    setForm({
      ...form,
      instructions: [...form.instructions, instructionInput],
    });
    setInstructionInput("");
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
      ingredients: [],
      instructions: [],
    });
    setIngredientInput("");
    setInstructionInput("");
  };

  return (
    <form onSubmit={handleSubmit}className="bg-white p-4 rounded shadow space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="input"/>
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="input"/>
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="input"/>
      <input
        name="prep_time"
        value={form.prep_time}
        onChange={handleChange}
        placeholder="Prep Time"
        className="input"/>
      <input
        name="cook_time"
        value={form.cook_time}
        onChange={handleChange}
        placeholder="Cook Time"
        className="input"/>
      <input
        name="servings"
        value={form.servings}
        onChange={handleChange}
        placeholder="Servings"
        className="input"/>
      <div className="space-y-2">
        <h3 className="font-bold">Ingredients</h3>
        <div className="flex gap-2">
          <input
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Add ingredient"
            className="input flex-1"/>
          <button
            type="button"
            onClick={addIngredient}
            className="bg-green-600 text-white px-3 rounded">Add</button>
        </div>
        <ul className="list-disc pl-5">
          {form.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-bold">Instructions</h3>
        <div className="flex gap-2">
          <input
            value={instructionInput}
            onChange={(e) => setInstructionInput(e.target.value)}
            placeholder="Add step"
            className="input flex-1"/>
          <button
            type="button"
            onClick={addInstruction}
            className="bg-blue-600 text-white px-3 rounded">Add</button>
        </div>
        <ol className="list-decimal pl-5">
          {form.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Recipe</button>
    </form>
  );
}