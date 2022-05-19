import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import moment from 'moment';

function MyTimer({ expiryTimestamp }) {
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
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  let timeStart = new Date();
  timeStart.setSeconds(timeStart.getSeconds() + 600);

  const [value, setValue] = useState(null);
   const handleSubmit = (event) => {
    var setDate=new Date();
    let dateSet =(setDate.getMonth()+1 +"-"+setDate.getDate()+"-"+setDate.getFullYear()+" " );    
    var date1=new Date(dateSet + value + ":00");   
    timeStart = new Date();
    timeStart.setSeconds(timeStart.getSeconds() + 1000);    
    restart(date1);
  }


  return (
    <div style={{textAlign: 'center'}} className={"ms-1 me-1"}>
         
      
          <label htmlFor="setTime" className="form-label" >Minuteur</label>
          <input type={"time"} className="form-control" id="setTime" placeholder='15'onChange={(e) => setValue(e.target.value)}/>
          
          
          <button onClick={handleSubmit} className="btnApp">Start</button>
          <button onClick={()=>pause()} className="btnApp ms-1 me-1">Pause</button>
          <button onClick={resume} className="btnApp">Resume</button>
        <div>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      
    </div>
  );
}

export default function TimeApp() {
  
  let timeStart = new Date();
  timeStart.setSeconds(timeStart.getSeconds());

  return (
    <div>
        
          <MyTimer expiryTimestamp={timeStart} />
        

    </div>
  );
}