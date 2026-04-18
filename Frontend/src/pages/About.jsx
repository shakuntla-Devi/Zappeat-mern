import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/*  HERO SECTION (LIGHT IMAGE LIKE HOME) */}
      <div className="relative h-[55vh] flex items-center justify-center">

        {/* IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-95"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')"
          }}
        ></div>

        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-white/30"></div>

        {/* TEXT */}
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow animate-fadeUp">
            About ZappEat 🍔
          </h1>
          <p className="text-white text-lg">
            Bringing happiness to your plate 😋
          </p>
        </div>
      </div>

      {/*  ABOUT SECTION */}
      <div className="max-w-5xl mx-auto text-center px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Who We Are 👨‍🍳</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          ZappEat is your go-to food delivery platform designed to make your
          cravings satisfied in seconds. From street food to premium dishes,
          we bring everything together in one place with speed, quality, and love ❤️
        </p>
      </div>

      {/*  FEATURES (UPGRADED UI) */}
      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-16">

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-2 text-red-500">
            🍕 Premium Quality
          </h2>
          <p className="text-gray-600 text-sm">
            We serve only fresh and high-quality food prepared with care.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-2 text-red-500">
            ⚡ Super Fast Delivery
          </h2>
          <p className="text-gray-600 text-sm">
            Lightning-fast delivery to satisfy your hunger instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition hover:-translate-y-2">
          <h2 className="text-lg font-semibold mb-2 text-red-500">
            ❤️ Customer First
          </h2>
          <p className="text-gray-600 text-sm">
            Your satisfaction is our top priority always.
          </p>
        </div>

      </div>

      {/*  MISSION + WHY (SIDE BY SIDE PRO LOOK) */}
      <div className="mt-16 grid md:grid-cols-2 gap-8 px-6 md:px-16">

        {/* MISSION */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-3">Our Mission 🚀</h2>
          <p className="text-gray-600">
            To make food ordering simple, fast, and enjoyable. We connect people
            with their favorite meals anytime, anywhere.
          </p>
        </div>

        {/* WHY US */}
        <div className="bg-red-50 p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-3 text-red-500">
            Why Choose Us? 🤔
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>✔ Wide variety of food options</li>
            <li>✔ Affordable pricing</li>
            <li>✔ Easy to use interface</li>
            <li>✔ Secure & reliable service</li>
          </ul>
        </div>

      </div>

      {/*  FOOTER */}
      <Footer />

    </div>
  );
};

export default About;