import React from "react";

function WeatherCondition({ setWeatherCondition, WeatherCondition }) {
  function weatherConditionChanged(e) {
    //enables writing in weather condition field
    console.log("from weather condition");
    console.log(e.target.value);
    setWeatherCondition(e.target.value);
  }
  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={weatherConditionChanged}
          value={WeatherCondition}
          type="text"
          placeholder="Sääolosuhteet"
        />
      </div>
    </>
  );
}

export default WeatherCondition;
