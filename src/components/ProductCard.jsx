import React from "react";

const ProductCard = ({ product }) => {
  const { name, image, rating, price, originalPrice, stock, isInCart } =
    product;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < fullStars ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img src={image} alt={name} className="h-full w-auto object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-xs text-gray-500 ml-1">{rating}/5</span>
          </div>
          <span className="text-xs text-gray-700">({stock} pcs left)</span>
        </div>

        <div className="flex items-center">
          <p className="font-bold">${price}</p>
          {originalPrice && (
            <p className="text-gray-400 line-through ml-2">${originalPrice}</p>
          )}
        </div>

        <button
          className={`w-full mt-2 ${
            isInCart ? "bg-red-800" : "bg-gray-800"
          } py-1 text-gray-100 rounded flex items-center justify-center transition-all active:translate-y-1 active:bg-gray-900`}
          disabled={!isInCart && stock === 0}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
