import './css/settings.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TimerApp from './component/Timer';
import Logout from './component/Logout';
import React, { useState } from 'react';
import useToken from './component/useToken'
import axios from "axios";

function Settings (props){
    const { removeToken } = useToken();
    const [value, setValue] = useState(null);
    const [count, setCount] = useState(null);
    const onChange = time => {
        setValue(time);
        console.log('es')
      };

    const uploadNumber = () => {
        if (count === null) {
            alert('Veuillez entrer un nombre');
        }
        else if (count <= 0) {
            alert('Veuillez entrer un nombre positif');
        }
        else{
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
                const res =response.data
                console.log(res)
            }).catch(error => console.log(error))
            return false;
        }
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
                        <label htmlFor="name" className="form-label" >Nom</label>
                        <input  className="form-control" id="name" placeholder='Marc'/>
                    </div> 
                    <button type="submit" className="btnApp">Valider</button>
                </form>
            </div>
            <div className="settings">
                <TimerApp></TimerApp>            
            </div>
            
        </div>
    )
}
export default Settings;