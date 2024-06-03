import React from "react";
import backBtn from "../../../../images/backBtn.svg";
import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      className="navItem-left"
      onClick={() => navigate("/")}
    >
      <img src={backBtn} alt="backBtn" />
    </div>
  );
}

export default BackBtn;
