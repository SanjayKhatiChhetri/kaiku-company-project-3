import React, { useEffect } from "react";
import noWifiIc from "../images/noWifiIc.svg";

function GenObsNoWifiIndicator({ count }) {
  useEffect(() => {}, [count]);
  return (
    <div className="navItem-right">
        <div className="noWifiCounterBadge">
        <span className="connection-status">
            <span className="counter-badge">{count}</span>
            <i>
            <img src={noWifiIc} alt="noWifiIc" />
            </i>
        </span>
        </div>
    </div>
  );
}

export default GenObsNoWifiIndicator;
