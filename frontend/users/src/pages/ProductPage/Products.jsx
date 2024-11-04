import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../../redux/Slices/productSlice";
import { useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams(); // Get the category from the URL
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle" || category) {
      if (category) {
        dispatch(fetchProductsByCategory(category)); // Fetch by category if provided
      } else {
        dispatch(fetchProducts()); // Fetch all products if no category
      }
    }
  }, [dispatch, category]);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        items.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-80 m-4 p-4 border rounded-lg shadow-lg bg-white transform transition duration-200 hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2">
                {product.description}
              </p>
              <button className="w-full bg-blue-500 text-white mt-4 p-2 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      {status === "succeeded" && items.length === 0 && (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default Products;
