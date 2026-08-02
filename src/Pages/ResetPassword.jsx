import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password"
    });
    if (error) alert(error.message);
    else alert("Password reset link sent! Check your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-4 rounded bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleReset}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
