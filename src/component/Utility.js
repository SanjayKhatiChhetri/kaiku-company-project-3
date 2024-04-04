import React, { useEffect, useState } from "react";
import { GpsIc } from "../Public/Asset/Icons/CostumIcon";

function Utility({ setLatitude, setLongitude, lati , longi }) {

  let [latitude, setlatitude] = useState(null);
  let [longitude, setlongitude] = useState(null);
 

  function getgps() {
    navigator.geolocation.getCurrentPosition((post) => {
      setlatitude((p) => post.coords.latitude);
      setlongitude((p) => post.coords.longitude);

   
      setLatitude(post.coords.latitude)
      setLongitude(post.coords.longitude)
    });

  }

  useEffect(() => { //gets the gps when app starts
    getgps()
  },[]);


  return (
    <>
      <div className="cam-gps-access">
        <h3> Sijainti </h3>
        <div className="road-address" >
        {
            lati !== 0 && longi !== 0
            ?
            <p className="location-p">{lati},{longi}</p>
            :
            ''
            
          }
          </div>
        <list className="icons-list">

          {/* gps */}
          <li onClick={getgps}>
            <GpsIc style={{ cursor: 'pointer' }} />
          </li>
        </list>
      </div>
    </>
  );
}
export default Utility;
