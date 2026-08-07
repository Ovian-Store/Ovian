import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, productimagelink, images, price, category")
        .order("id", { ascending: true })
        .range((pageNum - 1) * 8, pageNum * 8 - 1);

      if (error) throw error;

      console.log("Fetched products:", data); // ✅ Debug log
      setItems((prev) => [...prev, ...data]);
      setPage(pageNum);
    } catch (err) {
      console.error("Supabase fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // ✅ Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (!loading) fetchProducts(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <div className="pt-20 min-h-screen text-white px-4 py-6">
      {/* Discount Banner */}
      <div className="bg-white/90 text-black text-center py-2 font-semibold rounded-md max-w-4xl mx-auto">
        🎉 Summer Sale! Get up to 50% off on selected items — Limited time only!
      </div>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="card rounded-lg shadow hover:scale-105 transition-transform"
          >
            <img
              src={item.productimagelink}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-white font-semibold">{item.name}</h3>
              <p className="text-gray-300 text-sm mt-1">{item.description}</p>
              <p className="text-xs text-gray-400">Category: {item.category}</p>

              {/* Show gallery images if available */}
              {item.images && item.images.length > 0 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {item.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${item.name} ${i}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {item.price && (
                <p className="text-yellow-400 font-bold mt-2">₹{item.price}</p>
              )}
              <button
                onClick={() => navigate(`/product/${item.id}`, { state: item })}
                className="mt-3 btn-white py-1 px-3 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-center text-yellow-400 mt-4">Loading more...</p>
      )}
    </div>
  );
}
