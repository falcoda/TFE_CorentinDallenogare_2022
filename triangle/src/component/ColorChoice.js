import React, { useState,useEffect} from 'react';
import axios from "axios";
import IroColorPicker from "./IroColorPicker";
import toast from 'react-hot-toast';
import "../css/colorPicker.css";

const ColorChoice = (props) => {

	// This component is used to change the color of the leds
	// The component is composed of 6 buttons, each one representing a color
	// It is possible to change the color of the button by clicking on the pencil icon

	const [ onEdit, setOnEdit ] = useState([false,"#FFFFFF"]); 
	const [ btnOnEdit, setBtnOnEdit] = useState("");
	const [ modal, setModal] = useState(["",""]);
	const [newColor, setNewColor] = useState("");
	const [btns, setBtns ]= useState([{ nom : 'btn1',  couleur:'#FFFF00'},
									{ nom : 'btn2',  couleur:'#FF0000'},
									{ nom : 'btn3',  couleur:'#00FF00'},
									{ nom : 'btn4',  couleur:'#0000FF'},
									{ nom : 'btn5',  couleur:'#FFB6C1'},
									{ nom : 'btn6',  couleur:'#FFFFFF'},]);

	let didCancel = false;

	function setColor(color,nom) {
		// This function is use to change the color of the button or the leds
		if(onEdit[0]){
			// If the user is editing a button
			if (nom !== ""){
				setBtnOnEdit(nom);
			}
			else{
				// if user don't click on a the color picker => set the color to the default color
				if(color ===''){
					color = "#FFFFFF";
				}
				let temp_state = [...btns];
				let savedColors ="";
				for(let i = 0; i < temp_state.length; i++){
					if(temp_state[i].nom === btnOnEdit){
						temp_state[i].couleur = color;
					}
					savedColors += temp_state[i].couleur + ",";
				
				}
				setBtns(temp_state);
				document.getElementById("closeNameBtn").click();
				toast.success("Couleur modifiée avec succès");
				localStorage.setItem("savedColors",savedColors);
			}
		}
  	}
	
	function displayColor(color) {
		// If the user is not editing the 
		let data = JSON.stringify(color);
		if(didCancel == false ){
			didCancel =true;
			axios({
				method: "POST",
				url:"/api/ChangeColor",
				data: data,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					Authorization: 'Bearer ' + props.token
				}
			}).then((response) => {
			const res =response.data;
			didCancel = false;
			
			}).catch(error => {console.log(error);didCancel = false;});
		}
	}

	// function to display the icons for edit the colors
	const displayEdit = () => {
		let button =  document.querySelectorAll('.activeEdit');
		// class to add or remove to the button
		let classList= [ "align-items-center", "justify-content-center","d-flex"];
		if (button.length > 0) {
			setOnEdit([true,"#FFFFFF"])
			button.forEach(btn => {
				setModal(["modal","#changeButton"])
				btn.classList.remove('activeEdit');
				btn.classList.add(...classList);
			})
		}
		else{
			setOnEdit([false,"#FFFFFF"])
			let button2 =  document.getElementsByClassName('bi-check-circle-fill');
			for(let i = 0; i < button2.length; i++) {
				setModal(["",""])
				button2[i].classList.add('activeEdit');
				button2[i].classList.remove(...classList);
			}
		
		}
		
	}

	//   Use for get the color in the local storage
	useEffect(() => {
		if(localStorage.getItem("savedColors")){
			let colors = localStorage.getItem("savedColors").split(",");
			let temp_state = [...btns];
			for(let i = 0; i < temp_state.length; i++){
				temp_state[i].couleur = colors[i];
			}
			setBtns(temp_state);
		}
	}, []);

	return (
		
		<div className='d-flex justify-content-center row btnColorDiv'>	
			<div className='colorChoice row col-11'>
				<div className='col-8 d-flex align-items-center'>Choisissez une couleur :	 </div>
			
				<div className='col-4 d-flex justify-content-end align-items-center'>
					<button onClick={displayEdit} className="buttonEditColor ">éditer <i className="bi bi-pencil-fill"></i></button>
				</div>
			</div>
			<div className="row containButton sectionHome col-11">
			{btns.map((item, k) => (
				<div key={k} className="col-2 col-md-4" onClick={() =>{setBtnOnEdit(item.nom);}}>
					<button disabled={onEdit[0]} data-bs-toggle={modal[0]} data-bs-target={modal[1]} className='button' onClick={() =>{displayColor(item.couleur);toast.success("Couleur modifiée");}} style={{backgroundColor:item.couleur }}>
						<i className="bi bi-check-circle-fill activeEdit"></i>
					</button>
				</div>
			))}

			</div>
			<div className='modalInfo '>
                <div className="modal modalInfo" id={"changeButton"} tabIndex="-1" aria-labelledby="modeName" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <div className='col-10 modalTitle'>
								Choisissez une couleur :
                                </div>
                                <div className='col-2 d-flex justify-content-end '>
                                    <button type="button" className="btn-close " id="closeNameBtn" data-bs-dismiss="modal" aria-label="Close" onClick={displayEdit}></button>
                                </div>
                            </div>
                            <div className="modal-body row d-flex justify-content-center">  
								<IroColorPicker couleur={onEdit[1]} taille={200} onColorChange={ (color) => { setNewColor(color.hexString) ; displayColor(color.hexString)}}/>
                                <div className='col-12 c d-flex justify-content-center'>
                                    <button className="btnSetParamMode" onClick={() =>setColor(newColor,"")}>Sauvegarder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);

};

export default ColorChoice