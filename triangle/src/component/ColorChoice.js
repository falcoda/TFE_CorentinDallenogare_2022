import React, { useState } from 'react';

import "../css/colorPicker.css";
const ColorChoice = () => {

  const [ value, setValue ] = useState(0); 

  return (
    
    <>		
			<div class="row containButton">
				<div class="col-2 col-md-4"><button className='button' id='button1'> </button></div>
				<div class="col-2 col-md-4"><button className='button' id='button2'> </button></div>
				<div class="col-2 col-md-4"><button className='button' id='button3'> </button></div>
				<div class="col-2 col-md-4"><button className='button' id='button4'> </button></div>
				<div class="col-2 col-md-4"><button className='button' id='button5'> </button></div>
				<div class="col-2 col-md-4"><button className='button' id='button6'> </button></div>
			</div>
    </>
  );

};

export default ColorChoice