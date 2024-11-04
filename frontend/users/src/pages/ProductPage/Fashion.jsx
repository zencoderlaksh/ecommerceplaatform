// Fashion.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/Slices/productSlice";
import { addToCart } from "../../redux/Slices/cartSlice";

const Fashion = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProductsByCategory("Fashion"));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product._id, product }));
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.productId === productId);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        items.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-80 m-4 p-4 border rounded-lg shadow-lg bg-white"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product._id)}
              className={`w-full mt-4 p-2 rounded-md ${
                isInCart(product._id)
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isInCart(product._id) ? "Item Added" : "Add to Cart"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Fashion;
