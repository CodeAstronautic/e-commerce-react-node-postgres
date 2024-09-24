const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

// socketController.js
const adminSockets = new Set(); // To store admin socket IDs
const userSockets = new Map(); // To map user IDs to socket IDs
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Replace * with your front-end domain to allow CORS
    },
  });

  // Middleware for token verification
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("Token is missing");
      return next(new Error("Token is required."));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        return next(new Error("Invalid token."));
      }
      socket.user = decoded;

      // Store socket IDs based on user role
      if (decoded.role === "admin") {
        adminSockets.add(socket.id); // Add admin socket to the set
      } else if (decoded.role === "user") {
        userSockets.set(decoded.id, socket.id); // Map user ID to socket ID
      }

      next(); // Continue the connection
    });
  });

  // Handle WebSocket connection
  io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.user.id}`);

    // Send welcome message
    socket.emit("welcome", `Welcome, user ${socket.user.id}`);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
      adminSockets.delete(socket.id); // Remove admin socket from the set
      userSockets.delete(socket.user.id); // Remove user socket from the map
    });
  });
};

// Notify admin with the admin's socket ID
const notifyAdmin = (message) => {
  if (!io) throw new Error("Socket.io is not initialized.");
  adminSockets.forEach((adminSocketId) => {
    io.to(adminSocketId).emit("newOrder", { message });
  });
};

// Notify specific user by user ID
const notifyUser = (userId, message) => {
  if (!io) throw new Error("Socket.io is not initialized.");
  const userSocketId = userSockets.get(userId);
  if (userSocketId) {
    io.to(userSocketId).emit("newNotification", { message });
  } else {
    console.log(`User with ID ${userId} is not connected.`);
  }
};

module.exports = {
  initSocket,
  notifyAdmin,
  notifyUser, // Export the notifyUser function
};
