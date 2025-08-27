import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">My Portfolio</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-700">Profile</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Portfolio Section */}
      <main className="px-8 py-12 max-w-6xl mx-auto">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-2 text-gray-800">
            Hi, I'm Neha Panwar
          </h2>
          <p className="text-gray-600 text-lg">
            Frontend Developer | React Enthusiast | UI/UX Designer
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Project Cards */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">CRM System</h3>
            <p className="text-gray-500 mb-4">
              A complete customer relationship management tool with React &
              Node.js.
            </p>
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              View Project →
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
            <p className="text-gray-500 mb-4">
              Personal portfolio site showcasing skills and projects.
            </p>
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              View Project →
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">E-commerce UI</h3>
            <p className="text-gray-500 mb-4">
              Designed and implemented an e-commerce UI with modern aesthetics.
            </p>
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              View Project →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
