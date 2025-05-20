import React from "react";
import CartItem from "./CartItem";
import { useShop } from "../context/ShopContext.jsx";

const Cart = () => {
  const { state } = useShop();
  const { cart } = state;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = Math.round(subtotal * 0.2);
  const delivery = 15;
  const total = subtotal - discount + delivery;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item) => <CartItem key={item.id} item={item} />)
      )}

      {cart.length > 0 && (
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
            <input
              type="text"
              placeholder="Add promo code"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
            />
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
      )}
    </div>
  );
};

export default Cart;
