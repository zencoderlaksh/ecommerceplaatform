import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { motion } from "framer-motion";
import categoriesData from "../../data/categoriesData.json";

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreMore = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/products/${encodedCategory}`);
  };

  return (
    <div className="home-page min-h-screen bg-gradient-to-r from-[#F8E3F6] to-[#D268CC] animate-gradient p-4">
      {categoriesData.map((category, index) => (
        <div key={index} className="category-section mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-white">
            {category.name}
          </h2>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="category-slider w-full md:w-3/4 lg:w-1/2 mx-auto"
          >
            {category.products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg transform scale-100 md:scale-110"
                  whileHover={{ scale: 1.1 }} // Slight zoom effect on hover
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <motion.button
            onClick={() => handleExploreMore(category.name)}
            whileHover={{ scale: 1.1 }}
            className="explore-more-button mt-4 p-2 md:p-3 bg-[#D268CC] text-white rounded-full text-base md:text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore More
          </motion.button>
        </div>
      ))}

      {/* Deals of the Day Section */}
      <div className="deals-section mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
          Deals of the Day
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4 px-2 md:px-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="deal-card w-40 md:w-52 lg:w-64 p-3 md:p-4 border rounded-lg shadow-lg bg-white"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg md:text-xl font-medium">Deal {i + 1}</h3>
              <p className="text-red-500 text-sm md:text-base">
                Limited Time Offer
              </p>
              <p className="text-gray-700 mt-2 text-xs md:text-sm">
                Product Description...
              </p>
              <div className="countdown-timer mt-2 md:mt-4 text-sm md:text-base">
                00:10:45
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-color: #f8e3f6;
          }
          50% {
            background-color: #d268cc;
          }
          100% {
            background-color: #f8e3f6;
          }
        }

        .animate-gradient {
          background: linear-gradient(270deg, #f8e3f6, #d268cc);
          animation: gradient 8s ease infinite;
          background-size: 400% 400%;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
