
import React  from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/Brightness";
import axios from "axios";
import "./css/colorPicker.css";

const Color = (props) => {
  // This component is used to display the home page
  // The page is composed of a color picker, a color choice and a brightness slider

  let didCancel = false
  const displayColor =(color) => {
    // This function is use to call the api to change the color of the leds
    let data = JSON.stringify(color);
    if(didCancel == false ){
    didCancel =true;
    // authorization is needed to send the request
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

