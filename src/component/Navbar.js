import React from "react";
import vector from "../images/vector.svg";

export default function Navbar() {
  return (
    <div>
      <div className="navContainer">
        <nav className="navbar">
          <div className="logo">
          </div>
          <div>YLEISHAVAINNOT</div>
          <div className="threedot">
            <img src={vector} width={26.23} height={24} />
          </div>
        </nav>
      </div>
    </div>
  );
}
