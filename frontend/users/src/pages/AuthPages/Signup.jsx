import React from "react";
import { useFormHandler } from "../../hooks/useFormHandler";
import { signupSchema } from "../../utils/signupValidation";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, fetchUserProfile } from "../../redux/slices/authSlice"; // Updated import
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useFormHandler(signupSchema);
  const { loading, error } = useSelector((state) => state.auth);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(signupUser(data));

    if (signupUser.fulfilled.match(resultAction)) {
      toast({
        title: "Sign Up Successful",
        description: "You have successfully signed up!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Fetch user profile after successful signup
      const { token } = resultAction.payload; // Extract token from the signup result
      await dispatch(fetchUserProfile(token)); // Dispatch action to fetch user profile

      setTimeout(() => {
        navigate("/"); // Redirect after the toast message is displayed
      }, 3000);
    } else {
      // Handle error case
      toast({
        title: "Sign Up Error",
        description:
          resultAction.error.message || "An error occurred during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
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

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              {...register("city")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              className={`w-full p-2 border rounded mt-1 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
