const API_URL = process.env.REACT_APP_API_URL;

const addOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(orderData),
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    // If not, throw an error with the status code and response body
    const errorData = await response.json();
    throw new Error(errorData.message || "Order failed");
  }

  return response.json();
};

const getOrderList = async (userId) => {
  const response = await fetch(`${API_URL}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    // If not, throw an error with the status code and response body
    const errorData = await response.json();
    throw new Error(errorData.message || "Order failed");
  }

  return response.json();
};

const getAllOrderList = async () => {
  const response = await fetch(`${API_URL}/orders/all-order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    // If not, throw an error with the status code and response body
    const errorData = await response.json();
    throw new Error(errorData.message || "Order failed");
  }

  return response.json();
};

const UpdateOrder = async (orderId, newStatus) => {
  const response = await fetch(
    `${API_URL}/orders/update-order-status/${orderId}`,
    {
      method: "PUT",
      body: JSON.stringify({status:newStatus}),
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export default { addOrder, getOrderList, getAllOrderList, UpdateOrder };
