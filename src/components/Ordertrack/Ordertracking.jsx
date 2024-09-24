import { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import socketService from "../../services/socketService";
import CheckMarkIcon from "../../asset/img/svg/checkMark.svg"

const Ordertracking = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getOrderList();

    if (JSON.parse(localStorage.getItem("userInfo"))?.role === "admin") {
      // Subscribe to real-time notifications
      socketService.subscribeToNotifications((newNotification) => {
        getOrderList();
      });
    } else {
      socketService.subscribeToUserNotifications((newNotification) => {
        getOrderList();
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
  const getOrderList = async () => {
    if (localStorage.getItem("token")) {
      try {
        const res = await orderService.getOrderList(
          JSON.parse(localStorage.getItem("userInfo"))?.userID
        );
        const formattedItems = res.map((order) => {
          return {
            name: order.products[0]?.name || "Unknown Product", // Assuming there's at least one product
            orderNumber: `#${order.id}`, // Unique order ID for the order number
            placedOn: new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }), // Format date
            shippingMethod: "Standard Shipping", // Example placeholder; you may need to replace it with real data
            shippingAddress: order.shippingAddress,
            expectedDelivery: "Expected Date", // Placeholder; modify based on available data
            trackingSteps: [
              {
                step: "Order Placed",
                date: new Date(order.updatedAt).toLocaleDateString("en-US"),
                completed:
                  order.status === "Order Placed" ||
                  order.status === "Processing" ||
                  order.status === "Shipped" ||
                  order.status === "Out for Delivery" ||
                  order.status === "Delivered",
              },
              {
                step: "Processing",
                date: new Date(order.updatedAt).toLocaleDateString("en-US"),
                completed:
                  order.status === "Processing" ||
                  order.status === "Shipped" ||
                  order.status === "Out for Delivery" ||
                  order.status === "Delivered",
              },
              {
                step: "Shipped",
                date: new Date(order.updatedAt).toLocaleDateString("en-US"),
                completed:
                  order.status === "Shipped" ||
                  order.status === "Out for Delivery" ||
                  order.status === "Delivered",
              },
              {
                step: "Out for Delivery",
                date: new Date(order.updatedAt).toLocaleDateString("en-US"),
                completed:
                  order.status === "Out for Delivery" ||
                  order.status === "Delivered",
              },
              {
                step: "Delivered",
                date: new Date(order.updatedAt).toLocaleDateString("en-US"),
                completed: order.status === "Delivered",
              },
            ],
          };
        });

        setItems(formattedItems);
      } catch (error) {
        toast.error(error.message || "Something went wrong, please try again");
      } finally {
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {item.name} - Order Tracking
          </h2>
          {/* Order Info */}
          <div className="mb-4">
            <p className="text-gray-600">
              Order Number:{" "}
              <span className="font-semibold">{item.orderNumber}</span>
            </p>
            <p className="text-gray-600">
              Placed On: <span className="font-semibold">{item.placedOn}</span>
            </p>
          </div>

          {/* Tracking Steps */}
          <div className="space-y-8">
            {item.trackingSteps.map((step, i) => (
              <div key={i} className="flex items-start">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {step.completed ? (
                    <img src={CheckMarkIcon} width={20} alt="step"/>
                  ) : (
                    <div className="h-3 w-3 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{step.step}</p>
                  <p className="text-sm text-gray-600">{step.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Info */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">
              Delivery Information
            </h3>
            <p className="text-gray-600">
              Expected Delivery:{" "}
              <span className="font-semibold">{item.expectedDelivery}</span>
            </p>
            <p className="text-gray-600">
              Shipping Method:{" "}
              <span className="font-semibold">{item.shippingMethod}</span>
            </p>
            <p className="text-gray-600">
              Shipping Address:{" "}
              <span className="font-semibold">{item.shippingAddress}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Ordertracking;
