
import "./css/colorPicker.css";
import React, { useEffect } from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/Brightness";
import axios from "axios";

const Color = (auth) => {
  

  const displayColor =(color) => {
    let data = JSON.stringify(color);
 
    axios({
      method: "POST",
      url:"/api/ChangeColor",
      data: data,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + auth.token
      }
    }).then((response) => {
      const res =response.data
      console.log(res)
    }).catch(error => console.log(error))
  }

  return (
    
      <div>  
        <IroColorPicker
          
          onColorChange={ (color) => { displayColor(color.hexString) }}
        />
        
        <ColorChoice token={auth.token}></ColorChoice>
        <Brightness token={auth.token} ></Brightness>
      </div>
    
  )
}

export default Color

