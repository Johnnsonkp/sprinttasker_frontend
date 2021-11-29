import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(24)
  const [seconds, setSeconds] = useState(59)
  const [displayMessage, setdisplayMessage] = useState(false)
  const {state} = useAppState()
  const [stopTimer, setStopTimer] = useState(true)
  const { Panel } = Collapse;

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if(state.work_mode){
        setStopTimer(false)
        console.log("state.work_mode stopTimer", stopTimer)

        if(seconds === 0 && stopTimer === false){
          if(minutes !== 0){
            setSeconds(59);
            setMinutes(minutes - 1);
          } else{
            // Break time
            let minutes = displayMessage ? 24 : 4
            let seconds = 59;
  
            setSeconds(seconds);
            setMinutes(minutes);
            setdisplayMessage(!displayMessage);
          }
        } else{
          setSeconds(seconds - 1)
        }
      } 
      if(!state.work_mode && !stopTimer){
        setSeconds(seconds);
        setMinutes(minutes);
        setdisplayMessage(false);
        setStopTimer(true)
        
        console.log("!state.work_mode stopTimer", stopTimer)
      }
      
    }, 1000);
  }, [seconds, state.work_mode]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const timer = `${timerMinutes} : ${timerSeconds}`
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid red', width: '70%', marginLeft: '110px'}} className="pomodoro">
      <h3 style={{margin: '0px', paddingLeft: '10px',color: state.work_mode ? "red" : "green"}}>{state.work_mode ? "Workmode" : "RestMode"} </h3> 
      <Collapse 
        onChange={callback}
        style={{width: "60%"}}
      > 
        <Panel header={timer} key="1">
          <div className="timer" 
            style={{color: "#111", marginRight: '5px', boxSizing: 'borderBox', fontSize: '42px', fontWeight: '700', lineHeight: '1', position: 'relative'}} 
            >
            {timer}
          </div>
          <Collapse 
            defaultActiveKey="1">
            <Panel header="This is panel nest panel" key="1">
            <div className="message">
              {displayMessage && <div>Break time! New session starts in:</div>}
            </div>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse> 

      {/* <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
        <div className="timer">
          {timerMinutes}:{timerSeconds}
        </div> */}
    </div>
    
  )
}

{/* <Collapse onChange={callback}>
  <Panel header="This is panel header 1" key="1">
    <Collapse defaultActiveKey="1">
      <Panel header="This is panel nest panel" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
  </Panel>
</Collapse> */}