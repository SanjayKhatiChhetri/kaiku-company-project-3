import React from "react";
import threeDots from "../images/threeDots.svg";
import { UserIc } from "../Public/Asset/Icons/customIcon";
import { PlusCircleFill } from "react-bootstrap-icons";

export default function Navbar({ pageHeader}) {
  return (
    <div className="navContainer">
      <nav className="navbar">
        <div className="user-pic">
          < UserIc/>
        </div>
        <div>{pageHeader}</div>
        <div className="threedot">
          <img src={threeDots} width={26.23} height={24} />
        </div>
      </nav>
    </div>
  );
}
