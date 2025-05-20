import React from "react";
import CartItem from "./CartItem";

// Import images at the top (ESM-compatible)
import img9_2 from "../assets/image 9-2.png";

const cartItems = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    image: img9_2,
    price: 145,
    size: "Large",
    color: "White",
    quantity: 1,
  },
  {
    id: 2,
    name: "Checkered Shirt",
    image: img9_2,
    price: 180,
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: 3,
    name: "Skinny Fit Jeans",
    image: img9_2,
    price: 240,
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
];

const Cart = () => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = Math.round(subtotal * 0.2);
  const delivery = 15;
  const total = subtotal - discount + delivery;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount (-20%)</span>
            <span>-${discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">${delivery}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Add promo code"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
            />
            <span className="absolute left-3 top-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </span>
          </div>
          <button className="bg-black text-white rounded-md px-4 py-2 text-sm">
            Apply
          </button>
        </div>

        <a
          href="#"
          className="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Go to Checkout <span className="inline-block ml-2">→</span>
        </a>
      </div>
    </div>
  );
};

export default Cart;
