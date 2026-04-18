import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  //  SAFE LOAD (MAIN FIX)
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart")) || [];

    // CLEAN WRONG DATA (IMPORTANT)
    data = data.map((item) => ({
      ...item,
      price: Number(item.price) || 0,
      qty: Number(item.qty) || 1,
    }));

    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data)); // sync fix
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (index) => {
    let updated = [...cart];
    updated[index].qty = Number(updated[index].qty) + 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    let updated = [...cart];

    if (Number(updated[index].qty) > 1) {
      updated[index].qty = Number(updated[index].qty) - 1;
    } else {
      updated.splice(index, 1);
    }

    updateCart(updated);
  };

  const removeItem = (index) => {
    let updated = [...cart];
    updated.splice(index, 1);
    updateCart(updated);
  };
  console.log("CART DATA:", cart);
  //  FINAL TOTAL FIX
  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.qty);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 md:px-10 py-8">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            className="w-28 mb-4 opacity-70"
          />
          <p className="text-lg">Your cart is empty 😢</p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full"
          >
            Explore Food 🍔
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/*  ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000/images/${item.image}`
                  }
                  className="w-full sm:w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-red-500 font-bold mt-1 text-lg">
                      ₹{item.price}
                    </p>
                  </div>

                  {/*  QTY */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">

                      <button onClick={() => decreaseQty(index)}>−</button>

                      <span className="px-3">{item.qty}</span>

                      <button onClick={() => increaseQty(index)}>+</button>

                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  SUMMARY */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4">
              Order Summary 🧾
            </h2>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-red-500">₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-red-500 text-white py-3 rounded-xl"
            >
              Proceed to Checkout 🚀
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;