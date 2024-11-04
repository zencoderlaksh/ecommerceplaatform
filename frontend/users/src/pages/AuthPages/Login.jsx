"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import LoginBanner from "../../assets/images/Login-banner.jpg";
import { toast } from "react-hot-toast"; // Import toast

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      // Show success toast
      toast.success("Login successful! Welcome back!");
      navigate("/home");
      reset();
    } else {
      // Show error toast
      toast.error(error || "Invalid email or password.");
    }
  };

  useEffect(() => {
    if (error) {
      // Show error toast when there's an error
      toast.error(error);
    }
  }, [error]);

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
      <div className="hidden lg:flex flex-1">
        <img
          src={LoginBanner}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F8E3F6]">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#D268CC] rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Login
          </h2>
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
          <div className="mb-4 relative">
            <label className="text-white">Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border-gray-600 bg-[#F8E3F6] text-black rounded-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 cursor-pointer text-white"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#42626D] text-white rounded hover:bg-[#354e57] transition"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              New here?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-black cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
