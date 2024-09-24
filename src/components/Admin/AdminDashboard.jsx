import React, { useState } from "react";
import ProductDashboard from "./ProductDashboard";
import OrderList from "./OrderList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li
          onClick={() => {
            setActiveTab(0);
          }}
          className="me-2"
        >
          <div
            className={
              activeTab === 0
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Dashboard
          </div>
        </li>
        <li
          className="me-2"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          <div
            className={
              activeTab === 1
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Order
          </div>
        </li>
      </ul>
      {activeTab === 0 ? <ProductDashboard /> : <OrderList />}
    </>
  );
};

export default AdminDashboard;
