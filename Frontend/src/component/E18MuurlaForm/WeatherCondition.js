import React from "react";

function WeatherCondition({ setWthrCondition, wthrCondtion }) {
  function weatherConditionChanged(e) {
    //enables writing in weather condition field
    console.log("from weather condition");
    console.log(e.target.value);
    setWthrCondition(e.target.value);
  }
  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={weatherConditionChanged}
          value={wthrCondtion}
          type="text"
          placeholder="Sääolosuhteet"
        />
      </div>
    </>
  );
}

export default WeatherCondition;
