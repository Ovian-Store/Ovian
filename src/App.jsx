import { useState, useEffect } from "react";

import { Routes, Route, Router} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductId from "./Pages/ProductId";
import Products from "./Pages/Products";
import CategoryDetail from "./Pages/CategoryDetail";
import AdminDashboard from "./Pages/AdminDashboard";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";

import { supabase } from "./supabaseClient";
export default function App() {


  
  const [user, setUser] = useState(null);
  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);
  const handleSignup = (u) => setUser(u);


  useEffect(() => {
    // Check if already logged in
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  return (
    <div className="app-overlay text-white">
      <Navbar user={user} onLogout={handleLogout} />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/product/:id" element={<ProductId />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<CategoryDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
    
    </div>
  );
}
