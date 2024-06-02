import React from "react";
import { useNavigate } from "react-router-dom";

function HomePageFormsButton() {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      className="navItem-right"
      onClick={() => navigate("/FormE18Muurla")}
    >
      Forms
    </div>
  );
}

export default HomePageFormsButton;
