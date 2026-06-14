export default function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{recipe.title}</h2>
      <p className="text-gray-600">{recipe.description}</p>
      <div className="text-sm text-gray-500 mt-2 space-y-1">
        <p>Category: {recipe.category}</p>
        <p>Prep: {recipe.prep_time} min</p>
        <p>Cook: {recipe.cook_time} min</p>
        <p>Servings: {recipe.servings}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(recipe)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}