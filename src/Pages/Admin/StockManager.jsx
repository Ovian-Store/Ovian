import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";


export default function StockManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, stock, sizes")
        .order("id", { ascending: true });
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStock = async (id, newStock) => {
    try {
      const { error } = await supabase.from("products").update({ stock: newStock }).eq("id", id);
      if (error) throw error;
      // record movement
      await supabase.from("inventory_movements").insert({ product_id: id, change: newStock, reason: "manual update" });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to update stock");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Stock</h2>
      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-white/5 p-3 rounded">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-gray-400">Sizes: {p.sizes?.join(", ") || "—"}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={p.stock}
                  className="input w-24"
                  onBlur={(e) => updateStock(p.id, Number(e.target.value))}
                />
                <button onClick={() => load()} className="btn-white px-3 py-1 rounded">Refresh</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
