import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const Brightness = () => {

  const [ value, setValue ] = useState(0); 

  return (
      <>
    <div class="row containButton rangeSlider ">
        <div class="col-2 col-md-4 align-self-stretch"><i class="bi bi-brightness-low"></i></div>
        <div class="col-8 col-md-4 align-self-stretch">
            <RangeSlider className='slider'
                value={value}
                variant='dark'
                onChange={changeEvent => setValue(changeEvent.target.value)}
            />
        </div>
        <div class="col-2 col-md-4 align-self-stretch"><i class="bi bi-brightness-high"></i></div>
        
        
    </div>
    
    
    </>
  );

};

export default Brightness