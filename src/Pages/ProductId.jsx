// src/Pages/ProductId.jsx
import { useLocation, useParams, Link } from "react-router-dom";

export default function ProductId() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state;

  if (!product) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="card p-6 rounded-lg text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="btn-white px-4 py-2 rounded">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 py-6">
      <div className="max-w-4xl mx-auto card rounded-lg shadow-lg p-6">
        <img src={product.img} alt={product.name} className="w-full h-96 object-cover rounded-lg mb-6" />
        <h2 className="text-white text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-300 mb-4">{product.desc}</p>
        <Link to="/" className="btn-white px-4 py-2 rounded">← Back to Home</Link>
      </div>
    </div>
  );
}
