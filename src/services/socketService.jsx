// socketService.js
import { io } from "socket.io-client";

const socket = (() => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Initialize the socket connection with the token in the auth options
  const socketInstance = io(
    process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",
    {
      auth: {
        token: token, // Pass the token here
      },
    }
  );

  socketInstance.on("connect", () => {
    console.log("Socket connected:", socketInstance.id);
  });

  return socketInstance;
})();

const subscribeToNotifications = (callback) => {
  return socket.on("newOrder", callback); // Listen for 'newOrder' event
};

const unsubscribeFromNotifications = () => {
  return socket.off("newOrder"); // Stop listening for 'newOrder' event
};

const subscribeToUserNotifications = (callback) => {
  return socket.on("newNotification", callback); // Listen for 'newOrder' event
};

const unsubscribeFromUserNotifications = () => {
  return socket.off("newNotification"); // Stop listening for 'newOrder' event
};

export default {
  subscribeToNotifications,
  unsubscribeFromNotifications,
  subscribeToUserNotifications,
  unsubscribeFromUserNotifications,
};
