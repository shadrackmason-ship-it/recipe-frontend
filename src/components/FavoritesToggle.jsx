import { useState, useEffect } from 'react';

export default function FavoritesToggle({ recipeId, isFavorite = false, onToggle }) {
  const [favorited, setFavorited] = useState(isFavorite);

  useEffect(() => {
    setFavorited(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    const newState =!favorited;
    setFavorited(newState);
    onToggle?.(recipeId, newState);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited? 'Remove from favorites' : 'Add to favorites'}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
        favorited 
         ? 'text-brand-orange' 
          : 'text-brand-black hover:text-brand-orange'
      }`}
    >
      <svg 
        className="w-6 h-6 md:w-7 md:h-7" 
        fill={favorited? 'currentColor' : 'none'} 
        stroke="currentColor" 
        strokeWidth={favorited? 0 : 2}
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
        />
      </svg>
    </button>
  );
}