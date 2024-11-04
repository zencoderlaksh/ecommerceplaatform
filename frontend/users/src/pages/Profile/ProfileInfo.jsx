import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <p>Please log in to view user information.</p>;

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        User Information
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-600">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Phone:</span>
          <span className="text-gray-600">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Gender:</span>
          <span className="text-gray-600">{user.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">City:</span>
          <span className="text-gray-600">{user.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Address:</span>
          <span className="text-gray-600">{user.address}</span>
        </div>
      </div>
    </motion.div>
  );
}
