import React from "react";
import Navbar from "../component/Navbar";
import Map from "../component/Maped";
import Footer from "../component/Footer";

function Homepage() {
  return (
    <div className="app">
      <Navbar />
      <Map />
      <Footer />
    </div>
  );
}

export default Homepage;
