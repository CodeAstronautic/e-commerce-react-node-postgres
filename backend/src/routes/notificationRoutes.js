const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { getAllNotification } = require("../controllers/notificationController");
const router = express.Router();

router.get("/:id", authenticate, getAllNotification);

module.exports = router;
