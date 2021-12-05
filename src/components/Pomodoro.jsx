import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';

export default function Pomodoro(props) {
  const [minutes, setMinutes] = useState(24)
  const [seconds, setSeconds] = useState(59)
  const [displayMessage, setdisplayMessage] = useState(false)
  const [toggle, setToggle] = useState(false)
  const {state} = useAppState()
  const [stopTimer, setStopTimer] = useState(true)
  const { Panel } = Collapse;

  function callback(key) {
    console.log(key);
    setToggle(!toggle)
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

  useEffect(() => {
    console.log("toggle", toggle)
  }, [callback])

  console.log(toggle)

  return (
    <>
    { !props.timer ?
      <div 
        style={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          border: '1px solid #323439', 
          border: 'none',
          width: '300px',
          marginLeft: '110px', 
          position: "relative", 
          top: "0px", 
          backgroundColor: state.work_mode ? "red" : "green",
          maxHeight: '50px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px'
        }} 
        className="pomodoro">
          <h3 style={{margin: '0px', paddingLeft: '10px', color: '#fff'}}>
            {state.work_mode ? "Work Mode" : "Rest Mode"} 
          </h3> 
        <Collapse 
          onChange={callback}
          style={{ 
            position: 'relative',
            top: toggle? '28px' : '0px',
            minWidth: "60%",
            color: '#fff',
            border: '1px solid #323439',
            borderRadius: '8px'
          }}
        > 
          <Panel className="timer" header={timer} key="1" style={{background: '#323439', color: '#fff', borderTopRightRadius: '8px', borderBottomRightRadius: '8px'}}>
            <div className="timer" 
              style={{color: "#fff", marginRight: '5px', boxSizing: 'borderBox', fontSize: '20px', fontWeight: '700', lineHeight: '1', position: 'relative', background: '#323439', border: '1px solid #323439', borderRadius: '8px', border: 'none'}} 
              >
              {timer}
              <div>
                {
                  state.selectedTask ? <p style={{fontSize: '10px'}}>{state.selectedTask}</p> : null
                }
              </div>
            </div>
          </Panel>
        </Collapse> 
      </div>
      : <div>{timer}</div>
    } 
    </>
  )
}




