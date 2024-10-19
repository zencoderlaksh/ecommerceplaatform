import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/AuthPages/Login";
import Signup from "../pages/AuthPages/Signup";
import Profile from "../pages/Profile/Profile"; // Import your Profile component

const AppRoutes = () => {
  return (
    <Routes>
      {/* No Layout for Login and Signup */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* All other routes with Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <div>Home</div>
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <div>Product List</div>
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout>
            <div>Product Detail</div>
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <div>Cart</div>
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile /> {/* Use your Profile component here */}
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <div>Checkout</div>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
