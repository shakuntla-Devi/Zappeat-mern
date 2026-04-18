import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: ""
  });

  //  HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  SIGNUP FUNCTION
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.gender) {
      alert("Please fill all fields 😅");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/register`,
        form
      );


      localStorage.setItem("token", res.data.token);

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Account created successfully 🎉");

      navigate("/");
    } catch (error) {
      console.log("ERROR:", error);

      alert(
        error.response?.data?.message || "Signup failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-100 to-white">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 hover:shadow-2xl transition"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Create Account ✨
        </h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={handleChange}
        />

        {/* GENDER */}
        <select
          name="gender"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male 👨</option>
          <option value="female">Female 👩</option>
        </select>

        {/* BUTTON */}
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
          Sign Up 🚀
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;