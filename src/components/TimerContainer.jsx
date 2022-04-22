import {Button, Progress} from 'antd';
import {PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react'

import { CaretRightOutlined } from "@ant-design/icons";
import Pomodoro from './Pomodoro'
import { useAppState } from '../AppState'

export default function TimerContainer() {
    const {state} = useAppState()
    const task = state.selectedTask
    const [show, setShow] = useState(false)

    const styles = {
        hide: {
            opacity: 0,
            transition: 'all 1ms ease-in',
            transitionProperty: 'opacity, width',
            width: '0%',
            position: "absolute",
            left: '0px',
            top: '28px',
            backgroundColor: "lightGrey",
        },
        show: {
            opacity: 1,
            width: '100%',
            transition: 'all 1ms ease-in',
            transitionProperty: 'opacity,width',
            position: "absolute",
            left: '0px',
            top: '29px',
            boxShadow: '0 4px 17px 6px rgb(0 0 0 / 10%)',
            zIndex: '1',
            backgroundColor: "#f5f6f8",
            backgroundColor: '#3e3e3e',
            borderBottomLeftRadius: '6px', 
            borderBottomRightRadius: '6px',
            boxShadow: 'rgb(100 100 100 / 30%) 0px 0px 2px 1px',
        },
        workMode: {
            border: "3px solid #ff4d4f",
            backgroundColor: 'rgb(17, 17, 17)',
            color: '#111 !important',
            boxShadow: 'rgb(100 100 100 / 30%) 0px 0px 2px 1px',
        },
        restMode: {
            backgroundColor: 'rgb(17, 17, 17)',
            border: "3px solid rgb(0, 200, 117)",
            color: '#111 !important',
            boxShadow: 'rgb(100 100 100 / 30%) 0px 0px 2px 1px',
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
    const selectedTaskTruncated = (taskName) => {
        return taskName.substring(0, 35) + '...'
    }
    useEffect(() => {
        if(state.work_mode && show === false){
            setShow(true)
        } 
        
    }, [state.work_mode])
// }, [state.selectedTask])

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
                        fontSize: '12px', 
                        fontWeight: 'bold'
                    }}>
                    {state.work_mode ? selectedTaskTruncated(state.selectedTask.name) : null}
                </span>
            </div>
                <span className="time-display" 
                    style={{
                        color: '#fff', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        marginRight: state.work_mode ? '0px' : '100px'
                    }}>
                    {state.work_mode ? newTimer() : 'No task selected...'}
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
                        padding: '0px 10px', 
                        color: '#fff', 
                        fontWeight: 'bolder', 
                        fontSize: '18px',
                        marginRight: '0px',
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
                        // background: '#fff',
                        // border: '1px solid lightgrey',
                        borderRadius: '2px',
                        position: 'relative',
                        color: '#fff'
                    }}>
                        <Button 
                            size="medium" 
                            shape="circle" 
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
                            width: '100%',
                            margin: 'auto',
                            padding: '5px 10px',
                            boxSizing: 'borderBox',
                            backgroundColor: 'hsla(0,0%,100%,.1)',
                            borderRadius: '5px',
                            position: 'relative',
                            color: '#111'
                        }}>
                        <h6 style={{ color: '#fff', marginBottom: '0px'}}>Task Name:</h6>
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px', marginTop: '15px'}}>{state.work_mode ? task.name : "No task selected"}</h5>
                    </div>
                    <div
                        style={{
                            // border: "1px solid lightgrey", 
                            padding: '5px 10px', 
                            borderRadius: '8px', 
                            marginTop: '15px',
                            marginBottom: '15px',
                            background: 'hsla(0,0%,100%,.1)',
                            // background: '#fff',
                            // border: '1px solid lightgrey',
                            color: '#fff'
                        }}
                    >   
                        <h6 style={{ color: '#fff', marginBottom: '0px'}}>Task Description:</h6>
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px', marginTop: '15px'}}>{state.work_mode && task.description ? task.description : "No task description"}</h5>
                    </div>
                    {state.work_mode && task.subtask &&
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
                            <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px'}}>{task.subtask}</h5>
                        </div> 
                    }
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