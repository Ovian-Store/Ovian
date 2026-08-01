// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    // placeholder fake login for now
    const fakeUser = { email };
    onLogin(fakeUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-4">
      <div className="card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

        <input type="email" placeholder="Email" className="w-full p-2 mb-4 rounded bg-white/5 text-white focus:outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-white/5 text-white focus:outline-none" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleEmailLogin} className="btn-white w-full py-2 rounded font-bold">Login</button>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Don’t have an account? <Link to="/signup" className="underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
