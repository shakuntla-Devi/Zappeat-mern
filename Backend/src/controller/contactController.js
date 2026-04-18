import Contact from "../models/Contact.js";

// 📩 SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const newMsg = new Contact(req.body);
    await newMsg.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
    });
  }
};

// 📥 GET ALL MESSAGES (Admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
};

// ❌ DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
    });
  }
};