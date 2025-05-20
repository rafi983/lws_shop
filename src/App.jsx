import React from "react";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <div className="bg-white font-satoshi">
        <TopBanner />
        <Navbar />
        <MainContent />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default App;
