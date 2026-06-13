import { useState } from 'react';

export default function RatingStars({ rating = 0, onRate, readonly = false }) {
  const [hover, setHover] = useState(0);
  
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '24px',
            cursor: readonly ? 'default' : 'pointer',
            color: (hover || rating) >= star ? '#FF6B00' : '#000000',
            transition: 'color 0.2s'
          }}
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}