import React from 'react';
import Select from 'react-select';







export default function Dropd({type,setType}) {
    const tyypit = [
        { label: 'Ei laadunalitusta', value: 1 },
        { label: 'Seurattava', value: 2 },
        { label: 'Laadunalitus', value: 3 },
      
      ];
    function typeChanged(e){
      setType(e)
      }
    
    
  return (
    <div className='dropdown'>
      <h7>Tyyppi</h7>
      <Select
        onChange={typeChanged}
        options={tyypit}
        value={type}
        placeholder=""
        
        
        
        

        styles={{
          control: (provided,) => ({
            ...provided,
            height: 42,
            borderRadius:10,
            fontSize:17,
            paddingLeft: 10,
            fontWeight: 700,
            display:'flex',
            width:292,
            fontStyle:"normal",
            fontFamily:"Times New Roman, Times, serif"
            
         
          }),
        }}
      />
      
    </div>
  );
}