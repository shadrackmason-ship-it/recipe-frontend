function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition space-y-3">
      <h2 className="text-lg font-bold">{recipe.title}</h2>
      <p className="text-gray-600">{recipe.description}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p>Category: {recipe.category}</p>
        <p>Prep: {recipe.prep_time} min</p>
        <p>Cook: {recipe.cook_time} min</p>
        <p>Servings: {recipe.servings}</p>
      </div>
      {recipe.ingredients?.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mt-2">Ingredients</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {recipe.instructions?.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mt-2">Instructions</h3>
          <ol className="list-decimal pl-5 text-sm text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(recipe)}
          className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;