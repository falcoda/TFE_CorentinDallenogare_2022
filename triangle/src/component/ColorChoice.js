import React, { useState } from 'react';
import axios from "axios";
import "../css/colorPicker.css";

const ColorChoice = (auth) => {

	const [ btn1, setBtn1 ] = useState('#FFFF00'); 
	const [ btn2, setBtn2 ] = useState('#FF0000'); 
	const [ btn3, setBtn3 ] = useState('#00FF00'); 
	const [ btn4, setBtn4 ] = useState('#0000FF'); 
	const [ btn5, setBtn5 ] = useState('#FFB6C1'); 
	const [ btn6, setBtn6 ] = useState('#FFFFFF'); 
	
	function setColor(color) {
        
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
		
		<>		
			<div className="row containButton colorButtons sectionHome">
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn1)} style={{backgroundColor:btn1}}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn2)} style={{backgroundColor:btn2 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn3)} style={{backgroundColor:btn3 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn4)} style={{backgroundColor:btn4 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn5)} style={{backgroundColor:btn5 }}> </button></div>
				<div className="col-2 col-md-4"><button className='button' onClick={() =>setColor(btn6)} style={{backgroundColor:btn6 }}> </button></div>
			</div>
		</>
	);

};

export default ColorChoice