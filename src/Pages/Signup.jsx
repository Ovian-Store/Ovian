// src/Pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const newUser = { name, email };
    onSignup(newUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-4">
      <div className="card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

        <input type="text" placeholder="Name" className="w-full p-2 mb-4 rounded bg-white/5 text-white focus:outline-none" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 rounded bg-white/5 text-white focus:outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-white/5 text-white focus:outline-none" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleSignup} className="btn-white w-full py-2 rounded font-bold">Sign Up</button>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
