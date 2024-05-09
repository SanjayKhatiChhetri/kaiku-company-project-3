import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import { UserIc } from "../Public/Asset/Icons/customIcon";

import HomepagePlusIcon from "../iconUtility/HomepagePlusIcon";
import Map from "../component/Maped";

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
        navComponentLeft={<UserIc />}
        pageHeader={`KOTISIVU`}
        navComponentRight={<HomepagePlusIcon />}
      />
      <Map />
      {/* </div> */}
    </div>
  );
}

export default Homepage;
