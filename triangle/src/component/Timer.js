import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const TimeApp = (props) => {
  const [value, setValue] = useState(null);
  let timeStart = new Date();
  
 
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
  } = useTimer({ timeStart, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {

    axios({
			method: "POST",
			url:"/api/GetTimer",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				Authorization: 'Bearer ' + props.token
			}
		}).then((response) => {
      const res =response.data


      console.log(res)
      
      timeStart = new Date();
      timeStart.setSeconds(timeStart.getSeconds() + 1000);
      restart(Number(res));
		}).catch(error => console.log(error));
    
  }, [])
  
  const handleSubmit = (event) => {
    console.log(event)
    let data ="";
    if (event === "start"){
      var setDate=new Date();
      console.log(setDate.getDate())
      let dateSet =(setDate.getMonth()+1 +"-"+setDate.getDate()+"-"+setDate.getFullYear()+" " );    
      var date1=new Date(dateSet + value + ":00");   
      timeStart = new Date();
      if (value === null || value === "") {
        toast.error('Veuillez entrer une heure');
      }
      else{
        if(date1.getTime() < timeStart.getTime()){
          date1 =(date1.setDate(date1.getDate() + 1))
          localStorage.setItem('date', date1)
          console.log("add 1 day",date1)
        }
        else{
          console.log("no add")
          date1 = date1.getTime()
          localStorage.setItem('date', date1)
        }
        
        toast.success("Minuteur mis à " + value ) 
        timeStart.setSeconds(timeStart.getSeconds() + 1000);
        console.log(date1)
        restart(date1);
        data = JSON.stringify({"date":date1  });
        console.log( data, "yes")
      }
    }
    else if (event === "stop"){
      console.log(hours)
      if(hours === 0 || minutes === 0 || seconds === 0){
        toast.error('Pas de minuteur en cours');
        
      }
      else{
        restart();
        toast.success("Minuteur stoppé" )
        data = JSON.stringify({"date":"undefined"  });
        console.log( data, "yes");
        localStorage.removeItem('date');
      }
      
    }
    
    
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
		const res =response.data
		// console.log(res)
		}).catch(error => console.log(error));

  }


  return (
    <div style={{textAlign: 'center'}} className={"ms-1 me-1"}>
         
      
          <label htmlFor="setTime" className="form-label" >Minuteur</label>
          <input type={"time"} className="form-control" id="setTime" placeholder='15' onChange={(e) => setValue(e.target.value)}/>
          
          
          <button onClick={()=>handleSubmit("start")} className="btnApp">Start</button>
          <button onClick={()=>handleSubmit("stop")} className="btnApp ms-1 me-1">Stop</button>
        <div>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      
    </div>
  );
}

export default TimeApp;