import React from "react";


export default function Description({ setDescription,desi }) {

  function descriptionChanged(e){ //enables writing in description field
    console.log('from description')
    console.log(e.target.value)
    setDescription(e.target.value)
  }
  

  return (
    <>
      <div className="input-field-container" id="description-ctn">
        <textarea
          onChange={descriptionChanged}
          value={desi}
          className="input-field"
          placeholder="Kuvaus..."
        />
      </div>
    </>
  );
}
