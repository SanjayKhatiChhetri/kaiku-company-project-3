import React from "react";
import home from "../images/home-icn.svg";
import report from "../images/report-icn.svg";
import general from "../images/group.svg";
import {  useNavigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Generalobservation from "../pages/Generalobservation";


export default function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="footer">
        <footer className="footerView">
          <div className="home" onClick={()=> navigate("/")} >
            <img src={home} width={32} height={32} alt="Home" />
            <figcaption style={{fontSize:15}}>Koti</figcaption>
          </div>

          <div className="general" onClick={() => navigate("/Generalobservation")}>
            <img src={report} alt="Report" />
            <figcaption style={{fontSize:15}}>Yleishavainnot</figcaption>
          </div>

          <div className="project_observation" onClick={()=> navigate("/Projectobservation")}>
            <img src={general} width={28} height={32} alt="General" />
            <figcaption style={{fontSize:15}}>Projekti havainnot</figcaption>
          </div>
        </footer>
      </div>
    </div>
  );
}
