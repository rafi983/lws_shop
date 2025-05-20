import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const MainContent = () => {
  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
