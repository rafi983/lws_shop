import React from "react";
import { useShop } from "../context/ShopContext.jsx";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useShop();
  const isInCart = state.cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.stock > 0 && !isInCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < fullStars ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs text-gray-500 ml-1">
              {product.rating}/5
            </span>
          </div>
          <span className="text-xs text-gray-700">
            ({product.stock} pcs left)
          </span>
        </div>

        <div className="flex items-center">
          <p className="font-bold">${product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-400 line-through ml-2">
              ${product.originalPrice}
            </p>
          )}
        </div>
        <button
          className={`w-full mt-2 ${
            isInCart ? "bg-red-800" : "bg-gray-800"
          } py-1 text-gray-100 rounded flex items-center justify-center transition-all active:translate-y-1 active:bg-gray-900 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed`}
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          disabled={!isInCart && product.stock === 0}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
