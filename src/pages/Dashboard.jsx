import handmadeImg from "../assets/Jharkhand Handmade Item.jpg";
import tribalImg from "../assets/Tribal Art Craft.jpg";
import ecoImg from "../assets/Eco Handmade Goods.jpg";

export default function Dashboard() {
  const products = [
    {
      name: "Jharkhand Handmade Item",
      price: "₹499",
      image: handmadeImg,
    },
    {
      name: "Tribal Art Craft",
      price: "₹799",
      image: tribalImg,
    },
    {
      name: "Eco Handmade Goods",
      price: "₹599",
      image: ecoImg,
    },
  ];

  return (
    <div
      className="w-full min-h-screen bg-[#FBF7F2] px-2 md:px-6 py-6 text-[#1E1612]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide"
          style={{
            color: "#1E1612",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Dashboard
        </h1>
      </div>

      {/* STATS CARDS */}
      <div className="flex overflow-x-auto gap-4 pb-2 md:grid md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Orders", value: 14, icon: "📦" },
          { label: "Wishlist", value: 32, icon: "❤️" },
          { label: "Saved", value: "₹4,200", icon: "💰" },
          { label: "Rewards", value: "280 pts", icon: "✨" },
        ].map((item, i) => (
          <div
            key={i}
            className="min-w-[220px] md:min-w-0 bg-white p-5 md:p-6 rounded-[24px] shadow-lg border border-[#F0E6D8] hover:border-[#D4A24C] hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm md:text-base font-medium text-[#4B5563] group-hover:text-[#8B3A2A] transition-colors">
                {item.label}
              </p>

              <span
                className="text-lg md:text-xl p-2 rounded-lg border"
                style={{
                  backgroundColor: "#FBF7F2",
                  borderColor: "#F0E6D8",
                }}
              >
                {item.icon}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1E1612] break-words">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-12">
        <h2
          className="text-xl sm:text-2xl font-bold mb-5 text-[#1E1612]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-[650px] bg-white rounded-[24px] shadow-lg border border-[#F0E6D8] overflow-hidden hover:border-[#D4A24C] hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-4 font-semibold text-sm text-[#4B5563] p-5 bg-[#FBF7F2] border-b border-[#F0E6D8]">
              <div>Order</div>
              <div>Item</div>
              <div>Status</div>
              <div>Amount</div>
            </div>

            {[
              {
                id: "#1001",
                item: "Jharkhand Bag",
                status: "Delivered",
                price: "₹899",
                statusBg:
                  "bg-green-50 text-green-700 border-green-200",
              },
              {
                id: "#1002",
                item: "Handmade Craft",
                status: "Processing",
                price: "₹1,299",
                statusBg:
                  "bg-amber-50 text-amber-700 border-amber-200",
              },
            ].map((o, i) => (
              <div
                key={i}
                className="grid grid-cols-4 text-sm p-5 border-b border-[#F0E6D8] last:border-none items-center hover:bg-[#FBF7F2]/50 transition-colors"
              >
                <div className="font-semibold text-[#8B3A2A]">
                  {o.id}
                </div>

                <div className="text-[#1E1612] font-medium">
                  {o.item}
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${o.statusBg}`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="font-semibold text-[#1E1612]">
                  {o.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      <div className="mt-12">
        <h2
          className="text-xl sm:text-2xl font-bold mb-5 text-[#1E1612]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Recommended for you
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-[24px] shadow-lg border border-[#F0E6D8] hover:border-[#D4A24C] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded-[18px] mb-4 border border-[#F0E6D8]"
                />

                <p className="font-semibold text-[#1E1612] text-lg mb-1">
                  {p.name}
                </p>

                <p className="text-[#8B3A2A] font-bold text-xl mb-4">
                  {p.price}
                </p>
              </div>

              <button
                className="w-full py-3 border-2 font-bold rounded-xl transition-all duration-300 text-sm bg-transparent active:scale-[0.98]"
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
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}