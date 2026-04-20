import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // ✅ LOAD CART
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart")) || [];

    const fixed = data.map((item) => ({
      ...item,
      price: Number(item.price) || 0,
      qty: Number(item.qty || 1),
    }));

    setCart(fixed);
  }, []);

  // ✅ TOTAL CALCULATION
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  // ✅ ORDER FUNCTION
  const handleOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city
    ) {
      return toast.error("Please fill all details 😅");
    }

    if (!token) {
      return toast.error("Please login first 😅");
    }

    try {
      await axios.post(
        `${API}/api/orders/place`,
        {
          items: cart,
          address: {
            address: address.address,
            city: address.city,
          },
          totalAmount: total, // ✅ FINAL FIX
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");

      toast.success("Order placed 🎉");
      navigate("/success");

    } catch (err) {
      console.log("ORDER ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Order failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 md:px-10 py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Checkout 💳
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* 📝 FORM */}
        <form
          onSubmit={handleOrder}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
        >
          <h2 className="text-xl font-bold mb-2">
            Delivery Details 📍
          </h2>

          <input
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Full Address"
            className="w-full p-3 border rounded-xl h-28"
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          
        </form>

        {/* 🛒 ORDER SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between">

          <div>
            <h2 className="text-xl font-bold mb-5">
              Order Summary 🛒
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Cart empty 😢</p>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>

                    <p className="text-red-500 font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <hr className="my-5" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Pay</span>
              <span className="text-red-500 text-xl">₹{total}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;