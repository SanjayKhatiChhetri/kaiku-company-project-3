import React from "react";
import Footer from "../component/Footer";
import { UserIc } from "../Public/Asset/Icons/CostumIcon";
import  Button  from "@mui/material/Button";
import vector from "../images/vector.svg"
import { ToggleButton } from "@mui/material";

function Projectobservation() {

    function getlocation() {
        navigator.geolocation.getCurrentPosition((post) => {
            setlatitude((p) => post.coords.latitude);
            setlongitude((p) => post.coords.longitude);
      
         
            setLatitude(post.coords.latitude)
            setLongitude(post.coords.longitude)
          });
    }

    return (
        <div className="projectobs">
            

            <div className="navContainer">
                <nav className="navbar">
                    <div className="user-pic"> <UserIc />
                     
                    </div>
     
                    <div>Projektihavainto</div>
                    
                    <div className="threedot">
                        <img src={vector} width={26.23} height={24} alt="Three" />
                    </div>
                </nav>
            </div>
            
            <Footer/>

            <div className="point-btn">
                <Button variant="contained" size="large" onClick={()=>{
                    alert("clicked")
                }}>Pistehavainto</Button>

            </div>

            <div className="continious-btn">

                <ToggleButton  size="large" color="primary"> Vesakointipuute </ToggleButton>
                
            
            </div>    

            






        </div>
    );

}

export default Projectobservation;