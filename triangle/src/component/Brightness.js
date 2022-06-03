import React, { useState } from 'react';
import { Form  } from 'react-bootstrap';
import "../css/colorPicker.css";
import axios from "axios";

const Brightness = ({auth,didCancel}) => {
  // This component is used to change the brightness of the leds
  const [valueBrightness, setValueBrightness] = useState(100); 
  console.log(didCancel)
  var timeout;
  const setBrigthness=(brigthness) => {
    // This function call the API to change the brightness of the leds
    setValueBrightness(brigthness);
    
    console.log(didCancel)
       
    
    let data = JSON.stringify({"brightness": brigthness});
    if(didCancel == false ){
      didCancel =true;
      console.log(didCancel)
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
        didCancel = false;
      }).catch(error => {console.log(error);didCancel = false;} )
    } 
    console.log(didCancel)
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