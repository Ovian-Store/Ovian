import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";


export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      // Admin policy must allow selecting orders
      const { data, error } = await supabase
        .from("orders")
        .select("id, user_id, items, total, status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o.id} className="bg-white/5 p-3 rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Order #{o.id}</div>
                  <div className="text-xs text-gray-400">User: {o.user_id}</div>
                  <div className="text-xs text-gray-400">Placed: {new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{o.total}</div>
                  <div className="text-sm">Status: {o.status}</div>
                </div>
              </div>

              <div className="mt-2 text-sm">
                <pre className="text-xs bg-black/30 p-2 rounded overflow-auto">{JSON.stringify(o.items, null, 2)}</pre>
              </div>

              <div className="mt-2 flex gap-2">
                {["pending","paid","shipped","cancelled"].map(s => (
                  <button key={s} onClick={() => updateStatus(o.id, s)} className="btn-white px-2 py-1 rounded">{s}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
