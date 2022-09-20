import {Button, Progress} from 'antd';
import {PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react'

import { CaretRightOutlined } from "@ant-design/icons";
import Clock from '../clock/clock';
import Pomodoro from '../Pomodoro'
import { reformatDate } from '../../utilities/utilFunctions';
import {styles} from './timeContainer.styles'
import { useAppState } from '../../AppState'

export default function TimerContainer() {
    const {state} = useAppState()
    const task = state.selectedTask
    const [show, setShow] = useState(false)

    const newTimer = () => {
        return <Pomodoro />
    }
    const selectedTaskTruncated = (taskName) => {
        // console.log("taskName.substring.length", taskName.substring(31)? true : false)
        console.log("taskName.substring(31)? true : false", taskName.substring(30)? true : false)
        const subStringLength = taskName.substring(30)? true : false
       if(subStringLength){
            return taskName.substring(0, 30) + '...'
       }
        return taskName.substring(0, 29) 
        // return taskName.substring(0, 30) + '...'
    }
    const ClockDisplay = () => {
        return(
            <>
                {Clock()} 
            </>
        )
    }

    useEffect(() => {
        if(state.work_mode && show === false){
            setShow(true)
        } 
        
    }, [state.work_mode])


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
                        fontWeight: 'bold',
                        margin: 'auto',
                        paddingLeft: state.work_mode ? '15px' : '0px'
                    }}>
                    {state.work_mode ? selectedTaskTruncated(state.selectedTask.name) : null}
                </span>
            </div>
                <span className="time-display" 
                    style={{
                        color: '#fff', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        // marginRight: state.work_mode ? '0px' : '100px',
                        // margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '70%'
                    }}>
                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>{reformatDate(Date.now(), "dd/MM/yyyy")}</span>
                    {state.work_mode ? newTimer() : (<ClockDisplay />)}  
                    {/* {reformatDate(Date.now(), "dd/MM/yyyy")} */}
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
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px', marginTop: '15px'}}>{state.work_mode && task.name }</h5>
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
                        <h5 style={{ color: '#fff', fontWeight: 'bolder', fontSize: '13px', marginTop: '15px'}}>{state.work_mode && task.description && task.description }</h5>
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