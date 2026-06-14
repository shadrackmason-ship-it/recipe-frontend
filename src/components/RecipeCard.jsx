import { card, typography } from "../styles";
import { useThemeStyles } from "../styles/useThemeStyles";

export default function RecipeCard({ recipe }) {
  const t = useThemeStyles();

  if (!recipe) return null;

  return (
    <div className={`${card.base} ${card.default} ${t.text}`}>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className={card.imageSmall}
        />
      )}

      <h3 className={typography.h3}>
        {recipe.name || "Untitled Recipe"}
      </h3>

      <p className={t.mutedText + " mt-2"}>
        {recipe.description || "No description available"}
      </p>

      {recipe.category && (
        <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600">
          {recipe.category}
        </span>
      )}

      <div className="mt-3">
        <p className={t.mutedText}>Ingredients:</p>

        <ul className="list-disc list-inside text-sm">
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}