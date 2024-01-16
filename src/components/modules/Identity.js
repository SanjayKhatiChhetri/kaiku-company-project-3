import React from "react";
import { UserIc } from "../../Icons/Customicons";

export default function Identity() {
    return (
      <>
        <div className="id-user">
          <div className="user-pic">
            <UserIc />
          </div>
          <h4>Nimi</h4>
        </div>
      </>
    );
  }