import React, { useEffect } from "react";
import noWifiIc from "../../../../images/noWifiIc.svg";

function GenObsNoWifiIndicator({ count }) {
  useEffect(() => {}, [count]);
  return (
    <div className="navItem-right">
      <span className="noWifiIc">
        <img src={noWifiIc} alt="noWifiIc" />
      </span>
      <span className="counter-badge">{count}</span>
    </div>
  );
}

export default GenObsNoWifiIndicator;
