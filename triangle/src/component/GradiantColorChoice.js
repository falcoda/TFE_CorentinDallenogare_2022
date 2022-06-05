import React, { useState,useEffect} from 'react';
import IroColorPicker from "./IroColorPicker";
import toast from 'react-hot-toast';
import "../css/colorPicker.css";

const GradiantColorChoice = ({setColors}) => {

	// This component is used to change the color of the fradiant mode
	// The component is composed of 2 buttons, each one representing a color
	const [ btnOnEdit, setBtnOnEdit] = useState("btn1");
	const [newColor, setNewColor] = useState("");
	const [btns, setBtns ]= useState([{ nom : 'btn1',  couleur:'#FFFF00'},
									{ nom : 'btn2',  couleur:'#FF0000'},]);
	
	function setColor(color) {
		// This function is use to change the color of the button or the leds
			
			// if user don't click on a the color picker => set the color to the default color
			if(color !=''){
				let temp_state = [...btns];
				let savedColors ="";
				let colorsList = [];
				for(let i = 0; i < temp_state.length; i++){
					if(temp_state[i].nom === btnOnEdit){
						temp_state[i].couleur = color;
						
					}
					savedColors += temp_state[i].couleur + ",";

				
				}
				setBtns(temp_state);
				
				colorsList= savedColors.split(",");
				colorsList.splice(-1, 1);
				setColors(colorsList);
				localStorage.setItem("colors",savedColors);
			
			}
			
		

  	}

	
	//   Use for save the color in the local storage
	useEffect(() => {
		if(localStorage.getItem("colors")){
			let colors = localStorage.getItem("colors").split(",");
            colors.splice(-1,1);
			let temp_state = [...btns];
			for(let i = 0; i < temp_state.length; i++){
				temp_state[i].couleur = colors[i];
			}
			setBtns(temp_state);
		}
	}, []);
	
	function setNameToChange(btn){
		let button =  document.querySelectorAll('.gradiantBtnHide');
		// class to add or remove to the button
		button.forEach(btn => {
			btn.classList.add("gradiantChoice");
		})
		
		console.log(document.getElementsByClassName("gradiantBtnHide"))
		document.getElementsByClassName("gradiantChoice"+btn)[0].classList.remove("gradiantChoice")
		setBtnOnEdit(btn);
	}
	useEffect(() => {
		console.log(newColor)
		setColor(newColor)
	}, [newColor]);
	return (
		
		<div className='d-flex justify-content-center row btngradiantDiv'>
			<IroColorPicker  taille={200} onColorChange={ (color) => { setNewColor(color.hexString) }}/>
			<div className="row containButton sectionHome col-11 d-flex justify-content-center">
			{btns.map((item, k) => (
				<div key={k} className="col-2 col-md-4">
					<button  className={`buttonGradiant${item.nom}`} onClick={() =>setNameToChange(item.nom)} style={{backgroundColor:item.couleur }}>
						<i className={`bi bi-check-circle-fill gradiantChoice gradiantBtnHide gradiantChoice${item.nom}`}></i>
					</button>
				</div>
			))}

			</div>
			
		</div>
	);

};

export default GradiantColorChoice