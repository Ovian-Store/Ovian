// src/Pages/ProductId.jsx
import { useLocation, useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState } from "react";

export default function ProductId() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state;
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center pt-20">
        <div className="card p-6 rounded-lg text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="btn-white px-4 py-2 rounded">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleOrder = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to place an order.");
        return;
      }

      // Insert into orders table
      const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
        status: "pending"
      });

      if (error) throw error;
      alert(`Order placed for ${product.name}!`);
    } catch (err) {
      console.error("Order failed:", err.message);
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-6 pt-20">
      <div className="max-w-4xl mx-auto card rounded-lg shadow-lg p-6">
        {/* Main product image */}
        <img
          src={product.productimagelink}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* Product details */}
        <h2 className="text-white text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <p className="text-yellow-400 font-bold text-xl mb-2">₹{product.price ?? "N/A"}</p>
        <p className="text-sm text-gray-400 mb-4">Category: {product.category}</p>

        {/* Gallery images */}
        {product.images && product.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto mb-6">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-4">
          <Link to="/" className="btn-white px-4 py-2 rounded">← Back to Home</Link>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? "Placing..." : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
