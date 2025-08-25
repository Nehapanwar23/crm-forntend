import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const passwordChecks = (pwd) => {
  return {
    length: pwd.length >= 6,
    digit: /\d/.test(pwd),
    letter: /[A-Za-z]/.test(pwd),
  };
};

export default function Signup() {
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email");
    const checks = passwordChecks(password);
    if (!checks.length || !checks.digit || !checks.letter)
      return setError("Password must be 6+ chars and include letters & numbers");
    if (password !== confirm) return setError("Passwords do not match");

    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://crm-backend-z4ok.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  const checks = passwordChecks(password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="auth-card">
        <h1 className="text-3xl font-bold text-center mb-6">Create account</h1>
        <p className="text-center text-gray-600 mb-6">Sign up to get started</p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li>• {checks.length ? "✓" : "✗"} At least 6 characters</li>
              <li>• {checks.letter ? "✓" : "✗"} Contains a letter</li>
              <li>• {checks.digit ? "✓" : "✗"} Contains a number</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl py-2 font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}