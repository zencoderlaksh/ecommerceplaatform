import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/userSlice";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.auth.user); // Get user from auth state
  const token = useSelector((state) => state.auth.token); // Get token from auth state
  const [userInfo, setUserInfo] = useState(user);
  const loading = useSelector((state) => state.user.loading); // Get loading state from user slice
  const error = useSelector((state) => state.user.error); // Get error from user slice

  useEffect(() => {
    if (!userInfo && token) {
      dispatch(getUserProfile())
        .unwrap()
        .then((data) => {
          setUserInfo(data);
          toast({
            title: "Profile loaded.",
            description: "User information fetched successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Failed to load user profile:", error);
          toast({
            title: "Error loading profile.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      setUserInfo(user); // Use user from auth state if available
    }
  }, [dispatch, token, user, toast, userInfo]);

  // Loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <div className="flex">
          <div className="flex-shrink-0">
            <img
              className="h-24 w-24 rounded-full border-2 border-gray-300"
              src={userInfo?.profileImage || "/default-profile.png"}
              alt="Profile"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">User Info</h2>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Name:</strong> {userInfo?.name || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {userInfo?.email || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {userInfo?.phone || "N/A"}
              </p>
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
