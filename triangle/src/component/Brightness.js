import React, { useState,useEffect } from 'react';
import { Form  } from 'react-bootstrap';
import "../css/colorPicker.css";
import axios from "axios";

const Brightness = (auth) => {
  // This component is used to change the brightness of the leds
  const [valueBrightness, setValueBrightness] = useState(100); 
  
  useEffect(() => {
    // Get the brightness of the leds
    // The brightness is saved in the local storage
    let saveBrightness = JSON.parse(window.localStorage.getItem("brightness"));

    // Set the parameters if they are not null
    if(saveBrightness !== null){
      setValueBrightness(saveBrightness);
    }
    
  }, []);
  const setBrigthness=(brigthness) => {
    // This function call the API to change the brightness of the leds
    setValueBrightness(brigthness);
    localStorage.setItem("brightness", brigthness);     
    let data = JSON.stringify({"brightness": brigthness});
    if(auth.cancel == false ){
      auth.setCancel(true);
      axios({
        method: "POST",
        url:"/api/ChangeBrightness",
        data: data,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + auth.token
        }
      }).then((response) => {
        
        const res =response.data
        console.log(res)
        auth.setCancel(false);
      }).catch(error => {console.log(error); auth.setCancel(false);} )
    } 
  }

  return (
    <>
      <div className="row containButton rangeSlider choseBrightness d-flex justify-content-center">
          <div className="col-2 col-md-4 align-self-stretch" onClick={() =>setBrigthness(0)}>
            <i className="bi bi-brightness-low logoBootstrap"></i>
          </div>
          <div className="col-8 col-md-4 align-self-stretch">           
              <Form.Range  value={valueBrightness} onChange={(e) =>setBrigthness(e.target.value)}/>
          </div>
          <div className="col-2 col-md-4 align-self-stretch" onClick={() =>setBrigthness(100)}>
            <i className="bi bi-brightness-high logoBootstrap"></i>
          </div>
      </div>
    </>
  );

};

export default Brightness