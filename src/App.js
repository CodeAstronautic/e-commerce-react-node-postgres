import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProductList from "./components/Product/ProductList";
import Cart from "./components/Cart/Cart";
import AdminDashboard from "./components/Admin/AdminDashboard";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Ordertracking from "./components/Ordertrack/Ordertracking";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <ToastContainer />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<ProductList />} />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} 
      />
      <Route 
        path="/track-order" 
        element={<ProtectedRoute element={<Ordertracking />} roles={['admin', 'user']} />} 
      />
      <Route 
        path="/profile" 
        element={<ProtectedRoute element={<Profile />} roles={['admin', 'user']} />} 
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
