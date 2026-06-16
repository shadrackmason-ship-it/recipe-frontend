export default function CategoryFilter({ categories = [], active, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {categories.map((cat, index) => (
  <button
    key={`${cat}-${index}`}   // 🔥 FIXED HERE
    onClick={() => onSelect(cat)}
    className={`px-3 py-1 rounded-full text-sm border transition ${
      active === cat
        ? "bg-orange-500 text-white border-orange-500"
        : "bg-white text-black border-gray-300 hover:bg-orange-100"
    }`}
  >
    {cat}
  </button>
))}
    </div>
  );
}