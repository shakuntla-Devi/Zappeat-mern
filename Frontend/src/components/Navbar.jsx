import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  //  LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  //  CART COUNT
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-red-500 shadow-md">

      <div className="flex justify-between items-center px-6 md:px-16 py-4">

        {/* 🔥 LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold text-white tracking-wide cursor-pointer"
        >
          🍔 ZappEat
        </h1>

        {/*  DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-medium text-white">
          <Link className="hover:text-black transition" to="/">Home</Link>
          <Link className="hover:text-black transition" to="/about">About</Link>
          <Link className="hover:text-black transition" to="/contact">Contact</Link>

          {/*  CART */}
          <Link to="/cart" className="relative hover:text-black transition">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-red-500 text-xs px-2 py-[1px] rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/*  RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/*  USER */}
          {user ? (
            <div className="relative">
              <span
                onClick={() => setDropdown(!dropdown)}
                className="cursor-pointer font-semibold text-white hover:opacity-80"
              >
                👋 {user.name}
              </span>

              {dropdown && (
                <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl p-4 w-48">

                  <p className="text-sm text-gray-500 mb-3">
                    Signed in as <br />
                    <span className="font-semibold text-black">{user.name}</span>
                  </p>

                  {/*  PROFILE */}
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left py-1 hover:text-red-500 transition"
                  >
                    👤 Profile
                  </button>

                  {/* 📦 ORDERS */}
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full text-left py-1 hover:text-red-500 transition"
                  >
                    📦 My Orders
                  </button>

                  {/*  CART */}
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full text-left py-1 hover:text-red-500 transition"
                  >
                    🛒 My Cart
                  </button>

                  <hr className="my-2" />

                  {/*  LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-1 text-red-500 hover:opacity-80"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-white text-red-500 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-100 transition duration-300">
                Login →
              </button>
            </Link>
          )}

          {/*  MOBILE MENU BTN */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/*  MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 font-medium bg-red-500 text-white">

          <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/about" onClick={()=>setOpen(false)}>About</Link>
          <Link to="/contact" onClick={()=>setOpen(false)}>Contact</Link>

          <Link to="/cart" onClick={()=>setOpen(false)}>
            🛒 Cart ({cartCount})
          </Link>

          {user ? (
            <>
              <Link to="/profile" onClick={()=>setOpen(false)}>👤 Profile</Link>
              <Link to="/orders" onClick={()=>setOpen(false)}>📦 My Orders</Link>

              <button
                onClick={handleLogout}
                className="bg-white text-red-500 px-3 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-white text-red-500 px-4 py-2 rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;