import { useState, useEffect } from 'react'
import ReviewForm from './assets/components/ReviewForm'
import FavoritesToggle from './assets/components/FavoritesToggle'
import RatingStars from './assets/components/RatingStars'
import { getAllRecipes, getReviews, postReview, addFavorite, removeFavorite } from './services/api'

function App() {
  const [reviews, setReviews] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    getAllRecipes()
      .then((res) => {
        if (res.data.length > 0) setRecipe(res.data[0])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!recipe) return
    getReviews(recipe.id)
      .then((res) => setReviews(res.data))
      .catch(() => {})
  }, [recipe])

  const handleReviewSubmit = (reviewData) => {
    postReview(reviewData.recipeId, { rating: reviewData.rating, comment: reviewData.comment })
      .then((res) => setReviews((prev) => [...prev, res.data]))
      .catch(() => {})
  }

  const handleFavorite = (recipeId, newState) => {
    const action = newState ? addFavorite(recipeId) : removeFavorite(recipeId)
    action
      .then(() => setIsFavorite(newState))
      .catch(() => {})
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Recipe Header Card */}
        <div className="bg-brand-white rounded-2xl shadow-md p-8 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-2">
                {recipe ? recipe.title : 'Loading...'}
              </h1>
              <div className="flex items-center gap-2">
                <RatingStars rating={avgRating} readonly />
                <span className="text-gray-500 text-sm">
                  {reviews.length ? `${avgRating.toFixed(1)} stars · ${reviews.length} review${reviews.length > 1 ? 's' : ''}` : 'No ratings yet'}
                </span>
              </div>
            </div>
            <FavoritesToggle
              recipeId={recipe?.id || 1}
              isFavorite={isFavorite}
              onToggle={handleFavorite}
            />
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {recipe ? recipe.description : ''}
          </p>
        </div>

        {/* Review Form */}
        <ReviewForm recipeId={recipe?.id || 1} onSubmit={handleReviewSubmit} />

        {/* Reviews List */}
        <div className="bg-brand-white rounded-2xl shadow-md p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-brand-black mb-6">
            Reviews ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map(r => (
                <div key={r.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-brand-white font-bold shrink-0">
                      {(r.user_id || '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-brand-black">{r.user_id}</span>
                      <div className="mt-1">
                        <RatingStars rating={r.rating} readonly />
                      </div>
                    </div>
                  </div>
                  {r.comment && <p className="text-gray-600 ml-13 leading-relaxed">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-brand-black text-brand-white py-4 px-6 rounded-2xl text-center">
          <p className="text-sm text-gray-400">Recipe App &copy; {new Date().getFullYear()}</p>
        </div>

      </div>
    </div>
  )
}

export default App
