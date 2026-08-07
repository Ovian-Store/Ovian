import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";


export default function ProductList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, desc, productimagelink, price, category, stock, sizes")
        .order("id", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [refreshToggle]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setRefreshToggle(t => !t);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Products</h2>
        <button onClick={() => setRefreshToggle(t => !t)} className="btn-white px-3 py-1 rounded">Refresh</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 p-4 rounded">
              <img src={item.productimagelink} alt={item.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-yellow-400 font-bold">₹{item.price}</p>
                  <p className="text-xs text-gray-400">Stock: {item.stock}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(JSON.stringify(item))} className="btn-white px-2 py-1 rounded">Copy</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-600 px-2 py-1 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
