import { useState } from 'react';
import RatingStars from './RatingStars';

export default function ReviewForm({ recipeId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    onSubmit?.({ recipeId, rating, comment: comment.trim() });
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto bg-brand-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-4">
        Leave a Review
      </h3>

      <div className="mb-4">
        <label className="block text-brand-black font-medium mb-2">
          Your Rating
        </label>
        <RatingStars rating={rating} onRate={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-brand-black font-medium mb-2">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think of this recipe?"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md text-brand-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 bg-brand-orange text-brand-white font-semibold rounded-md hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        Submit Review
      </button>
    </form>
  );
}