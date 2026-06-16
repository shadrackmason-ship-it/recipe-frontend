function FavoritesToggle({ recipeId, isFavorite, onToggle }) {
  return (
    <button
      onClick={() => onToggle(recipeId, !isFavorite)}
      className={`text-3xl transition-all hover:scale-110 ${
        isFavorite ? 'text-brand-orange' : 'text-gray-300 hover:text-brand-orange'
      }`}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}

export default FavoritesToggle