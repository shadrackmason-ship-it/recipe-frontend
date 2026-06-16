function RatingStars({ rating, onRate, readonly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRate(star)}
          className={`text-2xl px-1 py-1 transition ${
            star <= rating ? 'text-brand-orange' : 'text-gray-300'
          } ${!readonly ? 'hover:scale-125 cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default RatingStars