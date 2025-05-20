import React from "react";
import ProductCard from "./ProductCard";
import { useShop } from "../context/ShopContext.jsx";

const ProductList = () => {
  const { state, dispatch } = useShop();
  const { products, filter } = state;
  const { sortBy, searchQuery } = filter;

  // Filter by search
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "POPULARITY":
        return b.rating - a.rating;
      case "NEWEST":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "PRICE_ASC":
        return a.price - b.price;
      case "PRICE_DESC":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Sort by:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            onChange={(e) =>
              dispatch({ type: "UPDATE_SORT", payload: e.target.value })
            }
          >
            <option value="">Default</option>
            <option value="POPULARITY">Most Popular</option>
            <option value="NEWEST">Newest</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
