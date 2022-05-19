import React, { useState,useEffect } from 'react';
import "./css/mode.css"
import { Form  } from 'react-bootstrap';
import axios from "axios";

function Mode (props){

    const [speed, setSpeed] = useState(0.01);
    const [size, setSize] = useState(1);
    const [rainbow, setRainbow] = useState(false);
    const [period, setPeriod] = useState(1);
    const [spacing, setSpacing] = useState(1);
    const [newModeName, setNewModeName] = useState("");
    const [newMode , setNewMode] = useState("");
    const [modeList, setModeList] = useState([]);

    useEffect(() => {
        console.log(JSON.parse(window.localStorage.getItem("speed")))
        let saveSpeed = JSON.parse(window.localStorage.getItem("speed"))
        let saveSize = JSON.parse(window.localStorage.getItem("size"))
        let saveRainbow = JSON.parse(window.localStorage.getItem("rainbow"))
        let savePeriod = JSON.parse(window.localStorage.getItem("period"))
        let saveSpacing = JSON.parse(window.localStorage.getItem("spacing"))

        if(saveSpeed !== null){
            setSpeed(saveSpeed);
        }
        if(saveSize !== null){
            setSize(saveSize);
        }
        if(saveRainbow !== null){
            setRainbow(saveRainbow);
        }
        if(savePeriod !== null){
                setPeriod(savePeriod);
        }
        if(saveSpacing !== null){
            setSpacing(saveSpacing);
        }
        try{
            let myModes = window.localStorage.getItem("mode")
            console.log(myModes)
            var myArray = myModes.split("/");
            console.log(myArray)
            for (var i = 0; i < myArray.length; i++) {
                myArray[i] = myArray[i].split(",")
            }
            myArray.pop()
            console.log(myArray )
        
            setModeList(myArray)
        }
        catch(error){
            console.log(error)
        }
      }, []);
    

    useEffect(() => {
        window.localStorage.setItem("speed", speed);
    }, [speed]);
    useEffect(() => {
        window.localStorage.setItem("size", size);
    }, [size]);
    useEffect(() => {
        window.localStorage.setItem("rainbow", rainbow);
    }, [rainbow]);
    useEffect(() => {
        window.localStorage.setItem("period", period);
    }, [period]);
    useEffect(() => {
        window.localStorage.setItem("spacing", spacing);
    }, [spacing]);


    const [mode, setModes] = useState([
        {identifiant:'un', nom : 'Rainbow Wheel',  param:["speed"], logo : "bi-bullseye",mode:"rainbowWheel"},
        {identifiant:'deux', nom : 'Color Wipe',  param:["speed","spacing"], logo : "bi-rainbow",mode:"colorWipe"},
        {identifiant:'trois', nom : 'Comet All SameTime',  param:["speed","size"], logo : "bi-star",mode:"cometAllSameTime"},
        {identifiant:'quatre', nom : 'Color Wipe One ByOne',  param:["speed","size","spacing","rainbow","period"], logo : "bi-qr-code-scan",mode:"colorWipeOneByOne"},
        {identifiant:'cinq', nom : 'Color Wipe 2',  param:["speed"], logo : "bi-upc-scan",mode:"colorWipe2"},
        {identifiant:'six', nom : 'Chase',  param:["speed","size","spacing","rainbow","period"], logo : "bi-shuffle",mode:"chase"},
        {identifiant:'sept', nom : 'Comet',  param:["speed","size","rainbow"], logo : "bi-stars",mode:"comet"},
        {identifiant:'huit', nom : 'Rainbow',  param:["speed","period"], logo : "bi-rainbow",mode:"rainbow"},
        {identifiant:'dix', nom : 'Pulse',  param:["speed"], logo : "bi-heart-pulse",mode:"pulse"},
        {identifiant:'onze', nom : 'Color Cycle',  param:["speed"], logo : "bi-arrow-repeat",mode:"colorCycle"},
        {identifiant:'douze', nom : 'Solid',  param:[], logo : "bi-bricks",mode:"solid"},
        {identifiant:'treize', nom : 'Blink',  param:["speed"], logo : "bi-sun",mode:"blink"},


    ]);

    const runMyMode= (size,speed,mode,spacing,period,rainbow) =>{
        if (rainbow === 'true'){
            rainbow = true
        }
        rainbow = false
        let data = JSON.stringify({"length":Number(size),"speed":Number(speed),"mode":mode,"spacing":Number(spacing),"period":Number(period),"rainbow":rainbow});
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
    const saveMode = () =>{

        if(newModeName !== "" && (/^[A-Za-z1-9\s]+$/.test(newModeName))){
            
            // let data = JSON.stringify({"length":size,"speed":speed,"mode":newMode,"spacing":spacing,"period":period,"rainbow":rainbow,"name":newModeName});
            
            let data =`${size},${speed},${newMode},${spacing},${period},${rainbow},${newModeName}/`;
            console.log(data)
            let oldMode = localStorage.getItem("mode");
            console.log(oldMode)
            if (oldMode === null){
                localStorage.setItem("mode", data);
                console.log('est null')
            }
            else{
                let newMode =oldMode+ data;
                console.log(newMode)
                localStorage.setItem("mode", newMode);
                // document.getElementById("closeNameBtn").click()
            }
    
        }
        else{
            console.log("no name")
            document.getElementsByClassName("nameModeInput")[0].setAttribute('placeholder', 'Please enter a name');
            document.getElementsByClassName("nameModeInput")[0].style.borderColor = "red";
            document.getElementsByClassName("nameModeInput")[0].classList.add('invalidName');
        }
        //
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
                <div  key={k } className="col-4 effetDiv"  data-bs-toggle="modal" data-bs-target={"#"+item.identifiant}>
                    <div className='modeItem '>
                         <i className={`bi ${item.logo} logoBootstrap`}></i>
                    </div>
                    <div className='modeName'>
                         {item.nom}
                    </div>
                    <div  className='modalInfo '>
                        <div className="modal modalInfo" id={item.identifiant} tabIndex="-1" aria-labelledby="choseModeLabel" aria-hidden="true">
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
                                    {item.param.map((params, l) => (
                                        <div key={l+99 }>
                                        {params === "speed" && 
                                            <div>
                                            <div className='paramSelect'>Speed</div>
                                                <Form.Range step={0.01} min={0.01} max={1} value={speed} onChange={(e) =>setSpeed(e.target.value)}/>
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
                                                <input className="form-check-input" type="checkbox" checked={rainbow}  id="flexCheckDefault" onChange={e => handleChange(e)}></input>
                                            </div>
                                        }
                                        


                                        </div>
                                        
                                    ))
                                    }
                                    <div className='col-12 c d-flex justify-content-center'>
                                        <button onClick={() => changeMode(item.mode)} className="btnSetParamMode">Start</button>                               
                                    </div>
                                    <div className='col-12 c d-flex justify-content-center'>
                                        <button data-bs-toggle="modal" data-bs-target={"#modeName"} className="btnSetParamMode" onClick={() => setNewMode(item.nom)}>Save</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='modalInfo '>
                <div className="modal modalInfo" id={"modeName"} tabIndex="-1" aria-labelledby="modeName" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <div className='col-10 modalTitle'>
                                    Save {newMode} Mode
                                </div>
                                <div className='col-2 d-flex justify-content-end '>
                                    <button type="button" className="btn-close " id="closeNameBtn" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                            <div className="modal-body row d-flex justify-content-center">  
                                <div className="mb-3 ms-1 me-1">
                                    <label htmlFor="setModeName" className="form-label" >Mode name</label>
                                    <input  className="form-control nameModeInput" id="setModeName" placeholder='Mode Name' onChange={(e) =>setNewModeName(e.target.value)} />
                                </div> 
                                <div className='col-12 c d-flex justify-content-center'>
                                    <button  onClick={() => saveMode()} className="btnSetParamMode">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator Div */}
            <div className="col-12 separator"> Saveds Modes</div>
            {modeList.map((item, k) => (
                <div className='col-4 myOwnEffects' onClick={() => runMyMode(item[0],item[1],item[2],item[3],item[4],item[5],item[6])} key={k}>
                {item[6]}aaaa
                </div>
            ))}
        </div>
    </div>
    )
}
export default Mode;