import './css/settings.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TimerApp from './component/Timer';

import React, { useState } from 'react';

function Settings (){
    const [value, setValue] = useState(null);
    const onChange = time => {
        setValue(time);
        console.log('es')
      };

    return (
        
        <div className="parametre">
            <div >
                <h1 className="settingsTitle" >Paramètres</h1>
                
            </div>
            <div className="settings">                
                <form>
                    <div className="mb-3 ms-1 me-1">
                        <label for="ipAdress" className="form-label" >Adresse IP</label>
                        <input  className="form-control" id="ipAdress" placeholder='192.168.1.x'/>
                    </div> 
                    <button type="submit" className="btn btn-primary">Valider</button>
                </form>
            </div>
            <div className="settings">
                <form>
                    <div className="mb-3 ms-1 me-1">
                        <label for="name" className="form-label" >Nom</label>
                        <input  className="form-control" id="name" placeholder='Marc'/>
                    </div> 
                    <button type="submit" className="btn btn-primary">Valider</button>
                </form>
            </div>
            <div className="settings">
                <TimerApp></TimerApp>            
            </div>
            
        </div>
    )
}
export default Settings;