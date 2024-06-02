import React from "react";
import "./App.css";
import Navbar from "./component/Common/NavBar/Navbar";
import Map from "./component/Homepage/Maped";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Map />
    </div>
  );
}

export default App;
