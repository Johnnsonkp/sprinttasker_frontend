import React, {useState} from 'react'
import Pomodoro from './Pomodoro'
import { useAppState } from '../AppState'
import { CaretRightOutlined } from "@ant-design/icons";

export default function TimerContainer() {
    const {state} = useAppState()
    const task = state.selectedTask
    const [show, setShow] = useState(false)
    // let restTime = 0000

    const styles = {
        hide: {
            opacity: 0,
            transition: 'all 50ms ease-in',
            transitionProperty: 'opacity,width',
            width: '100%',
            position: "absolute",
            left: '0px',
            top: '100px',
            backgroundColor: "lightGrey"
        },
        show: {
            opacity: 1,
            width: '100%',
            transition: 'all 50ms ease-in',
            transitionProperty: 'opacity,width',
            position: "absolute",
            left: '0px',
            top: '50px',
            borderRadius: '15px',
            boxShadow: '0 4px 17px 6px rgb(0 0 0 / 10%)',
            zIndex: '1',
            backgroundColor: "#f5f6f8"
        },
        workMode: {
            // backgroundColor: "red",
            backgroundColor: '#111',
            border: "3px solid #ff4d4f"
        },
        restMode: {
            // backgroundColor: "rgb(0, 200, 117)",
            backgroundColor: '#111',
            border: "3px solid rgb(0, 200, 117)"
        },
    }

    return (
        <div className="timer-container" >
            <div className="timer-display" onClick={() => setShow(!show)} style={state.work_mode ? styles.workMode : styles.restMode }>
                <div className="left">
                    <span style={{color: '#fff', fontSize: '14px', fontWeight: 'bold'}}>{state.work_mode ? "WORK MODE: " : "REST MODE: "}</span>
                </div>
                <span className="time-display" style={{color: '#fff', fontSize: '14px', fontWeight: 'bold', marginRight: '70px'}}>{state.work_mode ? <Pomodoro /> : '00:00'}</span>
                <div className="right"><CaretRightOutlined backgroundColor="#111" rotate={show ? 0 : 90} /></div>
            </div>
            <div style={show ? styles.show : styles.hide} className="show-hide-timer">
                <h4 style={{display: 'flex', alignItems: 'center', padding: '4px', borderBottom: '1px solid #111', color: 'red', fontWeight: 'bolder'}}>Timer:{ state.work_mode ?  <Pomodoro /> : '00:00' }</h4>
                    <div className="inner-timer" >
                    { state.work_mode ? 
                        <>
                        <div style={{border: "1px solid #111", padding: '5px', borderRadius: '8px', marginBottom: '15x'}}>
                            <h4>Task:</h4>
                            <h5>{state.work_mode ? task : null}</h5>
                        </div>
                        <div style={{border: "1px solid #444", padding: '5px', borderRadius: '8px', marginTop: '15px'}}>
                            <h4>Subtask:</h4>
                            <h5>{state.work_mode && task.subtask ? task.subtask : null}</h5>
                        </div>
                        </>
                     : null
                    }
                        <div className="footer">

                        </div>
                    </div> 
                
            </div>
        </div>
    )
}