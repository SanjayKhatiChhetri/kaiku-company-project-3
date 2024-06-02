import React from "react";

function AirTemparature({ setAirTemp, airTemp }) {
  function airTempChanged(e) {
    //enables writing in air temperature field
    console.log("from air temperature");
    console.log(e.target.value);
    setAirTemp(e.target.value);
  }

  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={airTempChanged}
          value={airTemp}
          type="text"
          placeholder="Ilman lämpötila"
        />
      </div>
    </>
  );
}

export default AirTemparature;
