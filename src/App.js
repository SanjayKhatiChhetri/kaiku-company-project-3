import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Map from "./component/Maped";

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
