// src/Pages/CategoryDetail.jsx
import { useLocation, useParams, Link } from "react-router-dom";

export default function CategoryDetail() {
  const { id } = useParams();
  const location = useLocation();
  const category = location.state;

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-200">
        <h2 className="text-green-400 text-3xl font-bold mb-4">Category Not Found</h2>
        <Link to="/products" className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
        <img
          src={category.img}
          alt={category.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
        <h2 className="text-green-400 text-3xl font-bold mb-2">{category.name}</h2>
        <p className="text-gray-400 mb-4">{category.desc}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 text-center hover:scale-105 transition-transform">
              <img
                src={`https://picsum.photos/300?random=${parseInt(id) * 10 + i}`}
                alt={`Item ${i + 1}`}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-green-400 font-semibold">Item {i + 1}</h3>
              <p className="text-gray-400 text-sm">Premium quality fabric</p>
            </div>
          ))}
        </div>

        <Link to="/products" className="block mt-6 text-center bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
