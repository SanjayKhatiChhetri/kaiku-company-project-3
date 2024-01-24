import React from 'react';
import Select from 'react-select';

const tyypit = [
  { label: 'Ei laadunalitusta', value: 1 },
  { label: 'Seurattava', value: 2 },
  { label: 'Laadunalitus', value: 3 },

];

export default function Dropd() {
  return (
    <div>
      <Select
        options={tyypit}
        placeholder="Tyyppi"
        

        styles={{
          control: (provided,) => ({
            ...provided,
            height: 65,
            borderRadius: 10,
            fontSize:19,
            paddingLeft: 12,
            fontWeight: "bold",
         
          }),
        }}
      />
    </div>
  );
}
