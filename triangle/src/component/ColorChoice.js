import React, { useState } from 'react';

import "../css/colorPicker.css";

const ColorChoice = () => {

	const [ btn1, setBtn1 ] = useState('yellow'); 
	const [ btn2, setBtn2 ] = useState('red'); 
	const [ btn3, setBtn3 ] = useState('green'); 
	const [ btn4, setBtn4 ] = useState('blue'); 
	const [ btn5, setBtn5 ] = useState('pink'); 
	const [ btn6, setBtn6 ] = useState('white'); 
	
	function SetColor(e) {
        
        console.log(`The color is ${e}`);  
  	}

	return (
		
		<>		
			<div className="row containButton colorButtons">
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn1)} style={{backgroundColor:btn1}}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn2)} style={{backgroundColor:btn2 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn3)} style={{backgroundColor:btn3 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn4)} style={{backgroundColor:btn4 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn5)} style={{backgroundColor:btn5 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>SetColor(btn6)} style={{backgroundColor:btn6 }}> </button></div>
			</div>
		</>
	);

};

export default ColorChoice