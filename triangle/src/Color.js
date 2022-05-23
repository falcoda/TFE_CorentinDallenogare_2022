
import "./css/colorPicker.css";
import React, { useEffect } from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/Brightness";
import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const Color = ({auth,stepIndex,run, steps,setStepIndex,setRun}) => {
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

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    console.log(action)
    if (index === 4 ) {
      // setStepIndex(index - (action === ACTIONS.PREV ? -1 : 1));
      console.log(index,"est égal")
  }
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      console.log(index)
      
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      console.log("finitooo")

      // localStorage.setItem('tutorial', true);
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  return (
    
      <div className="homePage">  
      
        <IroColorPicker
          onColorChange={ (color) => { displayColor(color.hexString) }}
        />
        
        <ColorChoice token={auth.token}></ColorChoice>
        <Brightness token={auth.token} ></Brightness>
      </div>
    
  )
}

export default Color

