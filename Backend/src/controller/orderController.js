import Order from "../models/orderModel.js";


export const placeOrder = async (req, res) => {
  try {
    const { items, address, totalAmount } = req.body;

    const order = new Order({
      items: items || [],
      address: {
        address: address?.address || "",
        city: address?.city || "",
      },
      totalAmount: totalAmount || 0,
      user: req.user._id,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};

// 📥 GET ALL ORDERS (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    console.log("FOUND ORDERS:", orders);
    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};