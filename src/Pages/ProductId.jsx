// src/Pages/ProductId.jsx
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

export default function ProductId() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state;
  const [product, setProduct] = useState(initialProduct || null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  // If product not passed via state, fetch by id
  useEffect(() => {
    if (!product && id) {
      (async () => {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, description, productimagelink, images, price, category")
          .eq("id", id)
          .single();
        if (error) {
          console.error("Fetch product error:", error);
          return;
        }
        setProduct(data);
      })();
    }
  }, [id, product]);

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

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to add to cart.");
        setLoading(false);
        return;
      }

      // Upsert cart item (unique constraint user_id + product_id)
      const { error } = await supabase.from("cart_items").upsert({
        user_id: user.id,
        product_id: product.id,
        quantity: qty
      }, { onConflict: "(user_id, product_id)" });

      if (error) throw error;
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err.message || err);
      alert("Add to cart failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = () => {
    // Navigate to checkout with product and qty
    navigate("/checkout", { state: { items: [{ product, quantity: qty }] } });
  };

  return (
    <div className="min-h-screen text-white px-4 py-6 pt-20">
      <div className="max-w-4xl mx-auto card rounded-lg shadow-lg p-6">
        <img
          src={product.productimagelink}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <h2 className="text-white text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <p className="text-yellow-400 font-bold text-xl mb-2">₹{product.price ?? "N/A"}</p>
        <p className="text-sm text-gray-400 mb-4">Category: {product.category}</p>

        {/* Show up to 5 gallery images */}
        {product.images && product.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto mb-6">
            {product.images.slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm text-gray-300">Qty</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-20 text-black px-2 py-1 rounded"
          />
        </div>

        <div className="flex gap-4">
          <Link to="/" className="btn-white px-4 py-2 rounded">← Back to Home</Link>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="btn-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={handleOrderNow}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
