import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import registrationImg from "../assets/registration.jpg";

const indiaData = {
  Jharkhand: ["Ranchi", "Dhanbad", "Jamshedpur", "Hazaribagh", "Bokaro"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  Delhi: ["New Delhi", "Central Delhi", "South Delhi", "North Delhi"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool", "Anantapur", "Rajamahendravaram"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahabubnagar", "Nalgonda"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Vellore"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra", "Varanasi", "Prayagraj", "Ghaziabad", "Meerut"]
};

function Registration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    state: "Jharkhand",
    district: "",
  });
  
  const [isRegistered, setIsRegistered] = useState(false);

  // Dropdown Open/Close states for forcing downward behavior
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const stateRef = useRef(null);
  const districtRef = useRef(null);

  // Close dropdowns when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setShowDistrictDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSelectCustom = (name, value) => {
    if (name === "state") {
      setForm({
        ...form,
        state: value,
        district: "", // Reset district when state changes
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
    setShowStateDropdown(false);
    setShowDistrictDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form Data Submitted:", form);
    setIsRegistered(true); 
    setTimeout(() => {
      setIsRegistered(false);
    }, 5000);
  };

  const districts = indiaData[form.state] || [];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative"
      style={{ backgroundColor: "#FBF7F2", fontFamily: "'Inter', sans-serif" }}
    >
      {/* SUCCESS NOTIFICATION BANNER */}
      {isRegistered && (
        <div 
          className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 px-5 py-3 rounded-xl shadow-xl border text-white transition-all duration-300 animate-fade-in flex items-center justify-between sm:justify-start gap-3"
          style={{ 
            backgroundColor: "#8B3A2A", 
            borderColor: "#D4A24C" 
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">✨</span>
            <p className="font-bold text-sm">Registered successfully</p>
          </div>
          <button 
            onClick={() => setIsRegistered(false)} 
            className="text-white/80 hover:text-white font-bold text-sm focus:outline-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* CARD DESIGN */}
      <div className="w-full max-w-6xl bg-white border border-[#F0E6D8] rounded-[24px] shadow-lg overflow-hidden hover:shadow-2xl hover:border-[#D4A24C] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT SIDE IMAGE SECTION */}
          <div
            className="flex items-center justify-center p-6 md:p-10"
            style={{ backgroundColor: "#FBF7F2" }}
          >
            <div
              className="w-full h-[220px] md:h-[500px] border rounded-2xl overflow-hidden"
              style={{ borderColor: "#F0E6D8" }}
            >
              <img
                src={registrationImg}
                alt="Registration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-6 md:p-10 flex items-center">
            <div className="w-full max-w-md mx-auto">
              
              <h1
                className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center md:text-left"
                style={{
                  color: "#1E1612",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Registration
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="p-3 border rounded-lg w-full focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                    style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="p-3 border rounded-lg w-full focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                    style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex">
                  <span
                    className="px-4 flex items-center border rounded-l-lg text-sm"
                    style={{
                      borderColor: "#F0E6D8",
                      backgroundColor: "#FBF7F2",
                      color: "#4B5563",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                    className="w-full p-3 border rounded-r-lg focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                    style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                  style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                />

                {/* Password */}
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none placeholder-[#4B5563] focus:border-[#D4A24C] transition-colors bg-white"
                  style={{ borderColor: "#F0E6D8", color: "#1E1612" }}
                />

                {/* STATE & DISTRICT DROPDOWNS (Forced Downward Layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Custom State Dropdown */}
                  <div className="relative" ref={stateRef}>
                    <div 
                      onClick={() => { setShowStateDropdown(!showStateDropdown); setShowDistrictDropdown(false); }}
                      className="p-3 border rounded-lg text-sm bg-white focus:border-[#D4A24C] text-[#1E1612] cursor-pointer flex justify-between items-center transition-colors"
                      style={{ borderColor: "#F0E6D8" }}
                    >
                      <span className={form.state ? "text-[#1E1612]" : "text-[#4B5563]"}>
                        {form.state || "Select State"}
                      </span>
                      <span className="text-xs text-[#000000] opacity-70 select-none">▼</span>
                    </div>
                    
                    {showStateDropdown && (
                      <div className="absolute left-0 mt-1 w-full max-h-48 bg-white border border-[#F0E6D8] rounded-lg shadow-xl z-50 overflow-y-auto">
                        {Object.keys(indiaData).map((state) => (
                          <div 
                            key={state} 
                            onClick={() => handleSelectCustom("state", state)} 
                            className="p-2.5 text-sm text-[#1E1612] hover:bg-[#FBF7F2] cursor-pointer transition-colors bg-white"
                          >
                            {state}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Custom District Dropdown */}
                  <div className="relative" ref={districtRef}>
                    <div 
                      onClick={() => { setShowDistrictDropdown(!showDistrictDropdown); setShowStateDropdown(false); }}
                      className="p-3 border rounded-lg text-sm bg-white focus:border-[#D4A24C] text-[#1E1612] cursor-pointer flex justify-between items-center transition-colors"
                      style={{ borderColor: "#F0E6D8" }}
                    >
                      <span className={form.district ? "text-[#1E1612]" : "text-[#4B5563]"}>
                        {form.district || "Select District"}
                      </span>
                      <span className="text-xs text-[#000000] opacity-70 select-none">▼</span>
                    </div>
                    
                    {showDistrictDropdown && (
                      <div className="absolute left-0 mt-1 w-full max-h-48 bg-white border border-[#F0E6D8] rounded-lg shadow-xl z-50 overflow-y-auto">
                        {districts.length > 0 ? (
                          districts.map((district) => (
                            <div 
                              key={district} 
                              onClick={() => handleSelectCustom("district", district)} 
                              className="p-2.5 text-sm text-[#1E1612] hover:bg-[#FBF7F2] cursor-pointer transition-colors bg-white"
                            >
                              {district}
                            </div>
                          ))
                        ) : (
                          <div className="p-2.5 text-xs text-[#4B5563] bg-white italic">
                            Please select a state first
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>

                {/* PRIMARY BUTTON */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] active:scale-[0.99] shadow-sm cursor-pointer"
                >
                  Create Account
                </button>
              </form>

              {/* LOGIN LINK */}
              <p className="text-center mt-6 text-sm" style={{ color: "#4B5563" }}>
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{ color: "#8B3A2A", fontWeight: "600" }}
                  className="hover:underline transition-all hover:text-[#6D2D22]"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Registration;