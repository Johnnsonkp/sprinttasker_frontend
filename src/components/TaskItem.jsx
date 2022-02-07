import {Button, List, Popconfirm, Tag, Tooltip} from 'antd';
import { Card, Divider } from 'antd';
import {CheckOutlined, MessageOutlined, PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react';
import { onChangeETC, updateEstimatedTimeToComplete, updateTaskTimer } from '../utilities/utilFunctions';

import Pomodoro from '../components/Pomodoro'
import TaskSubitems from './TaskSubitems'
import { useAppState } from '../AppState';

const Task = ({task, onTaskRemoval, onTaskToggle, updateTimer, updateTask}) => {
    const {state, dispatch } = useAppState();
    const [toggle, setToggle] = useState(true)
    const [showDesc, setShow] = React.useState(false)
    const [hover, setHover] = useState(false);
    const [date, setDate] = useState();
    const [buttonColor, setButtonColor] = useState(false)

    const styles = {
        listRow: {
            width: '100%',
            maxHeight: '40px',
        },
        completed: {
            backgroundColor: '#d2f8d2',
            width: '100%'
        },
        activeCell: {
            backgroundColor: '#c4c4c4',
            position: 'relative',
            height: '100%',
            height: '100px',
            padding: '0 8px',
            textAlign: 'left',
            fontSize: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        completeCell: {
            backgroundColor: '#d2f8d2',
            backgroundColor: 'rgb(0, 200, 117)',
            position: 'relative',
            height: '100%',
            height: '100px',
            padding: '0 8px',
            textAlign: 'left',
            fontSize: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff'
        }
    }
    const displayDescription = (e) => {
        console.log(e.target)
        setShow(!showDesc)
        console.log(showDesc)
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const TimerTextAreaInProgressTimer = () => {
        return(
            <textarea
                onChange={(e) => updateTaskTimer(e, task, updateTask)}
                rows="1" 
                cols='10' 
                style={{
                    border: '1px solid transparent', 
                    padding: '5px',
                    width: '100%', 
                    height: '100%', 
                    background: 'transparent', 
                    resize: "none"
                }}
                value={state.work_mode && state.inProgressTimer && state.selectedTask.id === task.id? state.inProgressTimer : task.timer}
                >
                {state.work_mode && state.inProgressTimer && state.selectedTask.id === task.id? state.inProgressTimer : task.timer}
            </textarea>
        )
    }
    const TimerTextArea = () => {
        return(
            <textarea
                onChange={(e) => updateTaskTimer(e, task, updateTask)}
                rows="1" 
                cols='10' 
                style={{
                    border: '1px solid transparent', 
                    padding: '5px',
                    width: '100%', 
                    height: '100%', 
                    background: 'transparent', 
                    resize: "none"
                }}
            >
                {state.work_mode && state.inProgressTimer && state.selectedTask.id === task.id? state.inProgressTimer : task.timer}
            </textarea>
        )
    }

    useEffect(() => {
        setButtonColor(state.work_mode && state.selectedTask.id === task.id ? true : false)

        if(!state.work_mode && state.selectedTask.id === task.id){
            console.log("typeof and finish timer:", state.inProgressTimer, typeof state.inProgressTimer)
            updateTimer(task, state.inProgressTimer)
        }
        
    }, [state.work_mode, state.selectedTask])


    return (
        <>
        <List.Item
            style={styles.listRow}
            actions={[
                <Popconfirm
                    name={'Are you sure you want to delete?'}
                    onConfirm={() => {
                        onTaskRemoval(task);
                    }}>
                    <Button className="remove-task-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={task.id}
        >   
            <div className="task-item"
                onMouseOver={() => hover? "" : setHover(true)}
            >
                <div className="btnToggle">
                    <Tooltip
                        name={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                        <Button type="secondary-btnToggle" shape="circle" icon={<CheckOutlined />} 
                            defaultChecked={task.completed}
                            onClick={() => onTaskToggle(task)}
                            onClick={() => onTaskToggle(task)}
                        />
                    </Tooltip>
                </div>
                <div className="task-wrap" onClick={(e) => displayDescription(e)}>
                    <Tag className="task-tag">
                        {task ? capitalizeFirstLetter(task.name) : task.name}
                    </Tag>
                    {task.description ? <MessageOutlined style={{color: '#7e8386'}}/> : null}
                </div>

                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />

                <div className="subitem-wrap">
                    <TaskSubitems task={task}/>
                    {/* {task.subtask? task.subtask : null} */}
                </div> 

                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />
                    <div className="task-status" style={task.completed ? styles.completeCell : styles.activeCell}>
                        {task.completed ? "Complete" : "status"}
                    </div>
                
                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />
                
                <div className="btnwrap">
                    <Button size="small" 
                        type={ task.id === state.selectedTask.id && buttonColor ? 'danger' : 'primary'} 
                        shape="circle" 
                        onClick={(e) => {
                            setToggle(!toggle)
                            if(toggle === false){
                                setHover(false)
                            }
                            dispatch({ type: "workMode", payload: toggle})
                            dispatch({ type: "selectTask", payload: task})
                        }}
                        icon={task.id === state.selectedTask.id && buttonColor ? <PauseCircleOutlined /> : <PlayCircleOutlined />}/>
                    <div 
                        className="timerSlot" 
                        style={{color: parseFloat(task.timer) > parseFloat(task.time_to_complete)? 'red' : null }}
                        >
                        {state.work_mode && state.inProgressTimer && state.selectedTask.id === task.id?
                            <TimerTextAreaInProgressTimer /> : <TimerTextArea />
                            
                        }
                        
                    </div>
                    <div className="timerSlot">
                        {/* {task.time_to_complete? task.time_to_complete : null} */}
                    </div>
                </div>
                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} /> 

                <div 
                    className="timerSlot" 
                    style={{width: '120px', display: 'flex', justifyContent: 'space-around'}}
                >
                     <p 
                        style={{fontSize: '14px', display:'flex', justifyContent: 'space-between', width: '90%'}}
                    >
                        <h5 style={{fontWeight: '400', marginTop: 'auto', marginBottom: 'auto'}}>ETC:</h5> 
                        <textarea 
                            onChange={(e) => updateEstimatedTimeToComplete(e, task, updateTask)}
                            // defaultValue={task.time_to_complete}
                            rows="1" 
                            cols='10' 
                            style={{
                                border: '1px solid transparent', 
                                padding: '5px',
                                width: '100%', 
                                height: '100%', 
                                background: 'transparent', 
                                resize: "none"
                            }}>{task.time_to_complete? task.time_to_complete : null}
                        </textarea></p>
                </div> 

                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />
            </div>
        </List.Item>

        {showDesc?
            <div className="task-description" >
                <List.Item>
                    <Card size="small" style={{ width: 460, textAlign: "left", margin: '20px', fontSize: '12px' }} title="Task Description">{task.description}</Card>
                </List.Item>
                <List.Item>
                    {/* <Card size="small" style={{ width: 460, textAlign: "left", margin: '20px', fontSize: '12px' }} title="Subtask">{task.subtask}</Card> */}

                    <Card size="small" style={{ width: 460, textAlign: "left", margin: '20px', fontSize: '12px' }} title="Subtask">
                     {task.subtask}
                    </Card>
                </List.Item>
            </div>
            : null
        }
        </>                           
    )
}
export default Task;