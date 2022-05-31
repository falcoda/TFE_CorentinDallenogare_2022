import './css/settings.css'
import TimerApp from './component/Timer';
import Logout from './component/Logout';
import React, { useEffect, useState } from 'react';
import useToken from './component/useToken';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Settings (props){
    // This component is used to change the settings of the user

    const { removeToken } = useToken();
    const [count, setCount] = useState(null);
    const history = useNavigate()   

    const uploadNumber = () => {
        // This function is used to upload the number of the triangles
        if (count === null || count === "") {
            toast.error('Veuillez entrer un nombre');
        }
        else if (count <= 0) {
            toast.error('Veuillez entrer un nombre positif');
        }
        else{
            // If the number is valid, upload it to the API
            let data = JSON.stringify({"number": count});
            axios({
                method: "POST",
                url:"/api/ChangeNumber",
                data: data,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + props.token
                }
            }).then((response) => {
                const res =response.data;
                console.log(res);
                toast.success('Nombre mis à jour');
            }).catch(error => toast.error('Erreur lors de la mise à jour'))
            return false;
        }
    }

    useEffect(() => {
        // Redirect to home page if the tutorial is not finished
        if(!localStorage.getItem('tutorial')){
            history('/');
        }
    }, [])

    const startTuto = () => {
        // Restart the tutorial if the user clicks on the button
        localStorage.removeItem('tutorial');
        document.getElementsByClassName("active")[0].classList.remove("active");
        document.getElementsByClassName("tourColor")[0].classList.add("active");
        history('/')
    }


    return (
        
        <div className="parametre">
            <div >
                <h1 className="settingsTitle" >Paramètres</h1>
            </div>
            <Logout token={removeToken}/>
            <div className="settings">                
                <form>
                    <div className="mb-3 ms-1 me-1">
                        <label htmlFor="numberTriangles" className="form-label" >Nombre de triangles</label>
                        <input type='number'  className="form-control" id="numberTriangles" onChange={(e) =>setCount(e.target.value)} placeholder='0'/>
                    </div> 
                    <button type="button" onClick={uploadNumber} className="btnApp">Valider</button>
                </form>
            </div>
            <div className="settings">
                <form>
                    <div className="mb-3 ms-1 me-1">
                        Tutoriel
                    </div> 
                    <button  className="btnApp" onClick={startTuto}>Redémarrer le tutoriel</button>
                </form>
            </div>
            <div className="settings">
                <TimerApp token={props.token}></TimerApp>            
            </div>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
        </div>
    )
}
export default Settings;