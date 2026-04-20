import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDERS:", res.data.orders);
      console.log("USER:", user);

      // 🔥 STRONG FILTER (handles all cases)
      const myOrders = res.data.orders.filter((order) => {
        if (!order.user || !user?._id) return false;

        // case 1: populated object
        if (typeof order.user === "object") {
          return order.user._id?.toString() === user._id?.toString();
        }

        // case 2: string id
        return order.user.toString() === user._id?.toString();
      });

      setOrders(myOrders);

    } catch (err) {
      console.log(err);
      toast.error("Error fetching orders ❌");
    }
  };

  // ✅ FETCH MESSAGES
  const fetchMessages = () => {
    const allMsgs = JSON.parse(localStorage.getItem("messages")) || [];

    const myMsgs = allMsgs.filter(
      (msg) => msg.userEmail === user?.email
    );

    setMessages(myMsgs);
  };

  useEffect(() => {
    fetchOrders();
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        My Dashboard 👤
      </h1>

      {/* 📦 ORDERS */}
      <h2 className="text-xl font-semibold mb-4">My Orders 📦</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 mb-6">No orders yet 😢</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">

            {/* ✅ DATE FIX */}
            <p className="text-sm text-gray-500">
              📅 {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "No Date"}
            </p>

            {/* ✅ USER NAME */}
            <p>👤 {order.user?.name || user?.name || "User"}</p>

            {/* ✅ ADDRESS */}
            <p>
              📍 {order.address?.address || "No Address"},{" "}
              {order.address?.city || ""}
            </p>

            {/* ✅ ITEMS */}
            {order.items?.map((item, i) => (
              <p key={i}>
                🍔 {item.name} - ₹{item.price} × {item.qty || 1}
              </p>
            ))}

            {/* ✅ TOTAL */}
            <h3 className="text-red-500 font-bold">
              Total: ₹{order.total || 0}
            </h3>

          </div>
        ))
      )}

      {/* 📩 MESSAGES */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        My Messages 📩
      </h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet 😢</p>
      ) : (
        messages.map((msg, i) => (
          <div key={i} className="bg-white p-4 mb-3 rounded shadow">

            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Message:</b> {msg.message}</p>

          </div>
        ))
      )}

    </div>
  );
};

export default MyOrders;