import React, { useEffect, useState } from "react";
import backBtn from "../images/backBtn.svg";
import noWifiIc from "../images/noWifiIc.svg";
import "../App.css";
import Navbar from "../component/Common/NavBar/Navbar";
import GenObsBackBtn from "../component/Common/NavBar/NavbarIconUtility/BackBtn";
import GenObsNoWifiIndicator from "../component/Common/NavBar/NavbarIconUtility/GenObsNoWifiIndicator";
import GenObsWifiIndicator from "../component/Common/NavBar/NavbarIconUtility/GenObsWifiIndicator";
import SyncedPost from "../component/Common/SyncedPost";
import UploadPhoto from "../component/Common/UploadPhoto";
import Location from "../component/Common/Location";
import Description from "../component/Common/Description";
import TypeSelector from "../component/Common/TypeSelector";
import AirTemparature from "../component/E18MuurlaForm/AirTemparature";
import RoadTemperature from "../component/E18MuurlaForm/RoadTemperature";
import FrictionInputField from "../component/E18MuurlaForm/FrictionInputField";
import WeatherCondition from "../component/E18MuurlaForm/WeatherCondition";
import SubmitBtn from "../component/Common/SubmitBtn";
//database stuff
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../component/FirebaseConfig";
// resizer
import Resizer from "@meghoshpritam/react-image-file-resizer";

function FormE18Muurla() {
  let [message, setMessage] = useState("");
  let [isOffline, setIsOffline] = useState(false);
  let [allIndexedData, setAllIndexedData] = useState([]);
  let [totalPost, setTotalPost] = useState(null);
  let [syncedData, setSyncedData] = useState(0);
  let [typ, setTyp] = useState("");
  let [imgUrl, setImgUrl] = useState([]);
  let [lat, setLat] = useState(0);
  let [long, setLong] = useState(0);
  let [dec, setDes] = useState("");
  let [airTemp, setAirTemp] = useState("");
  let [roadTemp, setRoadTemp] = useState("");
  let [friction, setFriction] = useState("");
  let [wthrCondtion, setWthrCondition] = useState("");
  let [imageFiles, setImageFiles] = useState([]);
  let [isUploading, setIsUploading] = useState(false);
  let [uploadingPer, setUploadingPer] = useState(0);

  useEffect(() => {
    readAllData("synced-data")
      .then((data) => {
        data.map((dt) => {
          console.log("each synced data about to be deleted");
          console.log(dt);
          deleteItemFromData("synced-data", dt.id);
        });
      })
      .then(() => {
        console.log("all data deleted");
        setTimeout(() => {
          setSyncedData(0);
        }, 5000);
      });
  }, [syncedData]);

  useEffect(() => {
    console.log("all indexed data");

    readAllData("sync-posts").then((data) => {
      console.log("all indexed data from app.js");
      console.log(data);
      setTotalPost(data.length);
    });

    readAllData("synced-data").then((data) => {
      console.log("all synced data after online");
      console.log(data);
      setSyncedData(data.length);
    });
  }, [allIndexedData]);

  useEffect(() => {
    if (isOffline) {
      console.log("offline");
    }

    const handleOnlineStatus = async () => {
      if (navigator.onLine) {
        console.log("Site is online");
        setMessage("Site is online");
        setIsOffline(false);

        readAllData("sync-posts").then((data) => {
          console.log("all indexed data from app.js when online");
          console.log(data);
          setTotalPost(data.length);
        });

        setTimeout(() => {
          readAllData("synced-data").then((data) => {
            console.log("************************************");
            console.log("all synced data");
            console.log(data);
            setSyncedData((prev) => prev + data.length);
          });
        }, 2000);
      } else {
        console.log("Site is offline");
        setMessage("sivusto on offline-tilassa");
        setIsOffline(true);
        readAllData("sync-posts").then((data) => {
          console.log("all indexed data from app.js");
          console.log(data);
          setTotalPost(data.length);
        });
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

  const resizeFile = (
    file //resize images
  ) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer({
        file,
        maxWidth: 300,
        maxHeight: 300,
        compressFormat: "JPEG",
        quality: 100,
        rotation: 0,
        keepAspectRatio: true,
        responseUriFunc: (uri) => {
          resolve(uri);
        },
        outputType: "base64",
      });
    });

  const addData = async () => {
    console.log("after submit");
    console.log(imageFiles);

    try {
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(async (sw) => {
          let images = [];

          const imagePromises = imageFiles.map(async (file) => {
            const image = await resizeFile(file);

            const response = await fetch(image);
            const blob = await response.blob();

            let randFileName = Math.floor(Math.random() * 1000) + 1;
            let timeNow = Date.now();
            const resizedFile = new File(
              [blob],
              `${randFileName + timeNow}.jpg`,
              { type: "image/jpeg" }
            );
            images.push(resizedFile);
          });

          await Promise.all(imagePromises);

          let post = {
            id: new Date().toISOString(),
            latitude: lat,
            longitude: long,
            description: dec,
            airTemperature: airTemp,
            roadTemperature: roadTemp,
            roadFriction: friction,
            weatherCondition: wthrCondtion,
            images: imageFiles,
          };

          writeData("sync-posts", post)
            .then(() => {
              console.log("sync registering");
              return sw.sync.register("sync-new-post");
            })
            .then(() => {
              console.log("sync registered");
              console.log("New post registered");
              console.log(post);
              setAllIndexedData([...allIndexedData, post]);

              //rest the form after submit
              setTyp("");
              setImgUrl([]);
              setLat(0);
              setLong(0);
              setDes("");
              setAirTemp("");
              setRoadTemp("");
              setFriction("");
              setWthrCondition(""); // Ensure this line is correctly placed
              setImageFiles([]);
              setIsUploading(false);
              setUploadingPer(0);
              setMessage("");
              setAllIndexedData([]);
              setTotalPost(null);
            })
            .catch((err) => {
              console.log("sync registration failed");
              console.log(`'new post registration failed: ${err}'`);
            });
        });
      } else {
        console.log("from firebase");
        let docRef = await addDoc(collection(db, "data"), {
          latitude: lat,
          longitude: long,
          description: dec,
          airTemperature: airTemp,
          roadTemperature: roadTemp,
          roadFriction: friction,
          weatherCondition: wthrCondtion,
        });

        if (docRef) {
          imageFiles.map(async (file) => {
            console.log("from app.js inside loop");

            const image = await resizeFile(file);
            console.log("from app.js");
            console.log(image);

            fetch(image)
              .then((res) => res.blob())
              .then((blob) => {
                let randFileName = Math.floor(Math.random() * 1000) + 1;
                let timeNow = Date.now();
                const resizedFile = new File(
                  [blob],
                  `${randFileName + timeNow}.jpg`,
                  { type: "image/jpeg" }
                );

                const storageRef = ref(
                  storage,
                  "new_images/" + resizedFile.name
                );
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  resizedFile
                );

                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    setIsUploading(true);
                    var progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                  },
                  (error) => {
                    console.error("Error uploading file: ", error);
                  },
                  () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      async (downloadURL) => {
                        await updateDoc(docRef, {
                          images: arrayUnion(downloadURL),
                        });
                        setIsUploading(false);

                        console.log("File available at", downloadURL);
                      }
                    );
                  }
                );
              });
          });

          // Reset state
          setImgUrl([]);
          setLat(0);
          setLong(0);
          setDes("");
          setAirTemp("");
          setRoadTemp("");
          setFriction("");
          console.log("Resetting weatherCondition");
          setWthrCondition("");
          console.log("weatherCondition reset");
          setImageFiles([]);
        }
      }
    } catch (err) {
      console.error(`error while adding data in firestore: ${err}`);
    }
  };

  return (
    <div className="App">
      <div className="rest">
        <Navbar
          navComponentLeft={<GenObsBackBtn />}
          pageHeader={`Form E18 Muurla`}
          navComponentRight={!isOffline && <GenObsWifiIndicator />}
          navComponentRightNoNet={
            isOffline && <GenObsNoWifiIndicator count={totalPost} />
          }
        />

        <div hidden>
          <img src={backBtn} alt="backBtn" />
          <img src={noWifiIc} alt="noWifiIc" />
        </div>
        {syncedData > 0 ? <SyncedPost count={syncedData} /> : ""}

        {/* box for uploading photo  */}
        <UploadPhoto
          imgState={imgUrl}
          imgSetState={setImgUrl}
          imageFile={imageFiles}
          setImageFile={setImageFiles}
        />

        {/* box for camera access  and photo select and gps  icons  */}
        <Location
          lati={lat}
          longi={long}
          imgState={imgUrl}
          imgSetState={setImgUrl}
          imageFile={imageFiles}
          setImageFile={setImageFiles}
          setLatitude={setLat}
          setLongitude={setLong}
        />
        {/* maps */}
        <TypeSelector type={typ} setType={setTyp} />

        {/* box for description  */}
        <Description setDescription={setDes} desi={dec} />

        {/* Air Temperature field */}
        <AirTemparature setAirTemp={setAirTemp} airTemp={airTemp} />
        {/* <InputFiled inputValue={inputValue} setInputValue={setInputValue} /> */}

        {/* road temperature */}
        <RoadTemperature setRoadTemp={setRoadTemp} roadTemp={roadTemp} />

        {/* firction */}
        <FrictionInputField setFriction={setFriction} friction={friction} />

        {/* weather condition */}
        <WeatherCondition
          setWthrCondition={setWthrCondition}
          wthrCondtion={wthrCondtion}
        />

        {/* post button */}
        <SubmitBtn onSubmit={addData} />
      </div>
    </div>
  );
}

export default FormE18Muurla;
