import { useState, useRef, useEffect } from "react";

function Profile() {
  // State for the user's avatar image
  const [image, setImage] = useState(null);

  // Pan-India Expanded Districts list including requested states
  const districtsList = [
    "Hyderabad", "Rangareddy", "Warangal", "Visakhapatnam", "Vijayawada (NTR)", "Guntur", "Tirupati",
    "Ranchi", "East Singhbhum (Jamshedpur)", "Dhanbad", "Bokaro",
    "Mumbai City", "Pune", "Nagpur", "Thane", "Nashik",
    "New Delhi", "North Delhi", "South Delhi",
    "Bengaluru Urban", "Mysuru", "Hubballi-Dharwad", "Mangaluru",
    "Thiruvananthapuram", "Ernakulam (Kochi)", "Kozhikode",
    "Ahmedabad", "Surat", "Vadodara", "Rajkot",
    "Jaipur", "Jodhpur", "Udaipur", "Kota",
    "Patna", "Gaya", "Muzaffarpur", "Bhagalpur"
  ].sort();

  // Pan-India Expanded Cities list
  const citiesList = [
    "Kukatpally", "Gachibowli", "Madhapur", "Secunderabad", "Hanamkonda", "Gajuwaka", "Benz Circle",
    "Lalpur", "Bistupur", "Sakchi", "Jharia", "Chas",
    "Andheri", "Hadapsar", "Wakad", "Thane West", "Deolali",
    "Connaught Place", "Dwarka", "Saket", "Karol Bagh",
    "Whitefield", "Koramangala", "Indiranagar", "Gokulam", "Hebbal",
    "Kaloor", "Kakkanad", "Palayam", "Mananchira",
    "Satellite", "Adajan", "Alkapuri", "Kalawad Road",
    "Vaishali Nagar", "Malviya Nagar", "Sardarpura", "Vigyan Nagar",
    "Kankatbagh", "Boring Road", "AP Colony", "Mithanpura"
  ].sort();

  // Profile details form state
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    district: "",
    pin: "",
  });

  // Controls forcing dropdown lists DOM direction downwards safely
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const cityRef = useRef(null);
  const districtRef = useRef(null);

  // Close dropdown menu when clicking outside container boundary
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setShowDistrictDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Password reset state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Control visibility of the change password modal
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  // Custom premium notification toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Show customized in-app notifications
  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectCustom = (name, value) => {
    setForm({ ...form, [name]: value });
    setShowCityDropdown(false);
    setShowDistrictDropdown(false);
  };

  // Process selected image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      triggerToast("Photo uploaded successfully!", "success");
    }
  };

  // Validate and save profile details
  const handleSave = () => {
    if (!form.name || !form.mobile) {
      triggerToast("Name and Mobile fields are required!", "error");
      return;
    }
    localStorage.setItem("profile", JSON.stringify(form));
    triggerToast("Profile details saved successfully!", "success");
  };

  // Process secure password updates
  const handlePasswordChange = () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      triggerToast("Please fill out both password fields!", "error");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      triggerToast("New password must be at least 6 characters long!", "error");
      return;
    }

    localStorage.setItem("password", passwordData.newPassword);
    triggerToast("Password updated successfully!", "success");
    setShowPasswordBox(false);
    setPasswordData({ oldPassword: "", newPassword: "" });
  };

  return (
    <div 
      className="min-h-screen bg-[#FBF7F2] p-6 flex items-center justify-center text-[#1E1612] relative" 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      
      {/* PREMIUM IN-APP TOAST NOTIFICATION CONTAINER */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[100] animate-bounce">
          <div className={`px-6 py-4 rounded-[16px] shadow-2xl border text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
            toast.type === "error" 
              ? "bg-rose-50 border-rose-200 text-rose-800" 
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}>
            <span>{toast.type === "error" ? "⚠️" : "✨"}</span>
            {toast.message}
          </div>
        </div>
      )}

      {/* MAIN CARD CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-lg border border-[#F0E6D8] hover:border-[#D4A24C] hover:shadow-2xl transition-all duration-300 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">          
          {/* LEFT SIDE: AVATAR CONTAINER */}
          <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-[#FBF7F2]/50 lg:border-r border-[#F0E6D8]">
            <div className="w-32 h-32 md:w-52 md:h-52 rounded-full border-2 bg-white flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.02]">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#4B5563] font-medium text-sm">Upload Photo</span>
              )}
            </div>

            <input type="file" id="upload" className="hidden" onChange={handleImage} />
            
            <label
              htmlFor="upload"
              className="mt-6 px-6 py-2.5 rounded-xl text-white font-medium cursor-pointer transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] shadow-md hover:shadow-lg active:scale-95 text-sm inline-block"
            >
              Upload Profile
            </label>
          </div>

          {/* RIGHT SIDE: PROFILE DETAILS FORM */}
          <div className="p-4 md:p-12 flex flex-col justify-center bg-white">
            <h1 
              className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[#1E1612]"               
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Profile Details
            </h1>

            <div className="space-y-4">
              <input 
                name="name" 
                type="text"
                value={form.name}
                placeholder="Name" 
                onChange={handleChange}
                className="w-full p-3.5 border border-[#F0E6D8] rounded-xl text-sm placeholder-[#4B5563]/60 bg-white outline-none focus:border-[#D4A24C] transition-colors text-[#1E1612]" 
              />
              
              <input 
                name="mobile" 
                type="tel"
                value={form.mobile}
                placeholder="Mobile" 
                onChange={handleChange}
                className="w-full p-3.5 border border-[#F0E6D8] rounded-xl text-sm placeholder-[#4B5563]/60 bg-white outline-none focus:border-[#D4A24C] transition-colors text-[#1E1612]" 
              />
              
              <input 
                name="email" 
                type="email"
                value={form.email}
                placeholder="Email" 
                onChange={handleChange}
                className="w-full p-3.5 border border-[#F0E6D8] rounded-xl text-sm placeholder-[#4B5563]/60 bg-white outline-none focus:border-[#D4A24C] transition-colors text-[#1E1612]" 
              />
              
              <input 
                name="address" 
                type="text"
                value={form.address}
                placeholder="Address" 
                onChange={handleChange}
                className="w-full p-3.5 border border-[#F0E6D8] rounded-xl text-sm placeholder-[#4B5563]/60 bg-white outline-none focus:border-[#D4A24C] transition-colors text-[#1E1612]" 
              />
              
              {/* FORCED DOWNWARDS DROPDOWNS WITH BLACK ARROWS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                
                {/* CITY DROPDOWN */}
                <div className="relative" ref={cityRef}>
                  <div 
                    onClick={() => { setShowCityDropdown(!showCityDropdown); setShowDistrictDropdown(false); }}
                    className="p-3.5 border border-[#F0E6D8] rounded-xl text-sm bg-white outline-none focus:border-[#D4A24C] text-[#1E1612] cursor-pointer flex justify-between items-center"
                  >
                    <span className={form.city ? "text-[#1E1612]" : "text-[#4B5563]/60"}>
                      {form.city || "Select City"}
                    </span>
                    <span className="text-xs text-[#000000] opacity-70 select-none">▼</span>
                  </div>
                  
                  {showCityDropdown && (
                    <div className="absolute left-0 mt-1 w-full max-h-60 bg-white border border-[#F0E6D8] rounded-xl shadow-xl z-50 overflow-y-auto">
                      {citiesList.map((city, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleSelectCustom("city", city)} 
                          className="p-3 text-sm text-[#1E1612] hover:bg-[#FBF7F2] cursor-pointer transition-colors bg-white"
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DISTRICT DROPDOWN */}
                <div className="relative" ref={districtRef}>
                  <div 
                    onClick={() => { setShowDistrictDropdown(!showDistrictDropdown); setShowCityDropdown(false); }}
                    className="p-3.5 border border-[#F0E6D8] rounded-xl text-sm bg-white outline-none focus:border-[#D4A24C] text-[#1E1612] cursor-pointer flex justify-between items-center"
                  >
                    <span className={form.district ? "text-[#1E1612]" : "text-[#4B5563]/60"}>
                      {form.district || "Select District"}
                    </span>
                    <span className="text-xs text-[#000000] opacity-70 select-none">▼</span>
                  </div>
                  
                  {showDistrictDropdown && (
                    <div className="absolute left-0 mt-1 w-full max-h-60 bg-white border border-[#F0E6D8] rounded-xl shadow-xl z-50 overflow-y-auto">
                      {districtsList.map((district, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleSelectCustom("district", district)} 
                          className="p-3 text-sm text-[#1E1612] hover:bg-[#FBF7F2] cursor-pointer transition-colors bg-white"
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              <input 
                name="pin" 
                type="text"
                value={form.pin}
                placeholder="PIN Code" 
                onChange={handleChange}
                className="w-full p-3.5 border border-[#F0E6D8] rounded-xl text-sm placeholder-[#4B5563]/60 bg-white outline-none focus:border-[#D4A24C] transition-colors text-[#1E1612]" 
              />

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4"> 
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl text-white font-semibold transition-all duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] shadow-md hover:shadow-lg active:scale-[0.98] text-sm"
                >
                  Save
                </button>
                
                <button
                  onClick={() => setShowPasswordBox(true)}
                  className="flex-1 py-3 rounded-xl border-2 font-semibold bg-transparent transition-all duration-300 active:scale-[0.98] text-sm"
                  style={{
                    borderColor: "#8B3A2A",
                    color: "#8B3A2A",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#8B3A2A";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#8B3A2A";
                  }}
                >
                  Change Password
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* PASSWORD MODAL CONTAINER */}
      {showPasswordBox && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-[24px] w-full max-w-sm shadow-2xl border border-[#F0E6D8]">
            <h2 
              className="text-2xl font-bold text-[#1E1612] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Change Password
            </h2>
            
            <div className="space-y-3 mb-6">
              <input
                type="password"
                value={passwordData.oldPassword}
                placeholder="Old Password"
                className="w-full p-3 border border-[#F0E6D8] rounded-xl text-sm outline-none focus:border-[#D4A24C] placeholder-[#4B5563]/60 text-[#1E1612]"
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
              />
              <input
                type="password"
                value={passwordData.newPassword}
                placeholder="New Password"
                className="w-full p-3 border border-[#F0E6D8] rounded-xl text-sm outline-none focus:border-[#D4A24C] placeholder-[#4B5563]/60 text-[#1E1612]"
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePasswordChange}
                className="flex-1 bg-[#8B3A2A] hover:bg-[#6D2D22] text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md active:scale-[0.98]"
              >
                Update
              </button>
              <button
                onClick={() => setShowPasswordBox(false)}
                className="flex-1 border-2 font-semibold py-2.5 rounded-xl text-sm transition-all duration-300 active:scale-[0.98]"
                style={{
                  borderColor: "#8B3A2A",
                  color: "#8B3A2A",
                  backgroundColor: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#8B3A2A";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#8B3A2A";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Profile;