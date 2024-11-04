import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#ab2091] p-4 text-white text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
