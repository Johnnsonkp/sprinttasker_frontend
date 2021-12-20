import React, {useState, useEffect} from 'react';
import {Tooltip, Tag, List, Button, Popconfirm} from 'antd';
import {CheckOutlined, PlayCircleOutlined, PauseCircleOutlined, MessageOutlined} from '@ant-design/icons'
import TaskSubitems from './TaskSubitems'
import { Divider, Card } from 'antd';
import { useAppState } from '../AppState';
import Pomodoro from '../components/Pomodoro'


const Task = ({task, onTaskRemoval, onTaskToggle}) => {
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
    // function capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    useEffect(() => {
        setButtonColor(state.work_mode && state.selectedTask.id === task.id ? true : false)
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
                        {/* {task ? capitalizeFirstLetter(task.name) : task.name} */}
                        {task ? task.name : null}
                    </Tag>
                    {task.description ? <MessageOutlined style={{color: '#7e8386'}}/> : null}
                </div>

                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />

                <div className="subitem-wrap">
                    <TaskSubitems task={task}/>
                </div> 

                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />
                    <div className="task-status" style={task.completed ? styles.completeCell : styles.activeCell}>
                        {task.completed ? "Complete" : null}
                    </div>
                
                <hr style={{border: "2px solid #fff", height: "48px", margin: '0px'}} />
                
                <div className="btnwrap">
                    <Button size="small" 
                        type={ buttonColor && task.id === state.selectedTask.id ? "danger" : "primary"} 
                        shape="circle" 
                        onClick={(e) => {
                            setToggle(!toggle)
                            if(toggle === false){
                                setHover(false)
                            }
                            dispatch({ type: "workMode", payload: toggle})
                            dispatch({ type: "selectTask", payload: task})
                        }}
                        icon={buttonColor && task.id === state.selectedTask.id ? <PauseCircleOutlined /> : <PlayCircleOutlined />}/> 

                    <div className="timerSlot">
                        {/* {state.work_mode && state.selectedTask.id === task.id ? state.timer : null} */}
                        {state.work_mode && state.selectedTask.id === task.id ? state.inProgressTimer : null}

                    </div>
                    <div className="timerSlot">
                        
                    </div>
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
                    <Card size="small" style={{ width: 460, textAlign: "left", margin: '20px', fontSize: '12px' }} title="Subtask">{task.subtask}</Card>
                </List.Item>
            </div>
            : null
        }
        </>   
                         
    )
}

export default Task;