import React from "react";
import wifiIc from "../../../../images/wifiIc.svg";
import { useNavigate } from "react-router-dom";

function GenObsWifiIndicator() {
  const navigate = useNavigate();
  return (
    <div className="navItem-right">
      <img src={wifiIc} alt="wifiIc" />
    </div>
  );
}

export default GenObsWifiIndicator;
