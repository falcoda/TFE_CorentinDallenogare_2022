import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import "../css/colorPicker.css";

const Brightness = () => {

  const [ value, setValue ] = useState(0); 

  return (
      <>
    <div className="row containButton rangeSlider ">
        <div className="col-2 col-md-4 align-self-stretch"><i className="bi bi-brightness-low"></i></div>
        <div className="col-8 col-md-4 align-self-stretch">
            <RangeSlider className='slider'
                value={value}
                variant='dark'
                onChange={changeEvent => setValue(changeEvent.target.value)}
            />
        </div>
        <div className="col-2 col-md-4 align-self-stretch"><i className="bi bi-brightness-high"></i></div>
        
        
    </div>
    
    
    </>
  );

};

export default Brightness