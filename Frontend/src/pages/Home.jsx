import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { FaHeart, FaStar } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
const categories = [
  { label: "All", value: "All" },
  { label: "Veg Chinese 🍜", value: "Veg-Chinese" },
  { label: "Non-Veg Chinese 🍗", value: "Non-Veg-Chinese" },
  { label: "Desserts & Drinks 🍰", value: "Desserts & Drinks" },
  { label: "Veg Thali 🍱", value: "Veg-Thali Combo" }
];

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  //  FETCH FOOD
  useEffect(() => {
    const fetchFood = async () => {
      localStorage.removeItem("cart");
      try {
        const res = await axios.get(`${API}/api/food`); // ✅ FIXED
        setFoods(res.data.foods);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFood();
  }, []);

  //  FILTER
  const filteredFoods = foods.filter((item) => {
    return (
      (selectedCategory === "All" ||
        item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  //  ADD TO CART ( FINAL FIXED)
  const handleAddToCart = (item) => {
    if (!user) return toast.error("Login first 😅");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((x) => x._id === item._id);

    if (exist) {
      cart = cart.map((x) =>
        x._id === item._id
          ? {
            ...x,
            qty: Number(x.qty || 1) + 1,   // ✅ FIX
            price: Number(x.price),        // ✅ FIX
          }
          : x
      );
    } else {
      cart.push({
        ...item,
        price: Number(item.price), // ✅ FIX
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/*  HERO */}
      <div className="relative h-[45vh] md:h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')"
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="text-2xl md:text-5xl font-bold">
            Find Your Favourite Food 🍔
          </h1>

          <input
            type="text"
            placeholder="Search..."
            className="mt-4 px-4 py-2 w-full max-w-sm rounded-full text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/*  CATEGORY */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 px-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2 text-sm md:text-base font-medium rounded-full border transition shadow-sm
            ${selectedCategory === cat.value
                ? "bg-red-500 text-white scale-105"
                : "bg-white text-black hover:bg-red-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/*  FOOD CARDS */}
      <div
        className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 
        grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-x-6 gap-y-8 
        max-w-7xl mx-auto"
      >
        {filteredFoods.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
          >

            {/*  HEART */}
            <FaHeart className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full text-lg z-10" />

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 md:h-44 object-cover hover:scale-105 transition"
            />

            {/* RATING */}
            <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs flex items-center gap-1 shadow">
              <FaStar className="text-yellow-400" /> 4.5
            </div>

            {/*  HOVER */}
            <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex-col justify-center items-center text-white p-3 text-center">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-sm line-clamp-2">{item.description}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className="mt-2 bg-red-500 px-3 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>

            {/*  MOBILE VIEW */}
            <div className="p-2 md:hidden">
              <h2 className="text-xs font-semibold">{item.name}</h2>
              <p className="text-[10px] text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <p className="text-red-500 text-xs">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/*  POPUP */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-4 w-[90%] max-w-md relative">

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>

            <img
              src={selectedItem.image}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-lg font-bold mt-2">
              {selectedItem.name}
            </h2>

            <p className="text-sm text-gray-600">
              {selectedItem.description}
            </p>

            <p className="text-red-500 font-bold mt-2">
              ₹{selectedItem.price}
            </p>

            <button
              onClick={() => handleAddToCart(selectedItem)}
              className="w-full mt-3 bg-red-500 text-white py-2 rounded"
            >
              Add to Cart 🛒
            </button>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;