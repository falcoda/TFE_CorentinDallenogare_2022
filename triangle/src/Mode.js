import React, { useState } from 'react';
import "./css/mode.css"
function Mode (){
     

    const changeMode = (mode) =>{
        fetch(`http://127.0.0.1:5000/${mode}`,{
            
            mode: "no-cors",
            datatype: "json",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            })
        .then(response => response.json())
        .catch(error => console.log(error))

    } 

    return (       
        
        <div className="voirPhoto container">
            <div >
                <h1 className="settingsTitle" >Modes</h1>                
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <div className='modeItem'>
                         <i class="bi bi-boombox"></i>
                    </div>
                    <div className='modeName'>
                         Musique
                    </div>
                </div>
                <div className="col-4">
                    <div className='modeItem'>
                        <i class="bi bi-heart-fill"></i>
                    </div>
                    <div className='modeName'>
                        Calme
                    </div>
                </div>
                <div className="col-4">
                    <div className='modeItem'>
                        <i class="bi bi-lightning-charge-fill "></i>
                    </div>
                    <div className='modeName'>
                        Animé
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("wheel")}>
                    <div className='modeItem'>
                        <i class="bi bi-arrow-repeat"></i>
                    </div>
                    <div className='modeName'>
                        Wheel
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Mode;