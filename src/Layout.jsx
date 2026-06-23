import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Function to handle active link and hover styles
  const linkStyles = ({ isActive }) =>
    `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-[#8B3A2A] text-white shadow-md scale-[1.02]" // Active state styling
        : "text-[#4B5563] hover:bg-[#FBF7F2] hover:text-[#8B3A2A] hover:pl-5" // Normal and hover state styling
    }`;

  return (
    <div className="min-h-screen flex bg-[#FBF7F2]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR */}
      <div 
        className="w-72 bg-white border-r border-[#F0E6D8] p-6 shadow-lg flex flex-col"
        style={{ borderRadius: "0px 24px 24px 0px" }} // Applied 24px border radius to the right side
      >
        {/* Heading - Playfair Display */}
        <h1 
          className="text-3xl font-bold mb-8 text-[#8B3A2A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Menu
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={linkStyles}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" className={linkStyles}>
            Profile
          </NavLink>
          <NavLink to="/wishlist" className={linkStyles}>
            Wishlist
          </NavLink>
          <NavLink to="/myorder" className={linkStyles}>
            My Orders
          </NavLink>
          <NavLink to="/tracking" className={linkStyles}>
            Order Tracking
          </NavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="mt-8 w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] shadow-md hover:shadow-lg active:scale-95"
        >
          Logout
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}