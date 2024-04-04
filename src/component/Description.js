import React from "react";


export default function Description({ setDescription,desi }) {

  function descriptionChanged(e){ //enables writing in description field
    console.log('from description')
    console.log(e.target.value)
    setDescription(e.target.value)
  }
  

  return (
    <>
      <div className="description">
        <textarea 
          onChange={descriptionChanged}
          value={desi}
          rows="5"
          cols="43"
          className="description-box"
          placeholder="Kuvaus..."       
          />

            <style> 
                {` 
                    ::placeholder { 
                        color: black;
                        font-weight: 600;
                        font-size: 20px;
                        opacity: 1
                    }` 
                } 
            </style> 

      </div>
    </>
  );
}
