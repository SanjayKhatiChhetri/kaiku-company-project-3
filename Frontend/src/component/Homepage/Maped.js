import { React, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { CrossHairIC } from "../../Public/Asset/Icons/customIcon";

export default function Map(lat, lng) {
  const [location, setLocation] = useState({ lat: 65.01236, lng: 25.46816 });

  const containerStyle = { width: "100vw", height: "100vh" };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        },
        () => {
          alert("Permission Denied or Issue Retrieving Location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const myGoogleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div className="mapBox">
      <div className="khali">
        <LoadScript googleMapsApiKey="AIzaSyBGMem1ce6iKc3QJ-RoqTNgsNLDhFoqt60">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              scaleControl: false,
              mapTypeControl: true,
              panControl: true,
              rotateControl: true,
              fullscreenControl: false,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
          >
            <Marker position={location} />
          </GoogleMap>
          <button
            onClick={fetchLocation}
            style={{
              position: "fixed",
              bottom: "25px",
              right: "20px",
              border: "none",
              backgroundColor: "transparent",
              zindex: "1000",
            }}
          >
            <CrossHairIC />
          </button>
        </LoadScript>
      </div>
    </div>
  );
}
