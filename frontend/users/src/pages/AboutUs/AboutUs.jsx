import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const AboutUs = () => {
  // GSAP animation on component mount
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        y: 20,
        onComplete: () => {
          // Set the elements to fully visible after animation
          gsap.to(".fade-in", { opacity: 1 });
        },
      });
    });
    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="about-us min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>

      <div className="max-w-4xl mx-auto">
        <motion.p className="text-lg text-gray-700 mb-6 fade-in">
          We are a team of passionate individuals committed to delivering the
          best products and services to our customers. Our mission is to provide
          high-quality items that enhance your lifestyle while ensuring an
          exceptional shopping experience.
        </motion.p>

        <motion.p className="text-lg text-gray-700 mb-6 fade-in">
          Founded in [Year], we have continually evolved to meet the needs of
          our customers, combining innovation with tradition. Our diverse range
          of products is designed to cater to every taste and preference,
          ensuring that there’s something for everyone.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-600">
              Integrity, Quality, Customer Focus, Innovation, Sustainability
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading brand that provides quality products globally.
            </p>
          </div>
        </motion.div>

        <motion.div className="mt-8 fade-in">
          <h2 className="text-2xl font-bold text-center mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Become part of our journey and enjoy exclusive benefits by
            subscribing to our newsletter.
          </p>
          <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
            Subscribe Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
