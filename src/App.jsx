import React from "react";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent.jsx";

function App() {
  return (
    <>
      <div className="bg-white font-satoshi">
        <TopBanner />
        <Navbar />
        <MainContent />
      </div>
    </>
  );
}

export default App;
