// src/Components/CategoryCard.jsx
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div className="card rounded-lg shadow hover:scale-105 transition-transform">
      <img
        src={category.img}
        alt={category.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h3 className="text-white font-semibold text-lg">{category.name}</h3>
        <p className="text-gray-300 text-sm mt-1">{category.desc}</p>
        <button
          onClick={() => navigate(`/products/${category.id}`, { state: category })}
          className="mt-3 btn-white font-bold py-1 px-3 rounded"
        >
          View Collection
        </button>
      </div>
    </div>
  );
}
