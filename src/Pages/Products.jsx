// src/Pages/Products.jsx
import { useState } from "react";
import CategoryCard from "../Components/CategoryCard";

export default function Products() {
  const [categories] = useState([
    { id: 1, name: "Men's Wear", img: "https://picsum.photos/400?random=21", desc: "Trendy shirts, jeans, and jackets for men." },
    { id: 2, name: "Women's Wear", img: "https://picsum.photos/400?random=22", desc: "Elegant dresses, tops, and accessories for women." },
    { id: 3, name: "Children's Wear", img: "https://picsum.photos/400?random=23", desc: "Cute and comfy outfits for kids." },
    { id: 4, name: "Others", img: "https://picsum.photos/400?random=24", desc: "Seasonal collections and accessories." },
  ]);

  return (
    <div className="min-h-screen text-white px-4 py-6">
      <div className="bg-white/90 text-black text-center py-2 font-semibold rounded-md max-w-4xl mx-auto">
        🛍️ Explore Categories — Find Your Perfect Style!
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
