import React from "react";

export default function Description({ setDescription,desi }) {

  function descriptionChanged(e){
    console.log('from description')
    console.log(e.target.value)
    setDescription(e.target.value)
  }

  return (
    <>
      <div className="description">
        <label className="descLabel"> Selite:  </label>
        <textarea
          onChange={descriptionChanged}
          value={desi}
          rows="5"
          cols="43"
          className="description-box"
          placeholder=""
        />
      </div>
    </>
  );
}
