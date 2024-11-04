import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/AuthPages/Login";
import SignupPage from "../pages/AuthPages/Signup";
import ProfileInfo from "../pages/Profile/ProfileInfo";
import Products from "../pages/ProductPage/Products";
import HomePage from "../pages/Home/HomePage";
import Electronics from "../pages/ProductPage/Electronics";
import Fashion from "../pages/ProductPage/Fashion";
import HomeDecor from "../pages/ProductPage/HomeDecor";
import Cart from "../pages/Cart/Cart";
import AboutUs from "../pages/AboutUs/AboutUs";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import StripeCheckout from "../pages/CheckoutPage/StripeCheckout";
import Login from "../pages/AuthPages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes without Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Routes with Layout */}
      <Route
        path="/user-info"
        element={
          <Layout>
            <ProfileInfo />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <Products />
          </Layout>
        }
      />
      <Route
        path="/home"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/products/:category"
        element={
          <Layout>
            <HomeDecor />
          </Layout>
        }
      />

      <Route
        path="/products/fashion"
        element={
          <Layout>
            <Fashion />
          </Layout>
        }
      />
      <Route
        path="/products/electronics"
        element={
          <Layout>
            <Electronics />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <CheckoutPage />
          </Layout>
        }
      />
      <Route
        path="/checkout/stripe"
        element={
          <Layout>
            <StripeCheckout />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
