import React, {useEffect, useState} from "react";
import { useAppState } from "../AppState";
import { Collapse } from 'antd';
import { useLocation } from "react-router-dom";

export default function Pomodoro(props) {
  const {state, dispatch} = useAppState()
  const [minutes, setMinutes] = useState(23)
  const [seconds, setSeconds] = useState(59)
  const [countUpMinutes, setCountUpMinutes] = useState(0)
  const [countUpSeconds, setCountUpSeconds] = useState(0)
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


      // countUpCountDownTimer()

      
    }, 1000);

    let timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let timer = `${timerMinutes} : ${timerSeconds}`
      
    // dispatch({ type: "timer", payload: timer}) 
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
      } 
      if(!state.work_mode && !stopTimer){
        setCountUpSeconds(countUpSeconds);
        setCountUpMinutes(countUpMinutes);
        setdisplayMessage(false);
        setStopTimer(true)
      }
    }, 535);

    let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
    let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
    let countUpTimer = `${CountUpTimerMinutes} : ${CountUpTimerSeconds}`

    dispatch({ type: "inProgressTimer", payload: countUpTimer})
  }, [seconds])



  // const countUpCountDownTimer = (props) => {

  //   if(state.work_mode){
  //     setStopTimer(false)

  //     if(props.countDown){
  //       if(seconds === 0 && stopTimer === false){
  //         if(minutes !== 0){
  //           setSeconds(59);
  //           setMinutes(minutes - 1);
  //         } else{
  //           // Break time
  //           let minutes = displayMessage ? 24 : 4
  //           let seconds = 59;
  
  //           setSeconds(seconds);
  //           setMinutes(minutes);
  //           setdisplayMessage(!displayMessage);
  //         }
  //       } else{
  //         setSeconds(seconds - 1)
  //       }
  //     }


  //     if(props.countUp){
  //       if(countUpSeconds === 59 && stopTimer === false){
  //         setCountUpSeconds(0);
  //         setCountUpMinutes(countUpMinutes + 1);
  //       } else{
  //         setCountUpSeconds(countUpSeconds + 1)
  //       }
  //     }
  //   } 


  //   if(!state.work_mode && !stopTimer){
  //     seocondsSet(seconds);
  //     minutesSet(minutes);
  //     setdisplayMessage(false);
  //     setStopTimer(true)
  //   }
  // }

  // if(props.countDown){
  //   let timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   let timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  //   let timer = `${timerMinutes} : ${timerSeconds}`

  //   return timer
  // }

  // if(props.countUp){
  //   let CountUpTimerMinutes = countUpMinutes < 10 ? `0${countUpMinutes}` : countUpMinutes;
  //   let CountUpTimerSeconds = countUpSeconds < 10 ? `0${countUpSeconds}` : countUpSeconds;
  //   let countUpTimer = `${CountUpTimerMinutes} : ${CountUpTimerSeconds}`

  //   return countUpTimer
  // }

  return (
    <>
      {state.work_mode ? state.timer : null}
      {/* {timer} */}
    </>
  )
}