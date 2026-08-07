// src/Pages/CartPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadCart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to view cart.");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("id, quantity, product:products(id, name, price, productimagelink)")
        .eq("user_id", user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error("Load cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const updateQty = async (cartId, newQty) => {
    try {
      const { error } = await supabase.from("cart_items").update({ quantity: newQty }).eq("id", cartId);
      if (error) throw error;
      loadCart();
    } catch (err) {
      console.error("Update qty failed:", err);
    }
  };

  const removeItem = async (cartId) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", cartId);
      if (error) throw error;
      loadCart();
    } catch (err) {
      console.error("Remove cart item failed:", err);
    }
  };

  const proceedToCheckout = () => {
    // Map to expected checkout state
    const checkoutItems = items.map(ci => ({ product: ci.product, quantity: ci.quantity }));
    navigate("/checkout", { state: { items: checkoutItems } });
  };

  const total = items.reduce((s, it) => s + (Number(it.product.price || 0) * Number(it.quantity || 1)), 0);

  return (
    <div className="min-h-screen text-white px-4 py-6 pt-20">
      <div className="max-w-4xl mx-auto card rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {loading ? <p>Loading...</p> : items.length === 0 ? <p className="text-gray-400">Cart is empty.</p> : (
          <>
            {items.map(ci => (
              <div key={ci.id} className="flex items-center gap-4 py-3 border-b border-white/5">
                <img src={ci.product.productimagelink} alt={ci.product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{ci.product.name}</div>
                  <div className="text-sm text-gray-400">₹{ci.product.price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => updateQty(ci.id, Math.max(1, ci.quantity - 1))} className="px-2 py-1 bg-white/10 rounded">-</button>
                    <div className="px-3">{ci.quantity}</div>
                    <button onClick={() => updateQty(ci.id, ci.quantity + 1)} className="px-2 py-1 bg-white/10 rounded">+</button>
                    <button onClick={() => removeItem(ci.id)} className="ml-4 text-red-400">Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-6">
              <div>
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-xl font-bold text-yellow-400">₹{total}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={proceedToCheckout} className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold">Checkout</button>
                <button onClick={loadCart} className="btn-white px-4 py-2 rounded">Refresh</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
