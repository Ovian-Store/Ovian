import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      onLogin(data.user);
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Login</h2>

        <input type="email" placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition">
          Login
        </button>

        <button onClick={handleGoogleLogin}
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition">
          Login with Google
        </button>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">Create one</Link>
        </p>

        <p className="mt-2 text-sm text-gray-300 text-center">
          <Link to="/reset-password" className="text-yellow-400 hover:underline">Forgot / Change Password?</Link>
        </p>
      </div>
    </div>
  );
}
