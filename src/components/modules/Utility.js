import React from "react";

import { useState } from "react";
import {
    GpsIc,
} from "../../Icons/Customicons";


function Utility({setLatitude, setLongitude, lati, longi,setAddress,addr }){
    let [latitude, setlatitude] = useState(null);
    let [longitude, setlongitude] = useState(null);


    function getgps() {
        navigator.geolocation.getCurrentPosition((post) => {
          setlatitude((p) => post.coords.latitude);
          setlongitude((p) => post.coords.longitude);
    
          // parent set
          setLatitude(post.coords.latitude)
          setLongitude(post.coords.longitude)
        });
      }

    return(
        <>

            <div className="road-address-container">
                <h5>Sijainti</h5>
                <div className="road-address">
                        
                    <div className="road-address-box">
                        
                        {
                            
                            lati !== 0 && longi !== 0
                            ?
                            <p className="location-p">{lati},{longi}</p>
                            :
                            ''
                        }
                    </div>
                </div>
                <list className="icons-list">
                    <li onClick={getgps}>

                        <GpsIc style={{cursor:'pointer'}}/>

                    </li>

                </list>

            </div>



        
        </>
        
    );



}
export default Utility;