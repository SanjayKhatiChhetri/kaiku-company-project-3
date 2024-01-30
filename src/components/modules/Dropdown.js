import React   from 'react';
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
    <div>
      <Select
        onChange={typeChanged}
        options={tyypit}
        placeholder="Tyyppi"
        value={type}
        
        

        styles={{
          control: (provided,) => ({
            ...provided,
            height: 40,
            borderRadius: 10,
            fontSize:19,
            paddingLeft: 12,
            fontWeight: "bold",
            marginBottom:45,
            
         
          }),
        }}
      />
    </div>
  );
}