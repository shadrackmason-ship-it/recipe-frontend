import { useState } from 'react'
import RatingStars from './RatingStars'

function ReviewForm({ recipeId, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) { setError('Please select a rating'); return }
    setError('')
    onSubmit({ recipeId, rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <div className="bg-brand-white rounded-xl shadow-lg p-6 border-2 border-brand-black mb-8">
      <h2 className="text-2xl font-bold text-brand-black mb-6">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-brand-black font-semibold mb-3">Your Rating</label>
          <RatingStars rating={rating} onRate={setRating} />
        </div>
        <div>
          <label className="block text-brand-black font-semibold mb-3">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-4 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition"
            rows="4"
            placeholder="What did you think of this recipe?"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full sm:w-auto bg-brand-orange text-brand-white font-bold rounded-lg hover:opacity-90 transition shadow-md"
          style={{ padding: '12px 32px' }}
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default ReviewForm