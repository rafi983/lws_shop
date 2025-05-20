import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ShopProvider } from "./context/ShopContext"; // ✅ import your provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopProvider>
      {" "}
      {/* ✅ Wrap App here */}
      <App />
    </ShopProvider>
  </React.StrictMode>,
);
