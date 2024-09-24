import { Navigate } from 'react-router-dom';

// Assuming you have a way to get the current user role, e.g., from context or props
const ProtectedRoute = ({ element, roles }) => {
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role; // Replace with your auth logic

  // Check if userRole matches any of the allowed roles
  if (!roles.includes(userRole)) {
    // Redirect to home page if access is denied
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute