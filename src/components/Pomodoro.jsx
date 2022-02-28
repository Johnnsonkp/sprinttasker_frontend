import React, {useEffect, useState} from "react";

import { useAppState } from "../AppState";

export default function Pomodoro(props) {
  const {state, dispatch} = useAppState()
  // let timerSeconds = state.selectedTask ? state.selectedTask.timer.charAt(5) +  state.selectedTask.timer.charAt(6) : null
  // let timerSeconds = state.selectedTask ? state.selectedTask.timer.charAt(4) : null
  let timerSeconds = state.selectedTask ? (state.selectedTask.timer.charAt(3) !== '0' ? state.selectedTask.timer.charAt(3) + state.selectedTask.timer.charAt(4) : state.selectedTask.timer.charAt(4)) : (null)
  let parseSeconds = state.selectedTask ? parseInt(timerSeconds) : null
  let timerMinutes = state.selectedTask ? state.selectedTask.timer.charAt(0) + state.selectedTask.timer.charAt(1) : null
  let parseMinutes = state.selectedTask ? parseInt(timerMinutes) : null

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
     
    dispatch({ type: "timer", payload: timer}) 
  }, [seconds])

  useEffect(() => {
    let interval = setInterval(() => {
        clearInterval(interval);

      if(state.work_mode){
        if(countUpSeconds === 59 && stopTimer === false){
            setCountUpSeconds(0);
            setCountUpMinutes(countUpMinutes + 1);
        } else{
          setCountUpSeconds(countUpSeconds + 1)
        }
        let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
        let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
        let countUpTimer = `${CountUpTimerMinutes}:${CountUpTimerSeconds}`

        dispatch({ type: "inProgressTimer", payload: countUpTimer})
      } 
      if(!state.work_mode && !stopTimer){
        // setdisplayMessage(false);
        // setStopTimer(true)

        let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
        let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
        let countUpTimer = `${CountUpTimerMinutes}:${CountUpTimerSeconds}`

        dispatch({ type: "inProgressTimer", payload: countUpTimer})

        setdisplayMessage(false);
        setStopTimer(true)
      }
    }, 535);

    // let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
    // let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
    // let countUpTimer = `${CountUpTimerMinutes}:${CountUpTimerSeconds}`

    // dispatch({ type: "inProgressTimer", payload: countUpTimer})
  }, [seconds])

  return (
    <>
      {state.work_mode ? state.timer : null}
    </>
  )
}