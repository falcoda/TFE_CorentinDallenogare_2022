import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import "../css/navbar.css";
const Navbar = () => {

  
  function handleClick(e) {
        e.preventDefault();    
        console.log('The link was clicked.');  
        fetch("http://127.0.0.1:5000/",{
        'methods':'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors'
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error));
  }
  const changeMode = (mode) =>{
    fetch(`/${mode}`,{
        
        mode: "no-cors",
        datatype: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        })
    .then(response => response.json())
    .catch(error => console.log(error))

} 
  return (
    
    <>
    <div className='fixed-bottom' style={{'backgroundColor': 'whitesmoke'}}>	
			<nav className="navbar navbar-expand navbar-light">        
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto  mt-0 row navContent">
            <li className="nav-item col-3">
              <Link className="nav-link" to="/"><i className="bi bi-house navItem"></i></Link>
            </li>
            <li className="nav-item active  col-3">
              <Link className="nav-link" to="/mode"><i className="bi bi-lightbulb navItem"></i></Link>
            </li>
            <li className="nav-item col-3">
              <a className="nav-link" onClick={() => changeMode("off")}><i className="bi bi-power navItem"></i></a>
            </li>
            <li className="nav-item col-3">
              <Link className="nav-link" to="/settings"><i className="bi bi-sliders navItem"></i></Link>
            </li>
            
           
          </ul>
          
        </div>
      </nav>
      </div>
    </>
  );

};

export default Navbar


