import React from "react";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-white font-satoshi">
        <TopBanner />
        <Navbar />
      </div>
    </>
  );
}

export default App;
