import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import AdminMessages from "./pages/AdminMessages";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";



function App() {
  const [loading, setLoading] = useState(true);

  // 🔥 Splash screen first
  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  // 🚀 Main App
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;