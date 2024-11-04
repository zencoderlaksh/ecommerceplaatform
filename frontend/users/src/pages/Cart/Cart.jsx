import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/Slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-8">
      <div className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center mb-4 p-4 border rounded-md"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p>${item.product.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.productId))}
                    className="border border-gray-300 rounded px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.productId))}
                    className="border border-gray-300 rounded px-2"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <p className="text-lg">Total Amount: ${totalAmount.toFixed(2)}</p>
        <Link to="/checkout">
          <button className="w-full bg-blue-500 text-white mt-4 p-2 rounded-md hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
