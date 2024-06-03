import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  pageHeader,
  navComponentLeft,
  navComponentRight,
  navComponentRightNoNet,
}) {
  const navigate = useNavigate();
  return (
    <div className="navContainer">
      <nav className="navbar">
        <div className="navItem-left">{navComponentLeft}</div>
        {pageHeader}
        {navComponentRight}
        {navComponentRightNoNet}
      </nav>
    </div>
  );
}
