import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';

export default function Pomodoro({taskid}) {
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
    <div className="inner-timer" style={{fontSize: '13px'}}>{ timer}</div>
  )
}




