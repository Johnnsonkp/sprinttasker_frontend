import React, {useState} from 'react'
import Pomodoro from './Pomodoro'
import { useAppState } from '../AppState'
import { CaretRightOutlined } from "@ant-design/icons";
import {PlayCircleOutlined, PauseCircleOutlined} from '@ant-design/icons'
import {Button} from 'antd';

export default function TimerContainer() {
    const {state} = useAppState()
    const task = state.selectedTask
    const [show, setShow] = useState(false)

    const styles = {
        hide: {
            opacity: 0,
            transition: 'all 5ms ease-in',
            transitionProperty: 'opacity,width',
            width: '100%',
            position: "absolute",
            left: '0px',
            top: '100px',
            backgroundColor: "lightGrey",
        },
        show: {
            opacity: 1,
            width: '100%',
            transition: 'all 5ms ease-in',
            transitionProperty: 'opacity,width',
            position: "absolute",
            left: '0px',
            top: '44px',
            boxShadow: '0 4px 17px 6px rgb(0 0 0 / 10%)',
            zIndex: '1',
            backgroundColor: "#f5f6f8",
            backgroundColor: '#3e3e3e',
            border: state.work_mode ? "2px solid #ff4d4f" :  "2px solid rgb(0, 200, 117)",
            border: '1px solid transparent',
            borderBottomLeftRadius: '6px', 
            borderBottomRightRadius: '6px'
        },
        workMode: {
            border: "3px solid #ff4d4f",
            backgroundColor: 'rgb(17, 17, 17)'
        },
        restMode: {
            backgroundColor: 'rgb(17, 17, 17)',
            border: "3px solid rgb(0, 200, 117)"
        },
        size: {
            fontSize: '21px',
            fontWeight: 'bolder',
            display: 'inline'
        }
    }

    const newTimer = () => {
        return <Pomodoro />
    }

    return (
        <div className="timer-container" >
            <div className="timer-display" 
                onClick={() => setShow(!show)} 
                style={state.work_mode ? styles.workMode : styles.restMode }
            >
            <div className="left">
                <span 
                    style={{
                        color: '#fff', 
                        fontSize: '14px', 
                        fontWeight: 'bold'
                    }}>
                    {state.work_mode ? "WORK MODE: " : "REST MODE: "}
                </span>
            </div>
                <span className="time-display" 
                    style={{
                        color: '#fff', 
                        fontSize: '14px', 
                        fontWeight: 'bold', 
                        marginRight: '70px'
                    }}>
                    {state.work_mode ? newTimer() : '00:00'}
                </span>
                <div className="right">
                    <CaretRightOutlined backgroundColor="#111" rotate={show ? 0 : 90} />
                </div>
            </div>
            <div 
                style={show ? styles.show : styles.hide} 
                className="show-hide-timer">
                <h4 
                    style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-around',
                        // width: '70%',
                        padding: '0px 10px', 
                        // borderBottom: '1px solid #111', 
                        color: '#fff', 
                        fontWeight: 'bolder', 
                        fontSize: '18px',
                        marginRight: '0px',
                        // background: 'hsla(0,0%,100%,.1)'
                    }}>
                    {newTimer() }
                    <span style={{
                        // width: '97%', 
                        marginLeft: state.work_mode ? '120px' : '190px', 
                        marginTop: '10px',
                        marginBottom: '10px',
                        padding: '5px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'spaceAround',
                        boxSizing: 'borderBox',
                        backgroundColor: 'hsla(0,0%,100%,.1)',
                        borderRadius: '2px',
                        position: 'relative',
                        color: '#fff'
                    }}>
                        <Button size="medium" shape="circle" 
                            onClick={(e) => e.preventDefault()}
                            type={state.work_mode ? "danger" : "primary"} 
                            icon={state.work_mode ? <PauseCircleOutlined /> 
                                : 
                            <PlayCircleOutlined />} 
                        /> 
                    </span>
                </h4>
                    
                <div className="inner-timer" >
                    <div 
                        style={{
                            width: '97%',
                            margin: 'auto',
                            padding: '5px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'spaceBetween',
                            boxSizing: 'borderBox',
                            background: 'hsla(0,0%,100%,.1)',
                            borderRadius: '2px',
                            position: 'relative',
                            color: '#fff'
                        }}>
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px'}}>{state.work_mode ? task.name : "No task selected"}</h5>
                    </div>
                    <div 
                        style={{
                            border: "1px solid #444", 
                            padding: '5px', 
                            borderRadius: '8px', 
                            marginTop: '15px',
                            marginBottom: '15px',
                            background: 'hsla(0,0%,100%,.1)'
                        }}>
                        <h4 style={{ color: '#fff'}}>Subtask:</h4>
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px'}}>{state.work_mode && task.subtask ? task.subtask : "No subtask selected"}</h5>
                    </div> 
                </div> 
                <div 
                    className="footer" 
                    style={{
                        backgroundColor: '#2e2e2e', 
                        backgroundColor: 'rgb(17, 17, 17)', 
                        height: '50px', 
                        padding: '0px', 
                        margin: '0px'
                    }}>
                </div>
            </div>
        </div>
    )
}