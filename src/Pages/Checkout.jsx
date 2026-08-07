// src/Pages/Checkout.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state?.items || null;
  const [items, setItems] = useState(passed || []);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod or online
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!passed) {
      (async () => {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (!user) {
          alert("Please log in to checkout.");
          navigate("/login");
          return;
        }
        const { data, error } = await supabase
          .from("cart_items")
          .select("id, quantity, product:products(id, name, price, productimagelink)")
          .eq("user_id", user.id);

        if (error) {
          console.error("Load cart for checkout:", error);
          return;
        }
        const mapped = data.map(ci => ({ product: ci.product, quantity: ci.quantity, cart_item_id: ci.id }));
        setItems(mapped);
      })();
    }
  }, [passed, navigate]);

  const computeTotal = () => {
    return items.reduce((s, it) => s + (Number(it.product.price || 0) * Number(it.quantity || 1)), 0);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        alert("Please log in to place order.");
        setLoading(false);
        return;
      }
      if (!address.trim()) {
        alert("Please enter delivery address.");
        setLoading(false);
        return;
      }

      const total = computeTotal();

      // If online payment, create order with pending_payment and redirect to payment page
      if (paymentMethod === "online") {
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            total_amount: total,
            status: "pending_payment",
            delivery_address: address,
            payment_method: "online"
          })
          .select("id")
          .single();

        console.log("Create order (online) result:", { orderData, orderError });
        if (orderError) throw orderError;

        const orderId = orderData.id;

        // Insert order_items
        const itemsToInsert = items.map(it => ({
          order_id: orderId,
          product_id: it.product.id,
          quantity: it.quantity,
          unit_price: it.product.price || 0
        }));

        const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
        console.log("Insert order_items:", itemsError);
        if (itemsError) throw itemsError;

        // Clear cart
        await supabase.from("cart_items").delete().eq("user_id", user.id);

        // Redirect to payment page (stub). Replace with real gateway flow later.
        navigate(`/payment?orderId=${orderId}`);
        return;
      }

      // Pay on delivery flow
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          status: "pending",
          delivery_address: address,
          payment_method: "cod"
        })
        .select("id")
        .single();

      console.log("Create order (cod) result:", { orderData, orderError });
      if (orderError) throw orderError;
      const orderId = orderData.id;

      const itemsToInsert = items.map(it => ({
        order_id: orderId,
        product_id: it.product.id,
        quantity: it.quantity,
        unit_price: it.product.price || 0
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
      console.log("Insert order_items:", itemsError);
      if (itemsError) throw itemsError;

      // Clear cart
      await supabase.from("cart_items").delete().eq("user_id", user.id);

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Place order failed:", err);
      alert(err?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-6 pt-20">
      <div className="max-w-3xl mx-auto card rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Items</h3>
          {items.length === 0 && <p className="text-gray-400">No items to checkout.</p>}
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-4 py-2 border-b border-white/5">
              <img src={it.product.productimagelink} alt={it.product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">{it.product.name}</div>
                <div className="text-sm text-gray-400">Qty: {it.quantity}</div>
                <div className="text-yellow-400">₹{it.product.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Delivery Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full text-black p-2 rounded" rows={3} />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Payment Method</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <span>Pay on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <div className="text-sm text-gray-400">Total</div>
            <div className="text-xl font-bold text-yellow-400">₹{computeTotal()}</div>
          </div>
          <button onClick={handlePlaceOrder} disabled={loading} className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold disabled:opacity-50">
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
