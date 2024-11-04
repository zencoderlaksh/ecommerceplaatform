// src/pages/Signup.jsx
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/Slices/authSlice";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SignupBanner from "../../assets/images/Login-banner.jpg"; // Adjust the path to your image
import toast from "react-hot-toast"; // Import toast
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons

const signupSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  gender: z.enum(["Male", "Female", "Other"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const formRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const resultAction = await dispatch(signup(data));
    if (signup.fulfilled.match(resultAction)) {
      toast.success("Signup successful!"); // Show success toast
      reset(); // Reset form on success
      navigate("/"); // Navigate to home page
    } else {
      toast.error("Signup failed! Please try again."); // Show error toast
    }
  };

  useEffect(() => {
    // Check screen size to apply animation only on larger screens
    const handleAnimation = () => {
      if (window.innerWidth > 640) {
        // Adjust the breakpoint as needed
        gsap.from(formRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    handleAnimation(); // Run animation on component mount

    // Optionally, handle window resize to re-check (if needed)
    window.addEventListener("resize", handleAnimation);
    return () => window.removeEventListener("resize", handleAnimation);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex-1 hidden lg:block">
        <img
          src={SignupBanner}
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F8E3F6] overflow-y-auto">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#D268CC] rounded-lg shadow-lg p-8 w-full max-w-md h-[90vh] overflow-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sign Up
          </h2>
          <div className="mb-4">
            <label className="text-white">Name</label>
            <input
              {...register("name")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-white">Email</label>
            <input
              {...register("email")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-white">Phone</label>
            <input
              {...register("phone")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-white">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md pr-10" // Add padding to the right
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" // Style for the icon
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="text-gray-600"
              />
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-white">City</label>
            <input
              {...register("city")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-white">Address</label>
            <input
              {...register("address")}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#42626D] text-white rounded hover:bg-[#354e57] transition"
          >
            Sign Up
          </button>
        </motion.form>
      </div>
    </div>
  );
}
