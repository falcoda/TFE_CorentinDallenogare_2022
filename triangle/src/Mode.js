import React, { useState } from 'react';
import "./css/mode.css"
function Mode (){
     

    const changeMode = (mode) =>{
        console.log(mode)
        let data = JSON.stringify({"length":0.1,"speed":1,"mode":mode,"spacing":8,"pediod":2});
        fetch(`/mode`,{
            
            method: "POST",
            mode: "no-cors",
            body: data,
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
                <div className="col-4" onClick={() => changeMode("rainbowWheel")}>
                    <div className='modeItem'>
                        <i class="bi bi-arrow-repeat"></i>
                    </div>
                    <div className='modeName'>
                    Rainbow Wheel
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("colorWipe")}>
                    <div className='modeItem'>
                        <i class="bi bi-rainbow"></i>
                    </div>
                    <div className='modeName'>
                    Color Wipe
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("colorWipeAllSameTime")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    ColorWipeAllSameTime
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("colorWipeOneByOne")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    colorWipeOneByOne
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("coloreWipe2")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    coloreWipe2
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("allChaseWindow")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    allChaseWindow
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("comet")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    comet
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("rainbowChase")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    rainbowChase
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("rainbow")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    rainbow
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("rainbowCommet")}>
                    <div className='modeItem'>
                        <i class="bi bi-upc-scan"></i>
                    </div>
                    <div className='modeName'>
                    rainbowCommet
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Mode;