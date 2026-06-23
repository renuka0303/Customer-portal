import { useEffect, useState } from "react";

import bambooBasketImg from "../assets/Bamboo Basket.jpg";
import handwovenBagImg from "../assets/Handwoven Bag.jpg";
import handcraftBowlImg from "../assets/Handcraft Bowl.jpg";
import wallArtImg from "../assets/Wall Art.jpg";
import clayPotsImg from "../assets/Clay Pots.jpg";
import handwovenShawlImg from "../assets/Handwoven Shawl.jpg";
import handmadeSareeImg from "../assets/Handmade Sarees.jpg";
import brassLanternImg from "../assets/Brass Lantern.jpg";

const initialProducts = [
  {
    id: 1,
    name: "Bamboo Basket",
    price: 499,
    liked: true,
    category: "Home Decor",
    image: bambooBasketImg,
  },
  {
    id: 2,
    name: "Handwoven Bag",
    price: 799,
    liked: true,
    category: "Accessories",
    image: handwovenBagImg,
  },
  {
    id: 3,
    name: "Handcraft Bowl",
    price: 999,
    liked: true,
    category: "Kitchenware",
    image: handcraftBowlImg,
  },
  {
    id: 4,
    name: "Wall Art",
    price: 599,
    liked: true,
    category: "Wall Decor",
    image: wallArtImg,
  },
  {
    id: 5,
    name: "Clay Pots",
    price: 699,
    liked: true,
    category: "Pottery",
    image: clayPotsImg,
  },
  {
    id: 6,
    name: "Handwoven Shawl",
    price: 1199,
    liked: true,
    category: "Apparel",
    image: handwovenShawlImg,
  },
  {
    id: 7,
    name: "Handmade Saree",
    price: 749,
    liked: true,
    category: "Clothing",
    image: handmadeSareeImg,
  },
  {
    id: 8,
    name: "Brass Lantern",
    price: 499,
    liked: true,
    category: "Accessories",
    image: brassLanternImg,
  },
];

function Wishlist() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const toggleLike = (id, name) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedLike = !item.liked;
          triggerToast(
            updatedLike
              ? `Added ${name} back to favorites!`
              : `Removed ${name} from favorites!`
          );
          return { ...item, liked: updatedLike };
        }
        return item;
      })
    );
  };

  const removeItem = (id, name) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    triggerToast(`Removed ${name} from your wishlist.`);
  };

  const clearAllItems = () => {
    setItems([]);
    triggerToast("Cleared your entire wishlist.");
  };

  return (
    <div
      className="min-h-screen bg-[#FBF7F2] p-4 sm:p-8 text-[#1E1612]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* TOAST NOTIFICATION: Adjusted layout width for fluid mobile responsiveness */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[100] animate-bounce">
          <div className="px-5 py-3.5 rounded-[16px] bg-[#FFFFFF] border border-[#F0E6D8] shadow-2xl text-sm font-semibold flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-[#8B3A2A]">✨</span>
            <span className="text-[#1E1612]">{toast.message}</span>
          </div>
        </div>
      )}

      {/* HEADER SECTION: Flexible alignment for title and utility action buttons on mobile screens */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-6 sm:mb-10">
        <div>
          <h1
            className="text-2xl sm:text-4xl font-bold tracking-tight"
            style={{ 
              color: "#1E1612",
              fontFamily: "'Playfair Display', serif" 
            }}
          >
            My Wishlist
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearAllItems}
            className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-300 bg-transparent active:scale-95 whitespace-nowrap"
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
            Clear Wishlist
          </button>
        )}
      </div>

      {/* WISHLIST ITEMS GRID: Adaptive layout shifting from 2 columns up to 4 columns dynamically */}
      <div className="max-w-7xl mx-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[20px] sm:rounded-[24px] shadow-sm hover:shadow-2xl border border-[#F0E6D8] hover:border-[#D4A24C] transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* IMAGE CONTAINER: Proportional image bounds configured for mobile aspect ratio */}
                <div className="h-40 sm:h-56 w-full relative overflow-hidden bg-[#FBF7F2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* CATEGORY TAG: Clean styling scaling down smoothly on small display views */}
                  <span 
                    className="absolute top-2 left-2 sm:top-3 sm:left-3 border text-[8px] sm:text-[10px] font-bold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#4B5563]"
                    style={{ borderColor: "#F0E6D8" }}
                  >
                    {item.category}
                  </span>

                  {/* LIKE BUTTON */}
                  <button
                    onClick={() => toggleLike(item.id, item.name)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg sm:text-xl transition-transform active:scale-90"
                  >
                    <span
                      style={{
                        color: item.liked ? "#8B3A2A" : "#D1D5DB",
                      }}
                    >
                      {item.liked ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* DETAILS CONTAINER */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h2 className="font-semibold text-sm sm:text-base mb-1 text-[#1E1612] line-clamp-1">
                      {item.name}
                    </h2>

                    <p className="font-bold text-base sm:text-lg text-[#8B3A2A]">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* BUTTONS: Vertically stacked buttons on mobile optimizing layout real estate */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 sm:mt-5">
                    <button
                      onClick={() =>
                        triggerToast(`Added ${item.name} to Cart!`)
                      }
                      className="w-full sm:flex-1 py-2 rounded-xl text-white font-medium text-[11px] sm:text-xs transition-colors duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] active:scale-95 shadow-sm"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeItem(item.id, item.name)}
                      className="w-full sm:w-auto py-1 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#4B5563] hover:text-[#8B3A2A] transition-colors duration-200 text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-16 sm:py-20 bg-white rounded-[24px] border border-[#F0E6D8] shadow-md px-4">
            <h2
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ 
                color: "#1E1612",
                fontFamily: "'Playfair Display', serif" 
              }}
            >
              Your Wishlist is Empty
            </h2>

            <p className="text-xs sm:text-sm text-[#4B5563] mb-6 sm:mb-8">
              Discover unique handmade creations and save them here.
            </p>

            <button
              onClick={() => setItems(initialProducts)}
              className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm text-white font-semibold rounded-xl transition-colors duration-300 bg-[#8B3A2A] hover:bg-[#6D2D22] active:scale-95 shadow-md"
            >
              Reload Default Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;