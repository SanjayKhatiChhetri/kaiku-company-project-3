import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import Map from "../component/Maped";
import Footer from "../component/Footer";

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

  return (
    <div className="app">
      <Navbar pageHeader={`KOTISIVU`} />
      <Map />
      <Footer />
    </div>
  );
}

export default Homepage;
