import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductId from "./Pages/ProductId";
import Products from "./Pages/Products";
import CategoryDetail from "./Pages/CategoryDetail";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import { supabase } from "./supabaseClient";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import OrdersListAdmin from "./Pages/Admin/OrdersList"; // admin orders
//import OrdersPage from "./Pages/OrdersPage"; // optional: user orders

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="app-overlay text-white">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<CategoryDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/orders" element={<OrdersPage />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<OrdersListAdmin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}
