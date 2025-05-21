import React from "react";
import { useShop } from "../context/ShopContext";

const CartItem = ({ item }) => {
  const { state, dispatch } = useShop();

  const increment = () => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item.id });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: item.id });
  };

  const remove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  // Get live stock info for this item from global product state
  const product = state.products.find((p) => p.id === item.id);

  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <span
            className="text-red-500 text-sm cursor-pointer"
            onClick={remove}
          >
            ×
          </span>
        </div>
        <p className="text-sm text-gray-500">Size: Large</p>
        <p className="text-sm text-gray-500">Color: Default</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${item.price}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrement}
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button
              onClick={increment}
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
              disabled={product?.stock === 0}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
