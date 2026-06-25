import { useEffect, useState } from "react";

import bambooBasketImg from "../assets/Bamboo Basket.jpg";
import handwovenBagImg from "../assets/Handwoven Bag.jpg";
import handcraftBowlImg from "../assets/Handcraft Bowl.jpg";
import wallArtImg from "../assets/Wall Art.jpg";
import clayPotsImg from "../assets/Clay Pots.jpg";
import handwovenShawlImg from "../assets/Handwoven Shawl.jpg";
import handmadeSareeImg from "../assets/Handmade Saree.jpg";
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

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

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

          return {
            ...item,
            liked: updatedLike,
          };
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
      {toast.show && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-white border border-[#F0E6D8] shadow-xl flex items-center gap-3">
            <span className="text-[#8B3A2A]">✨</span>
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            My Wishlist
          </h1>

          <p className="text-sm text-[#4B5563] mt-2">
            Your favorite handcrafted treasures.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearAllItems}
            className="px-4 py-2 border-2 border-[#8B3A2A] text-[#8B3A2A] rounded-xl font-semibold text-sm hover:bg-[#8B3A2A] hover:text-white transition-all"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F0E6D8] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-44 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[#F0E6D8] px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#4B5563]">
                    {item.category}
                  </span>

                  <button
                    onClick={() => toggleLike(item.id, item.name)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl"
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

                <div className="p-4 sm:p-5">
                  <h2 className="font-semibold text-sm sm:text-base text-[#1E1612] mb-2">
                    {item.name}
                  </h2>

                  <p className="text-[#8B3A2A] font-bold text-lg mb-4">
                    ₹{item.price}
                  </p>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        triggerToast(`Added ${item.name} to Cart!`)
                      }
                      className="w-full bg-[#8B3A2A] hover:bg-[#6D2D22] text-white py-2.5 rounded-xl text-sm font-medium transition-all"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeItem(item.id, item.name)}
                      className="w-full py-2 text-sm font-medium text-[#4B5563] hover:text-[#8B3A2A] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#F0E6D8] rounded-3xl shadow-md py-20 px-6 text-center">
            <h2
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Wishlist is Empty
            </h2>

            <p className="text-[#4B5563] mb-8">
              Discover unique handmade creations and save them here.
            </p>

            <button
              onClick={() => setItems(initialProducts)}
              className="bg-[#8B3A2A] hover:bg-[#6D2D22] text-white px-6 py-3 rounded-xl font-semibold transition-all"
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
