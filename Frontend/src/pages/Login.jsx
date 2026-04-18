import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields 😅");
    }

    try {
      //  BACKEND LOGIN API
      const res = await axios.post(
        `${API}/api/auth/login`, // ✅ FIXED
        { email, password }
      );



      //  SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      //  SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful 🎉");

      //  redirect
      navigate("/");

    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-100 to-white">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 hover:shadow-2xl transition"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Welcome Back 🔐
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
          Login 🚀
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;