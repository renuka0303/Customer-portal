import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import jharkhandImg from "../assets/jharkhand.jpg";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "#FBF7F2", fontFamily: "'Inter', sans-serif" }}
    >
      {/* MAIN CARD CONTAINER */}
      <div className="w-full max-w-6xl bg-white border border-[#F0E6D8] rounded-[24px] shadow-lg overflow-hidden hover:shadow-2xl hover:border-[#D4A24C] transition-all duration-300">
        
        {/* RESPONSIVE GRID Layout: 1 column on mobile, 2 columns on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT IMAGE SECTION */}
          <div
            className="flex items-center justify-center p-6 md:p-10"
            style={{ backgroundColor: "#FBF7F2" }}
          >
            {/* Image Box Height scales dynamically across screen layouts */}
            <div
              className="w-full h-[230px] sm:h-[300px] md:h-[450px] border rounded-2xl overflow-hidden"
              style={{ borderColor: "#F0E6D8" }}
            >
              <img
                src={jharkhandImg}
                alt="Jharkhand Tribal Dance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="p-6 md:p-10 flex items-center">
            <div className="w-full max-w-md mx-auto">
              
              <h1
                className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center md:text-left"
                style={{
                  color: "#1E1612",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Welcome Back
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* INPUT FIELD: USERNAME / EMAIL */}
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Email or Mobile"
                  className="w-full p-3 border rounded-lg focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                  style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                  required
                />

                {/* INPUT FIELD: PASSWORD */}
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                  style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                  required
                />

                {/* PRIMARY LOGIN BUTTON */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] active:scale-[0.99] shadow-sm cursor-pointer"
                >
                  Login
                </button>
              </form>

              {/* FOOTER LINK TEXT */}
              <p
                className="text-center mt-6 text-sm"
                style={{ color: "#4B5563" }}
              >
                New here?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#8B3A2A",
                    fontWeight: "600",
                  }}
                  className="hover:underline transition-all hover:text-[#6D2D22]"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;