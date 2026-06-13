import { useState } from 'react';

export default function RatingStars({ rating = 0, onRate, readonly = false }) {
  const [hover, setHover] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`text-2xl transition-colors duration-200 ${
            readonly? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } ${
            (hover || rating) >= star? 'text-brand-orange' : 'text-brand-black'
          }`}
          onClick={() =>!readonly && onRate?.(star)}
          onMouseEnter={() =>!readonly && setHover(star)}
          onMouseLeave={() =>!readonly && setHover(0)}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}