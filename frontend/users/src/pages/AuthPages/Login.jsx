import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { loginUser } from "../../redux/slices/authSlice";
import { useFormHandler } from "../../hooks/useFormHandler";
import { loginSchema } from "../../utils/loginValidation";
import { useToast } from "@chakra-ui/react"; // Import Chakra UI's useToast

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const toast = useToast(); // Initialize toast
  const { handleSubmit, register, errors } = useFormHandler(loginSchema);

  const onSubmit = async (data) => {
    // Dispatch the login action and wait for the promise to resolve
    const resultAction = await dispatch(loginUser(data));

    // Check if the login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      toast({
        title: "Login Successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Navigate to the home page after a slight delay
      setTimeout(() => {
        navigate("/");
      }, 1000); // Delay for 1 second to see the toast
    } else {
      toast({
        title: "Login Failed.",
        description:
          resultAction.payload || "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
