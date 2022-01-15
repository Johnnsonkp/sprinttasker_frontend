import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';
import { useLocation } from "react-router-dom";

export default function Pomodoro(props) {
  const {state, dispatch} = useAppState()
  // let timerSeconds = state.selectedTask ? state.selectedTask.timer.charAt(5) +  state.selectedTask.timer.charAt(6) : null
  console.log("state.selectedTask.timer", state.selectedTask.timer)
  // let timerSeconds = state.selectedTask ? state.selectedTask.timer.charAt(4) : null
  let timerSeconds = state.selectedTask ? (state.selectedTask.timer.charAt(3) !== '0' ? state.selectedTask.timer.charAt(3) + state.selectedTask.timer.charAt(4) : state.selectedTask.timer.charAt(4)) : (null)
  let parseSeconds = state.selectedTask ? parseInt(timerSeconds) : null
  let timerMinutes = state.selectedTask ? state.selectedTask.timer.charAt(0) + state.selectedTask.timer.charAt(1) : null
  let parseMinutes = state.selectedTask ? parseInt(timerMinutes) : null

  console.log("parseMinutes", parseMinutes)
  console.log("parseSeconds", parseSeconds)

  const [minutes, setMinutes] = useState(23)
  const [seconds, setSeconds] = useState(59)
  const [countUpMinutes, setCountUpMinutes] = useState(parseMinutes)
  const [countUpSeconds, setCountUpSeconds] = useState(parseSeconds)
  const [displayMessage, setdisplayMessage] = useState(false)
  const [stopTimer, setStopTimer] = useState(true)

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if(state.work_mode){
        setStopTimer(false)
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
      }
    }, 1000);

    let timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let timer = `${timerMinutes} : ${timerSeconds}`
     
    console.log("Timer", timer)
    dispatch({ type: "timer", payload: timer}) 
  }, [seconds])

  useEffect(() => {
    let interval = setInterval(() => {
        clearInterval(interval);

      if(state.work_mode){
        if(countUpSeconds === 59 && stopTimer === false){
            setCountUpSeconds(0);
            setCountUpMinutes(countUpMinutes + 1);
            // setCountUpMinutes(parseInt(countUpMinutes) + 1);
        } else{
          // setCountUpSeconds(parseInt(countUpSeconds) + 1)
          console.log("type and useEffect countUpSeconds:", typeof countUpSeconds)
          setCountUpSeconds(countUpSeconds + 1)
        }
      } 
      if(!state.work_mode && !stopTimer){
        // setCountUpSeconds(countUpSeconds);
        // setCountUpMinutes(countUpMinutes);
        // setCountUpSeconds(countUpSeconds);
        // setCountUpMinutes(countUpMinutes);
        setdisplayMessage(false);
        setStopTimer(true)
      }
    }, 535);

    let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
    let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
    console.log("typeof CountUpTimerMinutes, CountUpTimerMinutes:", typeof CountUpTimerMinutes, CountUpTimerMinutes, CountUpTimerSeconds)

    let countUpTimer = `${CountUpTimerMinutes}:${CountUpTimerSeconds}`
    console.log("typof countUpTimer dispatch:", typeof countUpTimer)

    dispatch({ type: "inProgressTimer", payload: countUpTimer})
  }, [seconds])

  return (
    <>
      {state.work_mode ? state.timer : null}
    </>
  )
}