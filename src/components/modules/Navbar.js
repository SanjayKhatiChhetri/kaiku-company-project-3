import React from "react";
import logo from "../../images/tentrio.png";
import vector from "../../images/vector.svg";

export default function Navbar() {
  return (
    <div>
      <div className="navContainer">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} width={150} height={17} />
          </div>
          <div>Home</div>
          <div className="threedot">
            <img src={vector} width={26.23} height={24} />
          </div>
        </nav>
      </div>
    </div>
  );
}
