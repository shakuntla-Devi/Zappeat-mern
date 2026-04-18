const Footer = () => {
  return (
    <footer className="bg-red-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-2">ZappEat 🍔</h2>
          <p className="text-sm text-red-100">
            Delicious food delivered to your doorstep 😋
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-red-100 space-y-1">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Menu</li>
            <li className="hover:text-black cursor-pointer">Cart</li>
            <li className="hover:text-black cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-red-100 text-sm">📍 Chandigarh</p>
          <p className="text-red-100 text-sm">📧 foodie@gmail.com</p>
          <p className="text-red-100 text-sm">📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="text-center text-red-200 text-sm border-t border-red-300 py-3">
        © 2026 ZappEat
      </div>
    </footer>
  );
};

export default Footer;