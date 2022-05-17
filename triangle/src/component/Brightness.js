import React, { useEffect, useState } from 'react';
import { Form  } from 'react-bootstrap';
import "../css/colorPicker.css";
import axios from "axios";

const Brightness = (auth) => {

  const [ brigthness, setBrigthness ] = useState(100); 
  useEffect(() => {
    let data = JSON.stringify({"brightness": brigthness});
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
    }).catch(error => console.log(error))
  }, [brigthness]);

  return (
    <>
      <div className="row containButton rangeSlider sectionHome">
          <div className="col-2 col-md-4 align-self-stretch" onClick={() =>setBrigthness(0)}>
            <i className="bi bi-brightness-low"></i>
          </div>
          <div className="col-8 col-md-4 align-self-stretch">           
              <Form.Range value={brigthness} onChange={(e) =>setBrigthness(e.target.value)}/>
          </div>
          <div className="col-2 col-md-4 align-self-stretch" onClick={() =>setBrigthness(100)}>
            <i className="bi bi-brightness-high"></i>
          </div>
      </div>
    </>
  );

};

export default Brightness