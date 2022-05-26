import React, { useState,useEffect,useRef } from 'react';
import "./css/mode.css"
import { Form  } from 'react-bootstrap';
import axios from "axios";
import toast from 'react-hot-toast';

function Mode ({token,stepIndex,setStepIndex}){
    console.log(token)
    const [speed, setSpeed] = useState(0.01);
    const [size, setSize] = useState(1);
    const [rainbow, setRainbow] = useState(false);
    const [period, setPeriod] = useState(1);
    const [spacing, setSpacing] = useState(1);
    const [onAll, setOnAll] = useState(false);
    const [newModeName, setNewModeName] = useState("");
    const [newMode , setNewMode] = useState("");
    const [modeList, setModeList] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [mode, setModes] = useState([
        {identifiant:'un', nom : 'Rainbow Wheel',  param:["speed","onAll"], logo : "bi-bullseye",mode:"rainbowWheel"},
        {identifiant:'deux', nom : 'Chase',  param:["speed","size","spacing","rainbow","period"], logo : "bi-shuffle",mode:"chase"},
        {identifiant:'trois', nom : 'Comet All SameTime',  param:["speed","size"], logo : "bi-star",mode:"cometAllSameTime"},
        {identifiant:'quatre', nom : 'randomEffects',  param:["speed","size","spacing","rainbow","period"], logo : "bi-qr-code-scan",mode:"randomEffects"},
        {identifiant:'cinq', nom : 'Color Wipe 2',  param:["speed"], logo : "bi-upc-scan",mode:"colorWipe2"},
        {identifiant:'six', nom : 'Color Wipe',  param:["speed","spacing"], logo : "bi-rainbow",mode:"colorWipe"},
        {identifiant:'sept', nom : 'Comet',  param:["speed","size","rainbow","onAll"], logo : "bi-stars",mode:"comet"},
        {identifiant:'huit', nom : 'Rainbow',  param:["speed","period","onAll"], logo : "bi-rainbow",mode:"rainbow"},
        {identifiant:'dix', nom : 'Pulse',  param:["speed"], logo : "bi-heart-pulse",mode:"pulse"},
        {identifiant:'onze', nom : 'Color Cycle',  param:["speed","onAll"], logo : "bi-arrow-repeat",mode:"colorCycle"},
        {identifiant:'douze', nom : 'Solid',  param:[], logo : "bi-bricks",mode:"solid"},
        {identifiant:'treize', nom : 'Blink',  param:["speed"], logo : "bi-sun",mode:"blink"},
        {identifiant:'quatorze', nom : 'Sparkle',  param:["speed","rainbow","period","onAll"], logo : "bi-sun",mode:"sparkle"},
        {identifiant:'quinze', nom : 'Sparkle Pulse',  param:["speed","period"], logo : "bi-sun",mode:"sparklePulse"},


    ]);
    
    
    useEffect(() => {
        let saveSpeed = JSON.parse(window.localStorage.getItem("speed"));
        let saveSize = JSON.parse(window.localStorage.getItem("size"));
        let saveRainbow = JSON.parse(window.localStorage.getItem("rainbow"));
        let savePeriod = JSON.parse(window.localStorage.getItem("period"));
        let saveSpacing = JSON.parse(window.localStorage.getItem("spacing"));
        let saveOnAll = JSON.parse(window.localStorage.getItem("onall"));


        if(saveSpeed !== null){
            setSpeed(saveSpeed);
            console.log('aaaa')
            console.log(saveSpeed)
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
        if(saveOnAll !== null){
            setOnAll(saveOnAll);
        }
        // set the tutorial mode
        if(!localStorage.getItem("tutorial")){
            saveMode(['Tutorial','chase'])
        }
        logoSavedModes();
        setStepIndex(stepIndex + 1);
      }, []);

    
    function logoSavedModes(){
        try{
            let myModes = window.localStorage.getItem("mode")
            if(myModes !== null){
                var myArray = myModes.split("/");
                if (myModes !=="/"){
                    myArray.pop();
                    var res = [];
                    console.log(myArray)
                    for(var i = 0; i < myArray.length; i++){
                        res.push(myArray[i].split(","));
                    }

                    console.log(res);
                    console.log(myArray );
                    setModeList(res);
                }
            }
            else{
                setModeList([]);
            }
            
        }
        catch(error){
            console.log(error);
        }
        
    }

    const runMyMode= (size,speed,mode,spacing,onAll,period,rainbow) =>{
        if (rainbow === 'true'){
            rainbow = true;
        }
        rainbow = false
        let data = JSON.stringify({"length":Number(size),"speed":Number(speed),"mode":mode,"spacing":Number(spacing),"period":Number(period),"rainbow":rainbow,"onAll":onAll});
        axios({
            method: "POST",
            url:"/api/Mode",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            const res =response.data
            console.log(res)
        }).catch(error => console.log(error))
        return false;
    }

    const changeMode = (mode) =>{
        // Setting the properties of the mode
        window.localStorage.setItem("speed", speed);
        window.localStorage.setItem("size", size);
        window.localStorage.setItem("rainbow", rainbow);
        window.localStorage.setItem("period", period);
        window.localStorage.setItem("spacing", spacing);
        window.localStorage.setItem("onall", onAll);
        console.log(mode)
        let data = JSON.stringify({"length":size,"speed":speed,"mode":mode,"spacing":spacing,"period":period,"rainbow":rainbow,"onAll":onAll});
        axios({
            method: "POST",
            url:"/api/Mode",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            const res =response.data
            console.log(res)
        }).catch(error => console.log(error))
        return false;

    } 
    const saveMode = (demoMode) =>{

        if((newModeName !== ""  && (/^[A-Za-z1-9-'\s]+$/.test(newModeName)))||demoMode !== undefined){
            let data ="";
            // let data = JSON.stringify({"length":size,"speed":speed,"mode":newMode,"spacing":spacing,"period":period,"rainbow":rainbow,"name":newModeName});
            console.log(demoMode)
            if(demoMode !== undefined &&demoMode[0] === 'Tutorial'  ){
                console.log("tuto")
                data =`${size},${speed},${demoMode[1]},${spacing},${onAll},${period},${demoMode[1]},${demoMode[0]}/`;
            }
            else{
                data =`${size},${speed},${newMode[1]},${spacing},${onAll},${period},${rainbow},${newModeName}/`;
            }
            
            console.log(data)
            let oldMode = localStorage.getItem("mode");
            if (oldMode === null){
                localStorage.setItem("mode", data);
                document.getElementById("closeNameBtn").click();
                document.getElementsByClassName("nameModeInput")[0].style.borderColor = "black";
                logoSavedModes();
            }
            else{
                var myArray = oldMode.split("/");
                let isIn = false;
                for (var i = 0; i < myArray.length; i++) {
                    if(data.slice(-9,-1) =="Tutorial"){
                        return false;
                    }
                    if( myArray[i].includes(data.slice(0, -2))){
                        isIn = true;
                    }
                }
                if (isIn ){
                    toast.error("Ce mode existe déjà");
                    document.getElementsByClassName("nameModeInput")[0].style.borderColor = "red";
                }
                else if(!isIn ){
                    toast.success('Mode bien enregistré')
                    let newModes =oldMode+ data;
                    localStorage.setItem("mode", newModes);
                    document.getElementById("closeNameBtn").click();
                    document.getElementsByClassName("nameModeInput")[0].style.borderColor = "black";
                    logoSavedModes();
                }
            }
    
        }
        else{
            toast.error("Nom invalide");
            document.getElementsByClassName("nameModeInput")[0].setAttribute('placeholder', 'Nom invalide');
            document.getElementsByClassName("nameModeInput")[0].style.borderColor = "red";
            document.getElementsByClassName("nameModeInput")[0].classList.add('invalidName');
        }
    } 

    const removeMode = (mode) =>{
        mode =(mode.join(",").toString())
        console.log(mode)
        var myArray = localStorage.getItem("mode").split("/");
        console.log(myArray)
        myArray.pop()
        let index = myArray.indexOf(mode);
        myArray.splice(index, 1);
        console.log(myArray)
        console.log(myArray.join("/")+"/")
        if(myArray.length !== 0){
            localStorage.setItem("mode", myArray.join("/")+"/");
        }
        else{
            localStorage.removeItem("mode");
        }
        logoSavedModes();

    }

    const changeVisibilityDelete =() =>{
        if (visibility) {
            setVisibility(false)
        }
        else{   
            setVisibility(true)
        }
    }
    const handleChange=(e) =>{
        let isChecked = e.target.checked;
        setRainbow(isChecked);
    }

    const changeOnAll=(e) =>{
        let isChecked = e.target.checked;
        setOnAll(isChecked);
    }

    return (       
        
        <div className="voirPhoto">
            <div >
                <h1 className="settingsTitle" id="modePageId" >Modes</h1>                
            </div>
            <div className="row mt-3">
            {mode.map((item, k) => (
                <div  key={k } className={`col-4 effetDiv ${"mode"+k}`} id={"modalNum"+k} data-bs-toggle="modal" data-bs-target={"#"+item.identifiant}>
                    <div className='modeItem '>
                         <i className={`bi ${item.logo} logoBootstrap`}></i>
                    </div>
                    <div className={`modeName`}>
                         {item.nom}
                    </div>
                    <div  className='modalInfo '>
                        <div className={`modal modalInfo `} id={item.identifiant} tabIndex="-1" aria-labelledby="choseModeLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <div className='col-10 modalTitle'>
                                            {item.nom}
                                        </div>
                                        <div className='col-2 d-flex justify-content-end '>
                                            <button type="button" className="btn-close " id={item.identifiant +"BtnClose"} data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <div className="modal-body row d-flex justify-content-center">  
                                    {item.param.map((params, l) => (
                                        <div key={l+99 }>
                                        {params === "speed" && 
                                            <div className={`${"tourSpeed"+item.identifiant}`}>
                                            <div className={`paramSelect`}>Speed</div>
                                                <Form.Range step={0.01} min={0.01} max={1} value={speed} onChange={(e) =>setSpeed(e.target.value)}/>
                                            </div>
                                        }
                                        
                                        
                                        {params === "spacing" && 
                                        
                                            <div className={`${"tourSpacing"+item.identifiant}`}>
                                            <div className='paramSelect'>Spacing</div>
                                                <Form.Range step={1} min={1} max={30} value={spacing} onChange={(e) =>setSpacing(e.target.value)}/>
                                            </div>
                                        }
                                        {params === "size" && 
                                        
                                            <div className={`${"tourSize"+item.identifiant}`}>
                                            <div className='paramSelect'>Size</div>
                                                <Form.Range step={1} min={1} max={30} value={size} onChange={(e) =>setSize(e.target.value)}/>
                                            </div>
                                        }
                                        {params === "rainbow" && 
                                            <div className={`${"tourRainbow"+item.identifiant}`}>
                                                <div className='paramSelect'>Rainbow</div>
                                                <input className="form-check-input" type="checkbox" checked={rainbow}  id="flexCheckDefault" onChange={e => handleChange(e)}></input>
                                            </div>
                                        }
                                        {params === "period" && 
                                            <div className={`${"tourPeriod"+item.identifiant}`}>
                                            <div className='paramSelect'>Period</div>
                                                <Form.Range step={1} min={1} max={30} value={period} onChange={(e) =>setPeriod(e.target.value)}/>
                                            </div>
                                        }
                                        {params === "onAll" && 
                                            <div className={`${"tourSepare"+item.identifiant}`}>
                                                <div className='paramSelect'>Séparés</div>
                                                <input className="form-check-input" type="checkbox" checked={onAll}  id="flexCheckDefault" onChange={e => changeOnAll(e)}></input>
                                            </div>
                                        }
                                        


                                        </div>
                                        
                                    ))
                                    }
                                    <div className={`col-12 c d-flex justify-content-center ${"tourStart"+item.identifiant}`}>
                                        <button onClick={() => changeMode(item.mode)} id="btnStart" className="btnSetParamMode">Démarrer</button>                               
                                    </div>
                                    <div className={`col-12 c d-flex justify-content-center ${"tourSave"+item.identifiant}`}>
                                        <button data-bs-toggle="modal" data-bs-target={"#modeName"} className="btnSetParamMode" onClick={() => setNewMode([item.nom,item.mode])}>Sauvegarder</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* Div for the save mode modal */}
            <div className='modalInfo '>
                <div className="modal modalInfo" id={"modeName"} tabIndex="-1" aria-labelledby="modeName" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <div className='col-10 modalTitle'>
                                    Sauvegarder le mode : {newMode[0]} 
                                </div>
                                <div className='col-2 d-flex justify-content-end '>
                                    <button type="button" className="btn-close " id="closeNameBtn" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                            <div className="modal-body row d-flex justify-content-center">  
                                <div className="mb-3 ms-1 me-1">
                                    <label htmlFor="setModeName" className="form-label" >Nom du mode</label>
                                    <input  className="form-control nameModeInput" id="setModeName" placeholder='Nom' onChange={(e) =>setNewModeName(e.target.value)} />
                                </div> 
                                <div className='col-12 c d-flex justify-content-center'>
                                    <button  onClick={() => saveMode()} className="btnSetParamMode">Sauvegarder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Div with saved modes */}
            { modeList.length > 0 &&
            <>
            <div className="col-12 separator">Modes Sauvegardés</div>
            
                {modeList.map((item, k) => (
                    <div className={`col-4 myOwnEffects ${"myOwnEffects" +item[7]}`}  key={k}>
                        <div className='col-12 deleteModeDivLogo' >
                            {visibility &&
                                <i className="bi bi-trash deleteMode" onClick={() =>removeMode(item)}></i>
                            }
                        </div>
                        <div className='col-12 row' onClick={() => runMyMode(item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7])}>
                            <div className='col-12'>
                                
                                <i className={`bi ${mode.find(o => o.mode === item[2])["logo"]} logoSavedModes`}></i>
                            </div>
                            <div className='col-12 savedModeText'>
                            {item[7]}
                            </div>
                        </div>
                        
                    </div>
                ))}
            
            <div className="col-12 ">
                {visibility &&
                    <button className="col-12 btnModifiy d-flex justify-content-center" onClick={changeVisibilityDelete}> Sauvegarder</button>
                }
                {!visibility &&
                    <button className="col-12 btnModifiy d-flex justify-content-center" onClick={changeVisibilityDelete}> Supprimer</button>
                }
            </div>
            </>
        }
        </div>
        
        
    </div>
    )
}
export default Mode;