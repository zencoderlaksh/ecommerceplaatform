import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-4 pt-[100px] bg-[#D268CC]">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
