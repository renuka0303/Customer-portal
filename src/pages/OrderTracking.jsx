import { useState } from "react";

function OrderTracking() {
  const steps = [
    { title: "Placed", desc: "Order confirmed and received. Your handcrafted items are undergoing final inspection." },
    { title: "Packed", desc: "Your items have been safely packed in premium eco-friendly custom casing." },
    { title: "Shipped", desc: "Package handed over to our verified courier partner and dispatched from Ranchi Hub." },
    { title: "Out for Delivery", desc: "Our delivery agent is near your location and expected to reach shortly." },
    { title: "Delivered", desc: "Order successfully handed over and received at your registered doorstep." },
  ];

  const [currentStep] = useState(3); // Default to Out for Delivery
  const [selectedStep, setSelectedStep] = useState(3);
  const [toastMessage, setToastMessage] = useState("");
  
  // Interactive Map States
  const [mapZoom, setMapZoom] = useState(1.2); 
  const [mapTheme, setMapTheme] = useState("terrain"); 
  const [showTraffic, setShowTraffic] = useState(true);

  const handleDownload = () => {
    const content = `
========================================
         HANDCRAFTED HERITAGE
           OFFICIAL INVOICE
========================================
Order ID      : JHC-12834
Date          : June 22, 2026
Tracking Step : ${steps[currentStep].title}
Courier Ref   : ABC-77129-IN
----------------------------------------
ITEM                        QTY  PRICE
----------------------------------------
Jharkraft Artisan Clay Pot     1   ₹1,299
----------------------------------------
SUBTOTAL                           ₹1,299
TAX (GST 5%)                       ₹0.00
----------------------------------------
TOTAL PAID                         ₹1,299
========================================
Thank you for supporting local artisans!
========================================
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice-JHC-12834.txt";
    a.click();

    URL.revokeObjectURL(url);
    
    setToastMessage("Invoice downloaded successfully!");
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] p-4 sm:p-6 text-[#1E1612] relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 bg-[#8B3A2A] text-white px-5 py-3 rounded-xl shadow-xl border border-[#D4A24C] text-center sm:text-left text-xs sm:text-sm font-semibold">
          ✨ {toastMessage}
        </div>
      )}

      {/* Main Track Card Wrapper */}
      <div className="max-w-6xl mx-auto bg-white border border-[#F0E6D8] rounded-[24px] p-5 sm:p-8 shadow-lg hover:shadow-2xl hover:border-[#D4A24C] transition-all duration-300">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-10 w-full">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
              Order #JHC-12834
            </p>
            <h1 
              className="text-3xl sm:text-4xl font-bold text-[#1E1612]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {steps[currentStep].title}
            </h1>
          </div>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto text-center px-6 py-2.5 border-2 border-[#8B3A2A] text-[#8B3A2A] rounded-xl font-bold text-xs sm:text-sm bg-transparent transition-all duration-300 hover:bg-[#8B3A2A] hover:text-white active:scale-95 shadow-sm"
          >
            Download Invoice
          </button>
        </div>

        {/* 1. DESKTOP TIMELINE: Horizontal view for medium and larger screens */}
        <div className="relative hidden md:flex justify-between items-center mb-12 px-2 py-4">
          <div className="absolute top-9 left-12 right-12 h-1 bg-[#F0E6D8] z-0"></div>
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center w-full min-w-[100px] relative z-10 cursor-pointer group"
                onClick={() => setSelectedStep(index)}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all duration-300 ${
                    isDone ? "bg-[#8B3A2A] text-white" : isActive ? "bg-[#8B3A2A] ring-4 ring-[#D4A24C]/40" : "bg-white border-[#F0E6D8]"
                  }`}
                >
                  {isDone ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isActive ? (
                    <div className="w-3.5 h-3.5 bg-[#D4A24C] rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-[#F0E6D8]"></div>
                  )}
                </div>
                <p className={`mt-3 text-xs tracking-wide transition-colors duration-200 ${isActive ? "text-[#8B3A2A] font-bold" : "isDone" ? "text-[#1E1612] font-semibold" : "text-[#4B5563]"}`}>
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE TIMELINE: Vertical view for small screens */}
        <div className="block md:hidden mb-8 pl-4 relative border-l-2 border-[#F0E6D8] space-y-5 ml-2">
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div 
                key={index} 
                className="relative cursor-pointer"
                onClick={() => setSelectedStep(index)}
              >
                {/* Timeline dot icon */}
                <div 
                  className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full border-2 border-white shadow flex items-center justify-center transition-all ${
                    isDone ? "bg-[#8B3A2A]" : isActive ? "bg-[#8B3A2A] ring-2 ring-[#D4A24C]/40" : "bg-white border-[#F0E6D8]"
                  }`}
                >
                  {isDone && <span className="text-[10px] text-white">✓</span>}
                  {isActive && <div className="w-1.5 h-1.5 bg-[#D4A24C] rounded-full animate-pulse"></div>}
                </div>
                
                {/* Content */}
                <div className="pl-2">
                  <p className={`text-xs ${isActive ? "text-[#8B3A2A] font-bold" : "text-[#1E1612] font-medium"}`}>
                    {step.title} {isActive && "• (Current Status)"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Selected Step Context Segment */}
        <div className="bg-[#FBF7F2] border border-[#F0E6D8] rounded-[18px] p-4 sm:p-5 mb-8 sm:mb-10 transition-all duration-300">
          <div className="flex items-start gap-3">
            <span className="text-lg sm:text-xl mt-0.5">📍</span>
            <div>
              <h4 className="font-bold text-[#8B3A2A] text-xs sm:text-sm uppercase tracking-wide">
                Status Update ({steps[selectedStep].title})
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                {steps[selectedStep].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Layout Split: Vector Map & Live Status Logs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Column Left: Visual Map Illustration Mockup */}
          <div className="md:col-span-3 bg-[#FBF7F2] border border-[#F0E6D8] rounded-[24px] min-h-[320px] sm:min-h-[380px] relative overflow-hidden p-4 shadow-inner">
            
            {/* SVG MAP CONTAINER WITH SCALE ZOOM */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out"
              style={{ transform: `scale(${mapZoom})`, transformOrigin: "center" }}
            >
              <svg className="w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0E6D8" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C4E0E5" />
                    <stop offset="100%" stopColor="#4CA1AF" />
                  </linearGradient>
                  <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2D9C8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D2C5B4" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {mapTheme === "schematic" ? (
                  <rect width="100%" height="100%" fill="#FFFFFF" />
                ) : (
                  <rect width="100%" height="100%" fill="#FBF7F2" />
                )}
                <rect width="100%" height="100%" fill="url(#mapGrid)" />

                {mapTheme === "terrain" && (
                  <>
                    <path d="M-50,220 Q180,280 290,120 T650,200" fill="none" stroke="url(#riverGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.75" />
                    <path d="M-50,220 Q180,280 290,120 T650,200" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5,15" opacity="0.3" />
                    <path d="M400,50 Q480,20 520,110 T460,220 Z" fill="url(#forestGrad)" />
                    <text x="440" y="95" fill="#8B7B6B" fontSize="10" className="italic" style={{ fontFamily: "Playfair Display" }}>Artisan Reserves</text>
                  </>
                )}

                <path d="M50,300 Q150,120 280,220 T520,80" fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" />
                <path d="M50,300 Q150,120 280,220 T520,80" fill="none" stroke="#F0E6D8" strokeWidth="8" strokeLinecap="round" />
                
                {showTraffic && (
                  <path d="M50,300 Q150,120 280,220" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                )}
                {showTraffic && (
                  <path d="M280,220 Q400,270 520,80" fill="none" stroke="#8B3A2A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                )}

                <path d="M50,300 Q150,120 280,220 T520,80" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6,8" />

                {/* Point 1 */}
                <g transform="translate(90, 240)">
                  <circle r="12" fill="#FFFFFF" stroke="#8B3A2A" strokeWidth="2" />
                  <circle r="6" fill="#8B3A2A" />
                  <text x="18" y="4" fill="#1E1612" fontSize="11" fontWeight="700">Ranchi Hub</text>
                </g>

                {/* Point 2 */}
                <g transform="translate(260, 210)">
                  <circle r="10" fill="#FFFFFF" stroke="#D4A24C" strokeWidth="2" />
                  <circle r="5" fill="#D4A24C" />
                  <text x="15" y="-10" fill="#4B5563" fontSize="10" fontWeight="600">Transit Center</text>
                </g>

                {/* Point 3 */}
                <g transform="translate(480, 110)">
                  <circle r="14" fill="#FFFFFF" stroke="#8B3A2A" strokeWidth="3" />
                  <path d="M-6,3 L-6,-3 L0,-8 L6,-3 L6,3 Z" fill="none" stroke="#8B3A2A" strokeWidth="2" />
                  <path d="M-2,3 L-2,0 L2,0 L2,3" fill="none" stroke="#8B3A2A" strokeWidth="2" />
                  <text x="-40" y="-18" fill="#1E1612" fontSize="12" fontWeight="800" style={{ fontFamily: "Playfair Display" }}>Home</text>
                </g>

                {/* Van */}
                <g transform="translate(380, 175)">
                  <ellipse cx="0" cy="12" rx="18" ry="5" fill="#1E1612" opacity="0.15" />
                  <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#8B3A2A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M14,-8 L20,-2 L20,8 L14,8 Z" fill="#8B3A2A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="-8" cy="10" r="4" fill="#1E1612" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="10" cy="10" r="4" fill="#1E1612" stroke="#FFFFFF" strokeWidth="1" />
                  <circle r="22" fill="none" stroke="#8B3A2A" strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                  <text x="-25" y="-15" fill="#8B3A2A" fontSize="10" fontWeight="800">Courier</text>
                </g>
              </svg>
            </div>

            {/* MAP CONTROL OVERLAYS - Top Right */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
              <button onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 2.0))} className="w-8 h-8 rounded-lg bg-white border border-[#F0E6D8] text-sm flex items-center justify-center shadow-md font-bold">＋</button>
              <button onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))} className="w-8 h-8 rounded-lg bg-white border border-[#F0E6D8] text-sm flex items-center justify-center shadow-md font-bold">－</button>
              <button onClick={() => setMapZoom(1.2)} className="w-8 h-8 rounded-lg bg-white border border-[#F0E6D8] text-xs flex items-center justify-center shadow-md">🎯</button>
            </div>

            {/* MAP LAYERS PANEL - Bottom Right */}
            <div className="absolute bottom-3 right-3 flex gap-1 z-20 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-[#F0E6D8] shadow-md max-w-[calc(100%-24px)] overflow-x-auto">
              <button onClick={() => setMapTheme("terrain")} className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${mapTheme === "terrain" ? "bg-[#8B3A2A] text-white" : "text-[#4B5563]"}`}>Terrain</button>
              <button onClick={() => setMapTheme("schematic")} className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${mapTheme === "schematic" ? "bg-[#8B3A2A] text-white" : "text-[#4B5563]"}`}>Grid</button>
              <button onClick={() => setShowTraffic(prev => !prev)} className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-all ${showTraffic ? "border-[#22C55E] text-[#22C55E] bg-green-50" : "border-gray-200 text-gray-400"}`}>Traffic</button>
            </div>

            {/* LIVE DASHBOARD STATUS BADGES - Top Left */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 max-w-[150px] sm:max-w-[190px]">
              <span className="bg-white/95 backdrop-blur-sm border border-[#F0E6D8] px-2.5 py-1 text-[10px] font-bold rounded-lg text-[#1E1612] shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#8B3A2A] rounded-full animate-ping"></span>
                Live GPS
              </span>
              <div className="bg-[#8B3A2A] text-white p-2 rounded-lg shadow-lg text-[9px] sm:text-[10px] space-y-0.5">
                <p className="font-bold text-xs">3.4 km Away</p>
                <p className="opacity-80 text-[8px] sm:text-[9px]">Heavy Traffic Route</p>
              </div>
            </div>
          </div>

          {/* Column Right: Live Dispatch Log List */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-5 sm:space-y-6">
            <h3 
              className="text-lg sm:text-xl font-bold text-[#1E1612] border-b border-[#F0E6D8] pb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Transit Activity
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <span className="text-green-600 text-sm mt-0.5">✓</span>
                <div>
                  <p className="text-[10px] text-[#4B5563] font-medium">June 20, 09:30 AM</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1E1612]">Dispatched from Ranchi Hub</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-green-600 text-sm mt-0.5">✓</span>
                <div>
                  <p className="text-[10px] text-[#4B5563] font-medium">June 21, 02:45 PM</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1E1612]">In transit · Kolkata Center</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#8B3A2A] text-sm mt-0.5 animate-pulse">●</span>
                <div>
                  <p className="text-[10px] text-[#8B3A2A] font-bold">June 22, 08:00 AM</p>
                  <p className="text-xs sm:text-sm font-bold text-[#8B3A2A]">Out for delivery — Courier ABC</p>
                </div>
              </div>
            </div>

            {/* Estimated Arrival Segment */}
            <div className="bg-[#FBF7F2] p-3 sm:p-4 rounded-xl border border-[#F0E6D8]">
              <p className="text-[10px] text-[#4B5563] uppercase font-bold tracking-wider mb-0.5">Estimated Arrival</p>
              <p className="text-lg sm:text-xl font-black text-[#8B3A2A]" style={{ fontFamily: "'Playfair Display', serif" }}>Today by 6:00 PM</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderTracking;