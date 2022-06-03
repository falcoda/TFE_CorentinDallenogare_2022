import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import axios from "axios";
import toast from 'react-hot-toast';

const TimeApp = (props) => {
  // This component is used to start the timer
  // The timer shut down the leds after a certain time

  const [value, setValue] = useState(null);
  let timeStart = new Date();
  let expiryTimestamp = new Date();
  
  // Initialize the timer
  timeStart.setSeconds(timeStart.getSeconds() );
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({expiryTimestamp, timeStart, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    // Get the current timer value
    axios({
			method: "POST",
			url:"/api/GetTimer",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				Authorization: 'Bearer ' + props.token
			}
		}).then((response) => {
      // If the timer is running, update the timer value
      let res =new Date(response.data.replace(/-/g, "/")); 
      timeStart = new Date();
      timeStart.setSeconds(timeStart.getSeconds() + 1000);
      restart(res);
		}).catch(error => console.log(error));
    
  }, [])
  
  const handleSubmit = (event) => {
    // This function call the API to start the timer
    let data ="";
    if (event === "start"){
      // If the timer is not running, start the timer
      var setDate=new Date();
      let dateSet =(setDate.getMonth()+1 +"/"+setDate.getDate()+"/"+setDate.getFullYear()+" " );  
      var date1=new Date(dateSet + value );   
      console.log(date1);
      timeStart = new Date();
      let date2 = 0 ;
      if (value === null || value === "") {
        toast.error('Veuillez entrer une heure');
      }
      else{
        
        if(date1 < timeStart){
          date2 =(date1.setDate(date1.getDate() + 1));
          localStorage.setItem('date', date1);
        }
        else{
          date2 = (date1.setDate(date1.getDate()));
          localStorage.setItem('date', date2);
        }
        
        toast.success("Minuteur mis à " + value ) ;
        restart(date2);
        data = JSON.stringify({"date":date2});
      }
    }
    else if (event === "stop"){
      // If the timer is running, stop the timer
      if(hours === 0 || minutes === 0 || seconds === 0){
        // If the timer is already expired, display an error message
        toast.error('Pas de minuteur en cours');
        data = JSON.stringify({"date":"undefined"  });
        
      }
      else{
        // If the timer is running, stop the timer
        restart();
        toast.success("Minuteur stoppé" )
        data = JSON.stringify({"date":"undefined"  });
        localStorage.removeItem('date');
      }
      
    }
    
    // Call the API to start or stop the timer
    axios({
			method: "POST",
			url:"/api/Timer",
			data: data,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				Authorization: 'Bearer ' + props.token
			}
		}).then((response) => {
		  const res =response.data;
		}).catch(error => console.log(error));

  }


  return (
    <div style={{textAlign: 'center'}} className={"ms-1 me-1"}>
      <label htmlFor="setTime" className="form-label" >Minuteur</label>
      <input type={"time"} className="form-control" id="setTime" placeholder='15' onChange={(e) => setValue(e.target.value)}/>
      <button onClick={()=>handleSubmit("start")} className="btnApp">Démarrer</button>
      <button onClick={()=>handleSubmit("stop")} className="btnApp ms-1 me-1">Arreter</button>
      <div>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default TimeApp;