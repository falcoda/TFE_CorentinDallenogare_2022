import React, { useState } from 'react';
import "./css/mode.css"
import { Form  } from 'react-bootstrap';
import axios from "axios";

function Mode (props){
    const [speed, setSpeed] = useState(0);
    const [size, setSize] = useState(1);
    const [rainbow, setRainbow] = useState(false);
    const [period, setPeriod] = useState(0);
    const [spacing, setSpacing] = useState(0);

    const [mode, setModes] = useState([
        {identifiant:'un', nom : 'Rainbow Wheel',  param:["speed"], logo : "bi-arrow-repeat",mode:"rainbowWheel"},
        {identifiant:'deux', nom : 'Color Wipe',  param:["speed"], logo : "bi-rainbow",mode:"colorWipe"},
        {identifiant:'trois', nom : 'Color Wipe All SameTime',  param:["speed"], logo : "bi-upc-scan",mode:"colorWipeAllSameTime"},
        {identifiant:'quatre', nom : 'Color Wipe One ByOne',  param:["speed"], logo : "bi-upc-scan",mode:"colorWipeOneByOne"},
        {identifiant:'cinq', nom : 'Color Wipe 2',  param:[], logo : "bi-upc-scan",mode:"colorWipe2"},
        {identifiant:'six', nom : 'Chase',  param:["speed","size","spacing"], logo : "bi-upc-scan",mode:"chase"},
        {identifiant:'sept', nom : 'Comet',  param:["speed","size","rainbow"], logo : "bi-stars",mode:"comet"},
        {identifiant:'huit', nom : 'Rainbow',  param:["speed","period"], logo : "bi-stars",mode:"rainbow"},
        {identifiant:'neuf', nom : 'Cote Wipe',  param:["speed","size","spacing"], logo : "bi-stars",mode:"coteWipe"},
        {identifiant:'dix', nom : 'Pulse',  param:["speed"], logo : "bi-stars",mode:"pulse"},
        {identifiant:'onze', nom : 'Color Cycle',  param:["speed"], logo : "bi-stars",mode:"colorCycle"},
        {identifiant:'douze', nom : 'Colid',  param:[], logo : "bi-stars",mode:"solid"},
        {identifiant:'treize', nom : 'Blink',  param:["speed"], logo : "bi-stars",mode:"blink"},


    ]);

    const changeMode = (mode) =>{
        console.log(mode)
        let data = JSON.stringify({"length":size,"speed":speed,"mode":mode,"spacing":spacing,"period":period,"rainbow":rainbow});
        axios({
            method: "POST",
            url:"/api/Mode",
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
    const handleChange=(e) =>{
        let isChecked = e.target.checked;
        setRainbow(isChecked);
        // do whatever you want with isChecked value
      }

    return (       
        
        <div className="voirPhoto container">
            <div >
                <h1 className="settingsTitle" >Modes</h1>                
            </div>
            <div className="row mt-3">
            {mode.map((item, k) => (
                
                <div  key={k } className="col-4"  data-bs-toggle="modal" data-bs-target={"#"+item.identifiant}>
                    <div className='modeItem'>
                         <i className={`bi ${item.logo}`}></i>
                    </div>
                    <div className='modeName'>
                         {item.nom}
                    </div>
                
                <div  className='modalInfo '>
                  <div className="modal modalInfo" id={item.identifiant} tabIndex="-1" aria-labelledby="openCVLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content ">
                        <div className="modal-header">
                            <div className='col-10 modalTitle'>
                                {item.nom}
                            </div>
                            <div className='col-2 d-flex justify-content-end '>
                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body row d-flex justify-content-center">  
                        {item.param.map((params, k) => (
                            <>
                            {params === "speed" && 
                                <div>
                                <div className='paramSelect'>Speed</div>
                                    <Form.Range step={0.01} min={0} max={0.1} value={speed} onChange={(e) =>setSpeed(e.target.value)}/>
                                </div>
                            }
                            {params === "period" && 
                                <div>
                                <div className='paramSelect'>Period</div>
                                    <Form.Range step={1} min={1} max={30} value={period} onChange={(e) =>setPeriod(e.target.value)}/>
                                </div>
                            }
                            {params === "spacing" && 
                            
                                <div>
                                <div className='paramSelect'>Spacing</div>
                                    <Form.Range step={1} min={1} max={30} value={spacing} onChange={(e) =>setSpacing(e.target.value)}/>
                                </div>
                            }
                            {params === "size" && 
                            
                                <div>
                                <div className='paramSelect'>Size</div>
                                    <Form.Range step={1} min={1} max={30} value={size} onChange={(e) =>setSize(e.target.value)}/>
                                </div>
                            }
                            {params === "rainbow" && 
                                <div>
                                    <div className='paramSelect'>Rainbow</div>
                                    {/* <Form.Check value={rainbow}    /> */}
                                    <input className="form-check-input" type="checkbox"  id="flexCheckDefault" onChange={e => handleChange(e)}></input>
                                </div>
                            }
                            


                            </>
                            
                        ))
                        }
                          <div className='col-12 c d-flex justify-content-center'>
                            <button onClick={() => changeMode(item.mode)} className="btnSetParam">Start</button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            ))}
                
                {/* <div className="col-4">
                    <div className='modeItem'>
                        <i className="bi bi-heart-fill"></i>
                    </div>
                    <div className='modeName'>
                        Calme
                    </div>
                </div>
                <div className="col-4">
                    <div className='modeItem'>
                        <i className="bi bi-lightning-charge-fill "></i>
                    </div>
                    <div className='modeName'>
                        Animé
                    </div>
                </div>
                <div className="col-4" onClick={() => changeMode("rainbowWheel")}>
                    <div className='modeItem'>
                        <i className="bi bi-arrow-repeat"></i>
                    </div>
                    <div className='modeName'>
                    Rainbow Wheel
                    </div>
                </div> */}
                
            </div>

        </div>
    )
}
export default Mode;