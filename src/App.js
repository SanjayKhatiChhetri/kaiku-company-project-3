import React from "react";
import "./App.css";
import Map from "./components/modules/Map";
import Navbar from "./components/modules/Navbar";
import Footer from "./components/modules/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Map />
      <Footer />
    </div>
  );
}

export default App;
