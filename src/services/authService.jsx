const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    // If not, throw an error with the status code and response body
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

const login = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

const updateProfile = async (username, password) => {
  const token = localStorage.getItem("token"); // Get token from local storage

  try {
    const response = await fetch(`${API_URL}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(username, password),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};


export default {
  register,
  login,
  updateProfile
};
