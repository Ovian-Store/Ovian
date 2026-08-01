// src/Pages/AdminDashboard.jsx
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", description: "", price: "", image: "" });

  useEffect(() => {
    // fetch from backend when available; placeholder for now
    // fetch("http://localhost:5000/api/products").then(r=>r.json()).then(setProducts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST to backend when available
    setProducts(prev => [{ ...form, _id: Date.now() }, ...prev]);
    setForm({ name: "", category: "", description: "", price: "", image: "" });
  };

  return (
    <div className="min-h-screen text-white px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto card p-6 rounded-lg mb-8">
        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 mb-3 rounded bg-white/5 text-white" />
        <input value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} placeholder="Category" className="w-full p-2 mb-3 rounded bg-white/5 text-white" />
        <input value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full p-2 mb-3 rounded bg-white/5 text-white" />
        <input value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} placeholder="Price" className="w-full p-2 mb-3 rounded bg-white/5 text-white" />
        <input value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})} placeholder="Image URL" className="w-full p-2 mb-3 rounded bg-white/5 text-white" />
        <button className="btn-white w-full py-2 rounded font-bold">Add Product</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((p) => (
          <div key={p._id} className="card p-4 rounded-lg text-center">
            <img src={p.image || `https://picsum.photos/300?random=${p._id}`} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="text-white font-semibold">{p.name}</h3>
            <p className="text-gray-300 text-sm">{p.category}</p>
            <p className="text-gray-300 text-sm">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
