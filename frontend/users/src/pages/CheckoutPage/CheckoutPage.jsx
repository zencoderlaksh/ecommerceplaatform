// src/pages/CheckoutPage.js
import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "../CheckoutPage/StripeCheckout";
import { motion } from "framer-motion"; // Import Framer Motion

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <motion.div
      className="flex flex-col p-4 space-y-4 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Fade-in animation
    >
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Checkout
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

        <div className="flex flex-col space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between mb-2 p-2 border-b border-gray-200"
            >
              <span className="text-lg">{item.product.name}</span>
              <span className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <h3 className="text-xl font-semibold">Total Amount:</h3>
          <span className="text-xl font-bold text-blue-600">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <motion.div
        className="mt-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }} // Scale-in animation for the Stripe button
      >
        <StripeCheckout totalAmount={totalAmount} />
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;
