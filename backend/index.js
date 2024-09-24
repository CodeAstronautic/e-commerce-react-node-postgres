require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const db = require("./src/config/db");
const seedAdmin = require("./src/seed/seedAdmin");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const socketController = require("./src/socket/socketController");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

db.connect()
  .then(async () => {
    await seedAdmin(); // Seed the database
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);

// Initialize Socket.io (pass the server)
socketController.initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
