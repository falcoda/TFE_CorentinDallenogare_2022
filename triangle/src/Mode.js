import React, { useState,useEffect } from 'react';
import "./css/mode.css"
import { Form } from 'react-bootstrap';
import axios from "axios";
import toast from 'react-hot-toast';
import GradiantColorChoice from './component/GradiantColorChoice';

function Mode ({token,stepIndex,setStepIndex}){
    // This component is used to change the mode of the leds 
    // the mode takes the following values :
    // Speed : the animation speed of the leds
    // Period : the period of the color change
    // Size : the number of leds on
    // Spacing : the space between the leds (number of led off)
    // Rainbow : if the leds are rainbow or not
    // OnAll : if the triangle is on all or not
    const [colors, setColors]=useState(["#FFFF00","#FF0000"]);
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

    // The list of modes
    const [mode, setModes] = useState([
        {identifiant:'un', nom : 'Roue Arc-En-Ciel',  param:["speed","onAll"], logo : "bi-bullseye",mode:"rainbowWheel"},
        {identifiant:'deux', nom : 'Course',  param:["speed","size","spacing","rainbow","period"], logo : "bi-shuffle",mode:"chase"},
        {identifiant:'trois', nom : 'Saut de Triangle',  param:["speed","rainbow","onAll"], logo : "bi-star",mode:"cometAllSameTime"},
        {identifiant:'quatre', nom : 'Effets Aléatoire',  param:["speed","size","spacing","rainbow","period"], logo : "bi-qr-code-scan",mode:"randomEffects"},
        {identifiant:'cinq', nom : 'Saut de Coté',  param:["speed","rainbow"], logo : "bi-upc-scan",mode:"coteWipe"},
        {identifiant:'six', nom : 'Saut de Couleur',  param:["speed","spacing"], logo : "bi-rainbow",mode:"colorWipe"},
        {identifiant:'sept', nom : 'Comète',  param:["speed","size","rainbow","onAll"], logo : "bi-stars",mode:"comet"},
        {identifiant:'huit', nom : 'Arc-En-Ciel',  param:["speed","period","onAll"], logo : "bi-rainbow",mode:"rainbow"},
        {identifiant:'dix', nom : 'Pulsation',  param:["speed"], logo : "bi-heart-pulse",mode:"pulse"},
        {identifiant:'onze', nom : 'Cycle de Couleur',  param:["speed","onAll"], logo : "bi-arrow-repeat",mode:"colorCycle"},
        {identifiant:'douze', nom : 'Unis',  param:[], logo : "bi-bricks",mode:"solid"},
        {identifiant:'treize', nom : 'Clignotement',  param:["speed"], logo : "bi-sun",mode:"blink"},
        {identifiant:'quatorze', nom : 'Étincelle',  param:["speed","rainbow","period","onAll"], logo : "bi-sun",mode:"sparkle"},
        {identifiant:'quinze', nom : 'Étincelle Pulsante',  param:["speed","period"], logo : "bi-sun",mode:"sparklePulse"},
        {identifiant:'seize', nom : 'Dégradé',  param:["speed","colors"], logo : "bi-palette-fill",mode:"gradiant"},
        {identifiant:'dixSept', nom : 'Course de Comète',  param:["speed","size"], logo : "bi-receipt-cutoff",mode:"CometsChase"},

    ]);


    
    useEffect(() => {
        // Get all parameters of the mode
        // The parameters are saved in the local storage
        // The parameters are used to change the mode
        let saveSpeed = JSON.parse(window.localStorage.getItem("speed"));
        let saveSize = JSON.parse(window.localStorage.getItem("size"));
        let saveRainbow = JSON.parse(window.localStorage.getItem("rainbow"));
        let savePeriod = JSON.parse(window.localStorage.getItem("period"));
        let saveSpacing = JSON.parse(window.localStorage.getItem("spacing"));
        let saveOnAll = JSON.parse(window.localStorage.getItem("onall"));
        let saveColors = window.localStorage.getItem("colors");

        // If the parameters are null => set the parameters to default
        if (saveSpeed === null){
            localStorage.setItem("speed",JSON.stringify(speed));
        }
        if (saveSize === null){
            localStorage.setItem("size",JSON.stringify(size));
        }
        if (saveRainbow === null){
            localStorage.setItem("rainbow",JSON.stringify(rainbow));
        }
        if (savePeriod === null){
            localStorage.setItem("period",JSON.stringify(period));
        }
        if (saveSpacing === null){
            localStorage.setItem("spacing",JSON.stringify(spacing));
        }
        if (saveOnAll === null){
            localStorage.setItem("onall",JSON.stringify(onAll));
        }
        if (saveColors === null){
            localStorage.setItem("colors",'#ffff00,#FF0000,');
        }
        // Set the parameters if they are not null
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
        if(saveOnAll !== null){
            setOnAll(saveOnAll);
        }
        if(saveColors !== null){
            saveColors=  saveColors.split(",");
            saveColors.splice(-1,1);
            setColors(saveColors);
        }
        // set the tutorial mode
        if(!localStorage.getItem("tutorial")){
            saveMode(['Tutorial','chase']);
        }
        logoSavedModes();
        setStepIndex(stepIndex + 1);
      }, []);

    
    function logoSavedModes(){
        // Get the list of saved modes
        // The list is saved in the local storage
        try{
            let myModes = window.localStorage.getItem("mode")
            console.log(myModes);
            if(myModes !== null){
                var myArray = myModes.split("/");
                if (myModes !=="/"){
                    myArray.pop();
                    var res = [];
                    for(var i = 0; i < myArray.length; i++){
                        res.push(myArray[i].split(","));
                        console.log(res[i][6]);
                        let newColor1 = res[i][6].substring(1,7);
                        let newColor2 = res[i][7].substring(0,6);
                        res[i][6]= newColor1;
                        res[i][7]= newColor2;
                    }
                    setModeList(res);
                }
            }
            else{
                // If the list is empty
                setModeList([]);
            }
            
        }
        catch(error){
            //If error
            console.log(error);
        }
        
    }

    const runMyMode= (size,speed,mode,spacing,onAll,period,rainbow,colorList) =>{
        // This function is used to run the saved mode
        // The function call the api to run the saved mode
        // The function send a json with the parameters of the mode
        if (rainbow === 'true'){
            rainbow = true;
        }
        rainbow = false;
        let data = JSON.stringify({"length":Number(size),"speed":Number(speed),"mode":mode,"spacing":Number(spacing),"period":Number(period),"rainbow":rainbow,"onAll":onAll,"colors":colorList});
        
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
            const res =response.data;
            console.log(res);
        }).catch(error =>{ console.log(error)});
        
        return false;
    }

    const changeMode = (mode) =>{
        // This function is used to run the mode
        // The function call the api to run the mode
        // The function send a json with the parameters of the mode

        // Setting the properties of the mode
        window.localStorage.setItem("speed", speed);
        window.localStorage.setItem("size", size);
        window.localStorage.setItem("rainbow", rainbow);
        window.localStorage.setItem("period", period);
        window.localStorage.setItem("spacing", spacing);
        window.localStorage.setItem("onall", onAll);
        console.log(colors);
       
        let data = JSON.stringify({"length":size,"speed":speed,"mode":mode,"spacing":spacing,"period":period,"rainbow":rainbow,"onAll":onAll,'colors':colors});
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
        // This function is used to save the mode
        // Thhe mode is saved in the local storage

        if((newModeName !== ""  && (/^[A-Za-z1-9-'\s]+$/.test(newModeName)))||demoMode !== undefined){
            let data ="";
            let colorsList ="[" +colors.toString() + "]";
            console.log(colorsList);
            if(demoMode !== undefined &&demoMode[0] === 'Tutorial'  ){
                // if the mode is a tutorial mode
                data =`${size},${speed},${demoMode[1]},${spacing},${onAll},${period},${"[#FFFFFF,#FFFFFF]"},${demoMode[1]},${demoMode[0]}/`;
            }
            else{
                data =`${size},${speed},${newMode[1]},${spacing},${onAll},${period},${colorsList},${rainbow},${newModeName}/`;
            }
            
            let oldMode = localStorage.getItem("mode");
            if (oldMode === null){
                // If the list is empty
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
                    // If the mode is already saved
                    toast.error("Ce mode existe déjà");
                    document.getElementsByClassName("nameModeInput")[0].style.borderColor = "red";
                }
                else if(!isIn ){
                    // If the mode is not already saved
                    toast.success('Mode bien enregistré');
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
        // This function is used to remove the mode
        // The mode is removed from the local storage
        mode =(mode.join(",").toString());
        var myArray = localStorage.getItem("mode").split("/");
        myArray.pop()
        let index = myArray.indexOf(mode);
        myArray.splice(index, 1);
        if(myArray.length !== 0){
            localStorage.setItem("mode", myArray.join("/")+"/");
        }
        else{
            localStorage.removeItem("mode");
        }
        logoSavedModes();

    }

    const changeVisibilityDelete =() =>{
        // This function is used to change the visibility of the delete button
        if (visibility) {
            setVisibility(false)
        }
        else{   
            setVisibility(true)
        }
    }

    const handleChange=(e) =>{
        // This function is used to change the value of the rainbow input
        let isChecked = e.target.checked;
        setRainbow(isChecked);
    }

    const changeOnAll=(e) =>{
        // This function is used to change the value of the onAll input
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
                        <div className={`modal modalInfo`} id={item.identifiant} tabIndex="-1" aria-labelledby="choseModeLabel" aria-hidden="true">
                            <div className="modal-dialog" >
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
                                    {/* All the modes */}
                                        {item.param.map((params, l) => (
                                            <div key={l+99 }>
                                            {params === "speed" && 
                                                <div className={`${"tourSpeed"+item.identifiant}`}>
                                                <div className={`paramSelect`}>Vitesse</div>
                                                    <Form.Range step={0.01} min={0.01} max={1} value={speed} onChange={(e) =>setSpeed(e.target.value)}/>
                                                </div>
                                            }
                                            
                                            {params === "spacing" && 
                                            
                                                <div className={`${"tourSpacing"+item.identifiant}`}>
                                                <div className='paramSelect'>Espacement</div>
                                                    <Form.Range step={1} min={1} max={30} value={spacing} onChange={(e) =>setSpacing(e.target.value)}/>
                                                </div>
                                            }
                                            {params === "size" && 
                                            
                                                <div className={`${"tourSize"+item.identifiant}`}>
                                                <div className='paramSelect'>Taille</div>
                                                    <Form.Range step={1} min={1} max={30} value={size} onChange={(e) =>setSize(e.target.value)}/>
                                                </div>
                                            }
                                            {params === "rainbow" && 
                                                <div className={`${"tourRainbow"+item.identifiant}`}>
                                                    <div className='paramSelect'>Arc-En-Ciel</div>
                                                    <input className="form-check-input" type="checkbox" checked={rainbow}  id="flexCheckDefault" onChange={e => handleChange(e)}></input>
                                                </div>
                                            }
                                            {params === "period" && 
                                                <div className={`${"tourPeriod"+item.identifiant}`}>
                                                <div className='paramSelect'>Période</div>
                                                    <Form.Range step={1} min={1} max={30} value={period} onChange={(e) =>setPeriod(e.target.value)}/>
                                                </div>
                                            }
                                            {params === "onAll" && 
                                                <div className={`${"tourSepare"+item.identifiant}`}>
                                                    <div className='paramSelect'>Séparés</div>
                                                    <input className="form-check-input" type="checkbox" checked={onAll}  id="flexCheckDefault" onChange={e => changeOnAll(e)}></input>
                                                </div>
                                            }
                                            {params === "colors" && 
                                                <div className={`${"tourSepare"+item.identifiant}`}>
                                                    <GradiantColorChoice setColors={setColors}/>
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
                        <div className={`col-4 myOwnEffects ${"myOwnEffects" +item[9]}`}  key={k}>
                            <div className='col-12 deleteModeDivLogo' >
                                {visibility &&
                                    <i className="bi bi-trash deleteMode" onClick={() =>removeMode(item)}></i>
                                }
                            </div>
                            <div className='col-12 row' onClick={() => runMyMode(item[0],item[1],item[2],item[3],item[4],item[5],item[8],[item[6],item[7]])}>
                                <div className='col-12'>
                                    
                                    <i className={`bi ${mode.find(o => o.mode === item[2])["logo"]} logoSavedModes`}></i>
                                </div>
                                <div className='col-12 savedModeText'>
                                {item[9]}
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