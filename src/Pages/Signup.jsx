import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      onSignup(data.user);
      navigate("/"); // ✅ Redirect to Home after signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
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
            Sign Up
          </button>
        </form>

        {/* Link back to login */}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
