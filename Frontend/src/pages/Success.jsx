import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg text-center w-full max-w-md">

        <h1 className="text-2xl md:text-4xl font-bold text-green-600 leading-snug">
          Order Placed Successfully! 🎉
        </h1>

        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Thank you for your order 😍
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Back to Home 🏠
        </button>

      </div>
    </div>
  );
};

export default Success;