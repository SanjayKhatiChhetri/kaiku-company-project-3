import React from 'react'

function RoadTemperature({setRoadTemp, roadTemp}) {
  function roadTempChanged(e) {
    //enables writing in road temperature field
    console.log("from road temperature");
    console.log(e.target.value);
    setRoadTemp(e.target.value);
  }
  return (
    <>
      <div className="input-field-container">
        <input
          className="input-field"
          onChange={roadTempChanged}
          value={roadTemp}
          type="text"
          placeholder="Tien lämpötila"
        />
      </div>
    </>
  );
}

export default RoadTemperature;