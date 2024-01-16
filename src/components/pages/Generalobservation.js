import React from "react";
import logo from "../../images/tentrio.png";
import vector from "../../images/vector.svg";
import Footer from "../modules/Footer";
import UploadPhoto from "../modules/UploadPhoto";
import Utility from "../modules/Utility";
import Identity from "../modules/Identity";
import Description from "../modules/Description";
import Post from "../modules/Post";

function Generalobservation() {
    return (
        <div className="generalobs">
            <div className="navContainer">
                <nav className="navbar">
                    <div className="logo">
                        <img src={logo} width={150} height={17} />
                    </div>

                    <div>Yleishavainto</div>
                    <div className="threedot">
                        <img src={vector} width={26.23} height={24} />
                    </div>
                </nav>
            </div>
           
           <UploadPhoto/>
           <Utility />
           <Identity />
           <Description />
           <Post/>

           

            <Footer />
        </div>
    )
}

export default Generalobservation