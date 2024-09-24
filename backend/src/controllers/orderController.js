const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const { notifyAdmin, notifyUser } = require("../socket/socketController");

// Create a new order and notify admin
exports.createOrder = async (req, res) => {
  const { products, shippingAddress } = req.body;
  try {
    const order = await Order.create({
      shippingAddress,
      userId: req.user.id,
      products,
      status: "Order Placed",
    });

    // Notify admin of the new order
    const adminUser = await User.findOne({ where: { role: "admin" } });
    await Notification.create({
      message: `New order created with ID: ${order.id}`,
      orderId: order.id,
      userId: adminUser?.id,
    });

    notifyAdmin(`New order created with ID: ${order.id}`);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ error: "Order creation failed." });
  }
};

// Update order status and notify admin
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [updated] = await Order.update({ status }, { where: { id } });
    if (updated) {
      const updatedOrder = await Order.findOne({ where: { id } });
      // Notify admin of the status change
      await Notification.create({
        message: `Your Order ID: ${id} status updated to: ${status}`,
        orderId: id,
        userId: updatedOrder?.userId,
      });

      notifyUser(
        updatedOrder?.userId,
        `Your order ID: ${id} status updated to: ${status}`
      );
      return res.json({ message: "Order status updated successfully." });
    }
    return res.status(404).json({ error: "Order not found." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(400).json({ error: "Order update failed." });
  }
};

// Get all notifications for admin
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { isRead: false },
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to retrieve notifications." });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Notification.update(
      { isRead: true },
      { where: { id } }
    );
    if (updated[0] === 1) {
      return res.json({ message: "Notification marked as read." });
    }
    return res.status(404).json({ error: "Notification not found." });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(400).json({ error: "Failed to mark notification as read." });
  }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.findAll({ where: { userId: userId } });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
};
