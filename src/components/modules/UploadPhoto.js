import { CameraIcon } from "../../Icons/Customicons";
export default function UploadPhoto({}) {



return(
    <div className="Photo-box-outline" style={{cursor: 'pointer'}}>
        <div className="Photo-box-inner">
            <div className="container-inner">
                <div className="eclipse">
                    <CameraIcon/>

                </div>

                <h3>Ota kuvia kameralla <br/> tai lisää kuvia puhelimesta</h3>
            </div>
        </div>

    </div>
);
}
