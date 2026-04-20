import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: {
        name: req.user.name,
        email: req.user.email,
      },
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