import React, {useState,useEffect} from "react";
import vector from "../../images/vector.svg";
import Footer from "../modules/Footer";
import UploadPhoto from "../modules/UploadPhoto";
import Utility from "../modules/Utility";
import Identity from "../modules/Identity";
import Description from "../modules/Description";
import Post from "../modules/Post";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } from "@firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, storage } from "../modules/FirebaseConfig"

import Resizer from "@meghoshpritam/react-image-file-resizer";


import RingLoader from "react-spinners/RingLoader";
import Dropd from "../modules/Dropdown";
import { UserIc } from "../../Icons/Customicons";




function Generalobservation() {
    const [selectedOption, setSelectedOption] = useState("");
    let [dec, setDes] = useState('')
    let [typ,setTyp] = useState("")
    let [lat, setLat] = useState(0)
    let [long, setLong] = useState(0)
    let [imgUrl, setImgUrl] = useState([]);
    let [imageFiles, setImageFiles] = useState([])
    let [isUploading, setIsUploading] = useState(false)
    let [uploadingPer, setUploadingPer] = useState(0)
    let [isShowMessage, setIsShowMessage] = useState(false)

    useEffect(()=>{
        const readData = async()=>{
          await getDocs(collection(db, "images")).then((querySnap)=>{
            querySnap.docs.map(doc=>{
              console.log(doc.data())
            })
          })
        }
    
        // readData();
      },[])


      const resizeFile = (file) =>
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
          outputType: "base64"
        });
      });
  



    const addData = async()=> {

        try{
            let docRef = await addDoc(collection(db, "data"), {
            latitude: lat,
            longitude: long,
            description: dec,
            dropdown : typ
            })

            if(docRef){
                imageFiles.map(async(file)=>{
                    console.log('from app.js inside loop')
          
                    const image = await resizeFile(file);
                    console.log('from app.js')
                    console.log(image)
          
                    fetch(image)
                    .then(res=>res.blob())
                    .then(blob=>{
                      let randFileName = Math.floor(Math.random() * 1000) + 1;
                      let timeNow = Date.now()
                      const resizedFile = new File([blob], `${randFileName+timeNow}.jpg`, { type: "image/jpeg" });
                      
                      const storageRef = ref(storage, 'new_images/' + resizedFile.name);
                      const uploadTask = uploadBytesResumable(storageRef, resizedFile);
          
                      uploadTask.on('state_changed',
                      snapshot =>{
                        setIsUploading(true)
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                      },
                      error =>{
                        console.error("Error uploading file: ", error);
                      },
                      ()=>{
                        // Handle successful uploads on complete
                        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                          await updateDoc(docRef, {
                            images: arrayUnion(downloadURL)
                          });
                          setIsUploading(false)
                          setIsShowMessage(true)
                          setTimeout(()=>{
                            setIsShowMessage(false)
                          }, 3000)
                          console.log('File available at', downloadURL);
                        });
                      }
                      )
          
                    })
                  })

                setLat(0);
                setLong(0);
                setDes('');
                setTyp("");
                setImgUrl([]);
                setImageFiles([]);
            }





            

        }catch(e){
            console.log(`error while adding data in firestore: ${e}`)
        }
    }
    return (
        <div className="generalobs">
            <div className="navContainer">
                <nav className="navbar">
                    <div className="user-pic"> <UserIc />
                     
                    </div>
     
                    <div>Yleishavainto</div>
                    
                    <div className="threedot">
                        <img src={vector} width={26.23} height={24} alt="Three" />
                    </div>
                </nav>
            </div>

          <div className="rest" data-uploading={isUploading ? 'true' : 'false'} >
           <UploadPhoto imgState={imgUrl} imgSetState={setImgUrl} imageFile={imageFiles} setImageFile={setImageFiles} />

           <Utility lati={lat} longi={long} setLatitude={setLat} setLongitude={setLong}/>

           <Dropd type={typ} setType={setTyp}  />

           

            {/* box for description  */}
           <Description setDescription={setDes} desi={dec} />

           <Post onSubmit={addData}/>


            <Footer />
          </div>  

          <div className="uploading" data-uploading={isUploading ? 'true' : 'false'} >
            {/* <h1>Uploading...</h1> */}
            <RingLoader
              color="blue"
              loading={isUploading}
              size={150}
              aria-label="Loading Spinner"
            />
          </div>

          <div className="success-parent" data-success={isShowMessage ? 'true' : 'false'}>

            <div className="success-message">
              <p className="success-text">Success!!</p>
            </div>

          </div>




        </div>
    );
}

export default Generalobservation