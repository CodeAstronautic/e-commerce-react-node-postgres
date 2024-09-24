const Notification = require("../models/Notification");

// Get all users
exports.getAllNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await Notification.findAll({ where: { userId: id } });
    res.json(users);
  } catch (error) {
    console.error("Error fetching Notification:", error);
    res.status(500).json({ error: "Failed to retrieve Notification." });
  }
};
