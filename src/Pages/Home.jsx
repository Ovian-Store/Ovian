import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [items, setItems] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Cloth ${i + 1}`,
      img: `https://picsum.photos/400?random=${i + 1}`,
      desc: "A stylish and comfortable outfit perfect for any occasion.",
    }))
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const loadMore = () => {
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: page * 8 + i + 1,
      name: `Cloth ${page * 8 + i + 1}`,
      img: `https://picsum.photos/400?random=${page * 8 + i + 1}`,
      desc: "A stylish and comfortable outfit perfect for any occasion.",
    }));
    setItems((prev) => [...prev, ...newItems]);
    setPage(page + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="pt-20 min-h-screen text-white px-4 py-6">
      {/* Discount Banner BELOW navbar */}
      <div className="bg-white/90 text-black text-center py-2 font-semibold rounded-md max-w-4xl mx-auto">
        🎉 Summer Sale! Get up to 50% off on selected items — Limited time only!
      </div>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto">
        {items.map((item) => (
          <div key={item.id} className="card rounded-lg shadow hover:scale-105 transition-transform">
            <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4 text-center">
              <h3 className="text-white font-semibold">{item.name}</h3>
              <p className="text-gray-300 text-sm mt-1">Stylish & comfortable</p>
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
    </div>
  );
}
