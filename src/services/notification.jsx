const API_URL = process.env.REACT_APP_API_URL;

const getNotifications = async (id) => {
  const response = await fetch(`${API_URL}/notification/${id}`, {
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
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};


export default {
  getNotifications
};
