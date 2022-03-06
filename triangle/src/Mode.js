import React, { useState } from 'react';
import "./css/mode.css"
function Mode (){
     

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
            </div>

        </div>
    )
}
export default Mode;