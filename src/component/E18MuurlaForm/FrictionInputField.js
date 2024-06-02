import React from "react";

function FrictionInputField({ setFriction, friction}) {
  function frictionChanged(e) {
    //enables writing in friction field
    console.log("from friction");
    console.log(e.target.value);
    setFriction(e.target.value);
  }
  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={frictionChanged}
          value={friction}
          type="text"
          placeholder="Kitka"
        />
      </div>
    </>
  );
}

export default FrictionInputField;
