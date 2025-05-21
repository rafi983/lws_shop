import React, { createContext, useReducer, useContext } from "react";
import productsData from "../data/products";

const ShopContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const initialState = {
  products: loadFromStorage("products", productsData),
  cart: loadFromStorage("cart", []),
  filter: {
    sortBy: "",
    searchQuery: "",
  },
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const updatedCart = [...state.cart, { ...product, quantity: 1 }];
      const updatedProducts = state.products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p,
      );
      saveToStorage("cart", updatedCart);
      saveToStorage("products", updatedProducts);
      return { ...state, cart: updatedCart, products: updatedProducts };
    }

    case "REMOVE_FROM_CART": {
      const productId = action.payload;
      const cartItem = state.cart.find((item) => item.id === productId);
      if (!cartItem) return state;

      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + cartItem.quantity } : p,
      );
      const updatedCart = state.cart.filter((item) => item.id !== productId);

      saveToStorage("cart", updatedCart);
      saveToStorage("products", updatedProducts);

      return { ...state, cart: updatedCart, products: updatedProducts };
    }

    case "INCREMENT_QUANTITY": {
      const productId = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p,
      );

      saveToStorage("cart", updatedCart);
      saveToStorage("products", updatedProducts);

      return { ...state, cart: updatedCart, products: updatedProducts };
    }

    case "DECREMENT_QUANTITY": {
      const productId = action.payload;
      const cartItem = state.cart.find((item) => item.id === productId);
      if (!cartItem || cartItem.quantity <= 1) return state;

      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );
      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p,
      );

      saveToStorage("cart", updatedCart);
      saveToStorage("products", updatedProducts);

      return { ...state, cart: updatedCart, products: updatedProducts };
    }

    case "UPDATE_SORT": {
      return { ...state, filter: { ...state.filter, sortBy: action.payload } };
    }

    case "UPDATE_SEARCH": {
      return {
        ...state,
        filter: { ...state.filter, searchQuery: action.payload },
      };
    }

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
