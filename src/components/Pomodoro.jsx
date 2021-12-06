import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';

export default function Pomodoro(props) {
  const [minutes, setMinutes] = useState(23)
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
          // position: "relative", 
          // top: "0px", 
          // backgroundColor: state.work_mode ? "red" : "green",
          position: "relative",
          maxHeight: '50px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
          boxSizing: 'borderBox'
        }} 
        className="pomodoro">
          {/* <h3 style={{margin: '0px', paddingLeft: '10px', color: '#fff'}}>
            {state.work_mode ? "Work Mode" : "Rest Mode"} 
          </h3>  */}
        <Collapse 
          onChange={callback}
          style={{ 
            // position: 'relative',
            // top: toggle? '28px' : '0px',
            minWidth: "80%",
            width: '300px',
            color: '#fff',
            // border: '1px solid #323439',
            borderRadius: '8px',
            position: 'relative'
          }}
        > 
          <Panel className="timer" header={state.work_mode ? "Work Mode:  " + timer : "Rest Mode:  " + timer} key="1" style={{background: !state.work_mode ?  '#323439' : "red", color: '#fff', borderTopRightRadius: '8px', borderBottomRightRadius: '8px'}}>
            <div className="timer" 
              style={{boxSizing: 'borderBox', fontSize: '20px', fontWeight: '700', lineHeight: '1', position: 'relative', background: '#323439'}} 
              >
              {/* {timer} */}
              <div style={{display: 'flex', justifyContent: "space-between", alignItems: 'center', height: '100%'}}>
                {
                  state.selectedTask ? <p style={{fontSize: '13px', margin: '0px'}}>{state.selectedTask}:</p> : null
                }
                {timer}
              </div>
            </div>
          </Panel>
        </Collapse> 
      </div>

        // <Collapse bordered={true} defaultActiveKey={['1']} style={{position: 'relative', width: '300px', top: '-25px', left: '120px', border: '1px solid #323439', background: !state.work_mode ?  '#323439' : "red", color: '#fff'}}>
        //   <Panel header={state.work_mode ? "Work Mode:  " + timer : "Rest Mode:  " + timer} key="1" style={{position: 'absolute', border: '1px solid #323439', width: '300px', background: !state.work_mode ?  '#323439' : "red", color: '#fff'}}>
        //     {state.selectedTask ? <p style={{fontSize: '13px', margin: '10px'}}>{state.selectedTask}:{timer}</p> : <p>Rest Mode</p>}
        //   </Panel>
        // </Collapse>

      : <div>{timer}</div>
    } 
    </>
  )
}




