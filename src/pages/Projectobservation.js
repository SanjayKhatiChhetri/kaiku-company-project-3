import React from "react";
import Footer from "../component/Footer";
import { UserIc } from "../Public/Asset/Icons/CostumIcon";
import  Button  from "@mui/material/Button";
import vector from "../images/vector.svg"

function Projectobservation() {

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
                }}>terve</Button>

            </div>

            <div className="continious-btn">

                <Button variant="contained" size="large"> moro </Button>
                
            
            </div>    

            






        </div>
    );

}

export default Projectobservation;