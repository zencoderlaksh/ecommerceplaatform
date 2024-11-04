import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./layout/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <AppRoutes />
    </div>
  );
};

export default App;
