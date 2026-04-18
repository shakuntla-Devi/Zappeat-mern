
import { useEffect, useState } from "react";

const Splash = ({ onFinish }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white">

      <div className="text-center px-4">

        <h1
          className={`text-5xl md:text-7xl font-extrabold transition-all duration-1000 ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          Welcome to
        </h1>

        <h2
          className={`mt-3 text-5xl md:text-7xl font-extrabold text-yellow-300 transition-all duration-1000 delay-300 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Zappeat 🍔
        </h2>

        <p
          className={`mt-5 text-lg md:text-xl text-white/90 transition-all duration-1000 delay-500 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          Discover amazing food from the best places near you 🍽️
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-[loading_2s_linear_infinite]"></div>
          </div>
        </div>

      </div>

      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Splash;