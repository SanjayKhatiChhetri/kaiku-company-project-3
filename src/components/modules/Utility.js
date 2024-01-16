import React from "react";
import {
    CameraIconBlue,
    MediaIc,
    GpsIc,
} from "../../Icons/Customicons";


function Utility({}){


    return(
        <>
            <div className="cam-gps-access">
                <h3>Lisää havaintoon</h3>
                <list className="icons-list">
                    <li>
                        <MediaIc style={{cursor: 'pointer'}}/>
                    </li>

                    <li>
                        <CameraIconBlue style={{cursor:'pointer'}}/>
                    </li>


                </list>
            </div>

            <div className="gps-access">
                <h3>Tieosoite</h3>
                <div className="road-address">
                    <div className="road-address-box">
                        Syötä manuaalisesti
                    </div>
                </div>
                <GpsIc style={{cursor:'pointer'}}/>
            </div>

            <div className="gps-access">
                <h3>Tyyppi</h3>
            </div>


        
        </>
        



    );



}
export default Utility;