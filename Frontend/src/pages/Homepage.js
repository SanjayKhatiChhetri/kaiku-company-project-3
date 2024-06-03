import React, { useEffect } from "react";
import Navbar from "../component/Common/NavBar/Navbar";
import backBtn from  "../images/backBtn.svg";
import noWifiIc from "../images/noWifiIc.svg";
import HomepagePlusButton from "../component/Common/NavBar/NavbarIconUtility/HomepagePlusButton";
import HomepageFormsButton from "../component/Common/NavBar/NavbarIconUtility/HomepageFormsButton";
import Map from "../component/Homepage/Maped";

function Homepage() {
  useEffect(() => {
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        console.log("Site is online");
        // alert("Site is online");
      } else {
        console.log("Site is offline");
        alert("Site is offline");
      }
    };

    handleOnlineStatus();

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  return (
    <div className="app">
      {/* <div className="rest" data-uploading={isUploading ? "true" : "false"}> */}
      <Navbar
        navComponentLeft={<HomepageFormsButton />}
        pageHeader={`KOTISIVU`}
        navComponentRight={<HomepagePlusButton />}
      />
      <div hidden>
        <img src={backBtn} alt="backBtn" />
        <img src={noWifiIc} alt="noWifiIc" />
      </div>
      <Map />
      {/* </div> */}
    </div>
  );
}

export default Homepage;
