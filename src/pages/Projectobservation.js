import React, {useState, useEffect} from "react";
import Footer from "../component/Footer";
import { UserIc } from "../Public/Asset/Icons/CostumIcon";
import  Button  from "@mui/material/Button";
import vector from "../images/vector.svg"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { db, storage } from "../component/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } from "@firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Projectobservation() {

    const [alignment, setAlignment] = useState();
    const [clickCount, setClickCount] = useState(0);
    let [latitude, setlatitude] = useState(null);
    let [longitude, setlongitude] = useState(null);
    let [startlatitude, setstartlatitude] = useState(0);
    let [startlongitude, setstartlongitude] = useState(0);
    let [endlatitude, setendlatitude] = useState(0);
    let [endlongitude, setendlongitude] = useState(0);

    const tyypit = [
        { label: 'Liikennermerkki vinossa' },
        { label: 'Maakivi' },
    ]


    function getstartlocation() {
        navigator.geolocation.getCurrentPosition((post) => {

            setlatitude((p) => post.coords.latitude);
            setlongitude((p) => post.coords.longitude);
      
            setstartlatitude(post.coords.latitude);
            setstartlongitude(post.coords.longitude);
            
          });
    }

    function getendlocation() {
        navigator.geolocation.getCurrentPosition((post) => {

            setlatitude((p) => post.coords.latitude);
            setlongitude((p) => post.coords.longitude);

            setendlatitude(post.coords.latitude);
            setendlongitude(post.coords.longitude);

        });
    }

    const currTime = new Date().toLocaleTimeString(); //Get current time
    const currDate = new Date().toLocaleDateString(); //Get current date
    

    const handleChange = (event, newAlignment) => { //Handle togglebutton alignment
        setAlignment(newAlignment);
    }


    const handleClick = () => { //handle togglebutton clicks
        switch(clickCount) {

            case 0:
                getstartlocation();
                setClickCount(1);
                break;

            case 1:
                getendlocation();    
                firebaseData();
                setClickCount(0);
                break;
        }

    }

    const pointbtnaddData = async() => { //for point button data add
        try{
            let docRef = await addDoc(collection(db,"data"), {
                startlati: startlatitude,
                startlongi: startlongitude,
                type: tyypit,
                desc: 'pistehavainto',
                date: currDate,
                time: currTime,
            })
        }catch(e){
            console.log(`error adding data to firestore: ${e} `)
        }
    }




    const firebaseData = async() => { //for togglebutton data add

        try {
            let docRef = await addDoc(collection(db, "data"), {
                
                startlati: startlatitude,
                startlongi: startlongitude,
                endlat: endlatitude,
                endlong: endlongitude,
                date: currDate,
                time: currTime,
                desc: 'Vesakointipuute',

            })

        }catch(e){
            console.log(`error adding data to firestore: ${e} `)
        }

    }

    useEffect(() => {
        getendlocation()
      },[]);

    useEffect(() => {
        getstartlocation()
      },[]);  


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
                   getstartlocation()
                   pointbtnaddData()

                   
                }}>Pistehavainto</Button>

            </div>
            
            
            <div className="continious-btn">

                <ToggleButtonGroup

                    color="success"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="platform"
                    
                >

                    <ToggleButton value="vesakointipuute" onClick={()=> {handleClick()}}> Vesakointipuute </ToggleButton>


                </ToggleButtonGroup>
                
            
            </div>         

        </div>
    );

}

export default Projectobservation;