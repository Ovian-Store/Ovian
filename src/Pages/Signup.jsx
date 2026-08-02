import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone } // store extra fields in user metadata
      }
    });
    if (error) {
      alert(error.message);
    } else {
      onSignup(data.user);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Create Account</h2>

        <input type="text" placeholder="Full Name"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input type="text" placeholder="Phone Number"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={phone} onChange={(e) => setPhone(e.target.value)} />

        <input type="email" placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleSignup}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition">
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
