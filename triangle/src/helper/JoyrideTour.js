import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from "react-router-dom";
const JoyrideTour = ({steps,stepIndex,run, setRun,setStepIndex}) => {
    const history = useNavigate()
    const handleJoyrideCallback = data => {
        console.log(stepIndex)
        const { action, index, status, type } = data;
       
      if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
          
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
      
          console.log(action, index,ACTIONS.PREV)
          if (index ===4 && action !== 'next' ){
              history("/");
          }
          if (index ===5  && action === 'prev'){
              history("/");
          }
          console.log(window.location.pathname,action,index)
          if (window.location.pathname ==="/mode" && action === "next" && index===3){
            history("/");
          }
          if (index === 5  && action === 'next') {
              document.getElementById("modalNum1").click()
              console.log("nexxssss")
          }
          if (index === 6 && action === 'prev') {
              document.getElementById("deuxBtnClose").click()
              console.log("yes")
          }
          if (index === 12 && action === 'next') {
              document.getElementById("deuxBtnClose").click()
              let toScroll= document.getElementsByClassName("separator")[0].offsetTop
              window.scrollTo(toScroll, toScroll)
              console.log("saved")
          }
          if (index === 11 && action === 'prev') {
            let toScroll= document.getElementById("btnStart").offsetTop
            window.scrollTo(toScroll, toScroll)
              
          }
          if (index === 13 && action === 'prev') {
              document.getElementById("modalNum1").click()
              let toScroll= document.getElementById("modePageId").offsetTop
              window.scrollTo(toScroll, toScroll)
              console.log("yes")
          }
      }
      else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRun(false);
        localStorage.setItem('tutorial', true);
      }
      
      // console.groupCollapsed(type);
      // console.log(data); //eslint-disable-line no-console
      // console.groupEnd();
    };

    return (
        <>
        { !localStorage.getItem('tutorial') &&
      <Joyride
          continuous={true}
          steps={steps}
          stepIndex={stepIndex}
          showProgress={true}
          disableScrolling={true}
          showSkipButton={true} 
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: 'red',
              zIndex: 1000,
            }
          }}
          />
          }
        </>)

}

export default JoyrideTour