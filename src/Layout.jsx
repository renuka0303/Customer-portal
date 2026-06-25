import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const linkStyles = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-[#8B3A2A] text-white shadow-md"
        : "text-[#4B5563] hover:bg-[#FBF7F2] hover:text-[#8B3A2A]"
    }`;

  return (
    <div
      className="min-h-screen bg-[#FBF7F2]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white shadow-md border-b border-[#F0E6D8] px-4 py-3 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-[#8B3A2A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Menu
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-[#8B3A2A]"
        >
          ☰
        </button>
      </div>

      <div className="flex">
        {/* SIDEBAR DESKTOP */}
        <div
          className={`
            fixed md:static
            top-0 left-0
            h-full
            w-72
            bg-white
            border-r
            border-[#F0E6D8]
            p-6
            shadow-lg
            z-50
            transform
            transition-transform
            duration-300
            ${
              menuOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          <h1
            className="text-3xl font-bold mb-8 text-[#8B3A2A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Menu
          </h1>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              className={linkStyles}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              className={linkStyles}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>

            <NavLink
              to="/wishlist"
              className={linkStyles}
              onClick={() => setMenuOpen(false)}
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/myorder"
              className={linkStyles}
              onClick={() => setMenuOpen(false)}
            >
              My Orders
            </NavLink>

            <NavLink
              to="/tracking"
              className={linkStyles}
              onClick={() => setMenuOpen(false)}
            >
              Order Tracking
            </NavLink>
          </nav>

          <button
            onClick={logout}
            className="mt-8 w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22]"
          >
            Logout
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* CONTENT AREA */}
        <div className="flex-1 md:ml-0 p-4 md:p-8 min-w-0 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
