import React, { useEffect, useState } from "react";
import socketService from "../services/socketService";
import { IoMdNotifications } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import notification from "../services/notification";

const SocketNotifications = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch initial notifications on component mount
  useEffect(() => {
    getNotificationsList();

    if (JSON.parse(localStorage.getItem("userInfo"))?.role === "admin") {
      // Subscribe to real-time notifications
      socketService.subscribeToNotifications((newNotification) => {
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
        toast.info(`New notification: ${newNotification.message}`);
      });
    } else {
      socketService.subscribeToUserNotifications((newNotification) => {
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
      });
    }

    // Clean up on component unmount
    return () => {
      if (JSON.parse(localStorage.getItem("userInfo"))?.role === "admin") {
        socketService.unsubscribeFromNotifications();
      } else {
        socketService.unsubscribeFromUserNotifications();
      }
    };
  }, []);

  const getNotificationsList = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo"))?.userID;
        const res = await notification.getNotifications(userId);
        setNotifications(res);
      } catch (error) {
        toast.error(error.message || "Failed to load notifications.");
      }
    } else {
      navigate("/login");
    }
  };

  console.log("notifications", notifications);

  return (
    <div className="relative inline-block text-left ml-3">
      <span
        className="inline-flex items-center justify-center size-[38px] rounded-full bg-[#007bff] text-sm font-semibold text-white leading-none"
        onClick={toggleDropdown}
      >
        <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-[#007bff] rounded-full hover:bg-[#007bff]">
          <IoMdNotifications />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {notifications.length}
          </div>
        </div>
      </span>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ul className="list-disc list-inside px-4 py-2">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className="mb-2">
                    {notification?.message}
                  </li>
                ))
              ) : (
                <li>No new notifications</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocketNotifications;
