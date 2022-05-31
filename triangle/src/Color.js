
import "./css/colorPicker.css";
import React ,{useState}  from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/Brightness";
import axios from "axios";

const Color = (props) => {
  let didCancel = false

  const displayColor =(color) => {
    let data = JSON.stringify(color);
    if(didCancel == false ){
    didCancel =true;
    axios({
      method: "POST",
      url:"/api/ChangeColor",
      data: data,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + props.token
      }
    }).then((response) => {
      const res =response.data
      didCancel = false;
    }).catch(error => console.log(error))
  }
  }

  
  return (
    
      <div className="homePage">  
      
        <IroColorPicker taille={window.innerHeight/3} couleur={"#FFFFFF"} onColorChange={ (color) => { displayColor(color.hexString) }}/>
        
        <ColorChoice token={props.token}></ColorChoice>
        <Brightness token={props.token} ></Brightness>
      </div>
    
  )
}

export default Color

