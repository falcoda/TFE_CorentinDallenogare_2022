
import "./css/colorPicker.css";
import React from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/Brightness";
import axios from "axios";

const Color = (props) => {
  
  

  const displayColor =(color) => {
    let data = JSON.stringify(color);
    
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
      console.log(res)
    }).catch(error => console.log(error))
  }

  
  return (
    
      <div className="homePage">  
      
        <IroColorPicker taille={300} couleur={"#FFFFFF"} onColorChange={ (color) => { displayColor(color.hexString) }}/>
        
        <ColorChoice token={props.token}></ColorChoice>
        <Brightness token={props.token} ></Brightness>
      </div>
    
  )
}

export default Color

