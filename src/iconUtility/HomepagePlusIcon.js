import React from "react";
import plusCircleIcon from "../images/pluscircleIcon.svg";
import { useNavigate } from "react-router-dom";

function HomepagePlusIcon() {
  const navigate = useNavigate();
  return (
    <div style={{ cursor: "pointer" }}>
      <div
        className="navItem-right"
        onClick={() => navigate("/Generalobservation")}
      >
        <img src={plusCircleIcon} alt="plusCircleIcon" />
      </div>
    </div>
  );
}

export default HomepagePlusIcon;
