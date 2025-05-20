import React, { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white py-2 px-4 text-center text-sm relative">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="underline font-medium">
          Sign Up Now
        </a>
      </p>
      <button
        className="absolute right-4 top-2 text-white"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
    </div>
  );
};

export default TopBanner;
