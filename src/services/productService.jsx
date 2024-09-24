const API_URL = process.env.REACT_APP_API_URL;

const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

const AddProducts = async (Data) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(Data),
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

const UpdateProducts = async (Data) => {
  const response = await fetch(`${API_URL}/products/${Data.id}`, {
    method: "PUT",
    body: JSON.stringify(Data),
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

const DeleteProducts = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

export default {
  getProducts,
  UpdateProducts,
  DeleteProducts,
  AddProducts
};
