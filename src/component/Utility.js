import React, { useEffect, useState } from "react";
import { MediaIc, GpsIc } from "../Public/Asset/Icons/CostumIcon";

function Utility({ imgState, imgSetState, setLatitude, setLongitude, imageFile, setImageFile, lati , longi }) {
  let [latitude, setlatitude] = useState(null);
  let [longitude, setlongitude] = useState(null);
  let [imageFiles, setImageFiles] = useState([]);
  let [images, setImages] = useState([]);

  function getgps() {
    navigator.geolocation.getCurrentPosition((post) => {
      setlatitude((p) => post.coords.latitude);
      setlongitude((p) => post.coords.longitude);

   
      setLatitude(post.coords.latitude)
      setLongitude(post.coords.longitude)
    });

  }

  useEffect(() => {
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
