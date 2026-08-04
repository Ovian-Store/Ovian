import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      onLogin(data.user);
      // ✅ Redirect to Home after login
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Form */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <Link
            to="/signup"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300 block"
          >
            Create New Account
          </Link>
          <Link
            to="/reset-password"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300 block"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
