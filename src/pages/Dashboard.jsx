import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("https://crm-backend-z4ok.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="auth-card text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mb-6">
          This route is protected. You can only see this after logging in.
        </p>
        <button
          onClick={handleLogout}
          className="rounded-xl px-4 py-2 font-semibold bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}