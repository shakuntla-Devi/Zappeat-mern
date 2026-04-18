
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token"); // 🔐 TOKEN

    try {
      //  BACKEND CALL (FIXED URL + TOKEN)
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/contact`,
  form,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      // (optional) localStorage remove bhi kar sakti ho later
      let msgs = JSON.parse(localStorage.getItem("messages")) || [];

      msgs.push({
        name: form.name,
        email: form.email,
        message: form.message,
        userEmail: user?.email,
      });

      localStorage.setItem("messages", JSON.stringify(msgs));

      toast.success("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Error sending message ❌");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/*  HERO */}
      <div className="relative h-[55vh] flex items-center justify-center">

        <div
          className="absolute inset-0 bg-cover bg-center brightness-95"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')"
          }}
        ></div>

        <div className="absolute inset-0 bg-white/30"></div>

        {/*  HEADING ANIMATION ONLY */}
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-white animate-fadeUp">
            Contact Us 📩
          </h1>
          <p className="text-white mt-2 drop-shadow-md">
            We'd love to hear from you 💬
          </p>
        </div>
      </div>

      {/*  MAIN */}
      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-16 py-12">

        {/*  FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Send Message ✉️</h2>

          <input
            placeholder="Your Name"
            value={form.name}
            className="w-full border rounded-lg px-4 py-2 mb-4"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Your Email"
            value={form.email}
            className="w-full border rounded-lg px-4 py-2 mb-4"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Your Message"
            value={form.message}
            className="w-full border rounded-lg px-4 py-2 h-32"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button className="w-full mt-5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            Send Message 🚀
          </button>
        </form>

        {/*  INFO */}
        <div className="flex flex-col gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">📍 Location</h3>
            <p className="text-gray-600">Chandigarh, India</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">📧 Email</h3>
            <p className="text-gray-600">zappeat@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">📞 Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Contact;