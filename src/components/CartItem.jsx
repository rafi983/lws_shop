import React from "react";

const CartItem = ({ item }) => {
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
          <span className="text-red-500 text-sm cursor-pointer">×</span>
        </div>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="text-sm text-gray-500">Color: {item.color}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${item.price}</p>
          <div className="flex items-center space-x-2">
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              −
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
