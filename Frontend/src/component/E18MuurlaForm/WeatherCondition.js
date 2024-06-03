import React from "react";

function WeatherCondition({ setWeatherCond, WeatherCond }) {
  function weatherConditionChanged(e) {
    //enables writing in weather condition field
    console.log("from weather condition");
    console.log(e.target.value);
    setWeatherCond(e.target.value);
  }
  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={weatherConditionChanged}
          value={WeatherCond}
          type="text"
          placeholder="Sääolosuhteet"
        />
      </div>
    </>
  );
}

export default WeatherCondition;
