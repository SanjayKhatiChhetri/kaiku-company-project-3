import React from "react";
import vector from "../../images/vector.svg";

export default function Navbar() {
  return (
    <div>
      <div className="navContainer">
        <nav className="navbar">
          <div>Koti </div>
          <div className="threedot">
            <img src={vector} width={26.23} height={24} alt="ThreeDot" />
          </div>
        </nav>
      </div>
    </div>
  );
}
