import React, { createContext, useReducer, useContext } from "react";
import productsData from "../data/products";

const ShopContext = createContext();

const initialState = {
  products: productsData,
  cart: [],
  filter: {
    sortBy: "",
    searchQuery: "",
  },
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;

      if (state.cart.find((item) => item.id === product.id)) return state;

      const updatedProducts = state.products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p,
      );

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
        products: updatedProducts,
      };
    }

    case "REMOVE_FROM_CART": {
      const productId = action.payload;

      const removedItem = state.cart.find((item) => item.id === productId);
      if (!removedItem) return state;

      const updatedProducts = state.products.map((p) =>
        p.id === productId
          ? { ...p, stock: p.stock + removedItem.quantity }
          : p,
      );

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productId),
        products: updatedProducts,
      };
    }

    case "INCREMENT_QUANTITY": {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      const cartItem = state.cart.find((item) => item.id === productId);

      if (!product || product.stock === 0 || !cartItem) return state;

      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );

      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p,
      );

      return { ...state, cart: updatedCart, products: updatedProducts };
    }

    case "DECREMENT_QUANTITY": {
      const productId = action.payload;
      const cartItem = state.cart.find((item) => item.id === productId);
      if (!cartItem) return state;

      // If quantity is 1 → remove from cart
      if (cartItem.quantity === 1) {
        const updatedProducts = state.products.map((p) =>
          p.id === productId ? { ...p, stock: p.stock + 1 } : p,
        );

        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== productId),
          products: updatedProducts,
        };
      }

      // Else just decrement quantity
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );

      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p,
      );

      return {
        ...state,
        cart: updatedCart,
        products: updatedProducts,
      };
    }

    case "UPDATE_SORT":
      return {
        ...state,
        filter: { ...state.filter, sortBy: action.payload },
      };

    case "UPDATE_SEARCH":
      return {
        ...state,
        filter: { ...state.filter, searchQuery: action.payload },
      };

    default:
      return state;
  }
};

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
