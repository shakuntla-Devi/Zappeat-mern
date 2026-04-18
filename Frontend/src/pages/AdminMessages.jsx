import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  //  GET TOKEN
  const token = localStorage.getItem("token");

  //  FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setMessages(res.data.messages);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching messages ❌");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  //  DELETE MESSAGE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/message/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Message deleted 🗑️");

      // refresh list
      fetchMessages();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        📩 Admin Messages
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">{msg.name}</h2>
            <p className="text-sm text-gray-500">{msg.email}</p>

            <p className="mt-3 text-gray-700">
              {msg.message}
            </p>

            <button
              onClick={() => handleDelete(msg._id)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete ❌
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminMessages;