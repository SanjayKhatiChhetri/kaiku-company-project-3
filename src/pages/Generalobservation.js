import React, { useEffect, useState } from "react";
import "../App.css";
import UploadPhoto from "../component/UploadPhoto";
import Utility from "../component/Utility";
import Description from "../component/Description";
import Post from "../component/Post";
import Dropd from "../component/Dropd";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import ShowMessage from "../component/ShowMessage";
import TotalPostCounter from "../component/TotalPostCounter";
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

function Generalobservation() {
  let [typ, setTyp] = useState("");
  let [imgUrl, setImgUrl] = useState([]);
  let [lat, setLat] = useState(0);
  let [long, setLong] = useState(0);
  let [dec, setDes] = useState("");
  let [imageFiles, setImageFiles] = useState([]);
  let [isUploading, setIsUploading] = useState(false);
  let [isShowMessage, setIsShowMessage] = useState(false);
  let [uploadingPer, setUploadingPer] = useState(0);
  let [message, setMessage] = useState("");
  let [isOffline, setIsOffline] = useState(false);
  let [allIndexedData, setAllIndexedData] = useState([]);
  let [totalPost, setTotalPost] = useState(null);

  useEffect(() => {
    console.log("all indexed data");
    readAllData("sync-posts").then((data) => {
      console.log("all indexed data from app.js");
      console.log(data);
      setTotalPost(data.length);
    });
  }, [allIndexedData]);

  useEffect(async () => {
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
                        setIsShowMessage(true);
                        setTimeout(() => {
                          setIsShowMessage(false);
                        }, 3000);

                        console.log("File available at", downloadURL);
                      }
                    );
                  }
                );
              });
          });

          setImgUrl([]);
          setLat(0);
          setLong(0);
          setDes("");
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
          <Navbar pageHeader={`YLEISHAVAINTO`} />
          <div className="notification_overlay">
            {isOffline && <ShowMessage message={message} />}
            {isOffline && <TotalPostCounter count={totalPost} />}
          </div>
          <UploadPhoto
          imgState={imgUrl}
          imgSetState={setImgUrl}
          imageFile={imageFiles}
          setImageFile={setImageFiles}
        />

        {/* box for camera access  and photo select and gps  icons  */}
        <Utility
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
        <Dropd type={typ} setType={setTyp} />


        {/* box for description  */}
        <Description setDescription={setDes} desi={dec} />
        {/* post button */}
        <Post onSubmit={addData} />

        <Footer />
      </div>
    </div>
  );
}

export default Generalobservation;
