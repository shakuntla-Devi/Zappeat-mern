import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    setName(data?.name || "");
  }, []);

  //  Dynamic color avatar
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
  const bgColor =
    colors[user?.name?.charCodeAt(0) % colors.length];

  //  SAVE FUNCTION
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEdit(false);

    alert("Profile updated ✅");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9')",
      }}
    >

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 text-white text-center">

        {/*  INITIAL AVATAR */}
        <div className={`w-24 h-24 rounded-full ${bgColor} flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3 shadow-lg`}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {edit ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded text-black mb-3"
            />

            <button
              onClick={handleSave}
              className="w-full bg-green-500 py-2 rounded-lg mb-2"
            >
              Save ✅
            </button>

            <button
              onClick={() => setEdit(false)}
              className="w-full bg-gray-400 py-2 rounded-lg"
            >
              Cancel ❌
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-200">{user?.email}</p>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate("/orders")}
                className="w-full bg-white text-black py-2 rounded-xl font-semibold"
              >
                📦 My Orders
              </button>

              <button
                onClick={() => setEdit(true)}
                className="w-full bg-red-500 py-2 rounded-xl font-semibold"
              >
                ✏️ Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;