import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://ovian-store.github.io/Ovian/update-password",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link sent to your email!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Link back to login */}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
