import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure you have react-toastify installed
import orderService from "../../services/orderService";

const OrderList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    if (localStorage.getItem("token")) {
      try {
        const res = await orderService.getAllOrderList();
        setItems(res);
      } catch (error) {
        toast.error(error.message || "Something went wrong, please try again");
      }
    } else {
      navigate("/login");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.UpdateOrder(orderId, newStatus); // Assuming you have this method in your service
      toast.success("Order status updated successfully");
      getOrderList(); // Refresh the list after updating the status
    } catch (error) {
      toast.error(error.message || "Failed to update order status");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Shipping Address</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">{order.shippingAddress}</td>
              <td className="py-2 px-4 border-b">
                {order.products?.map((product) => (
                  <div key={product.id}>
                    {product.name} (Qty: {product.quantity})
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
