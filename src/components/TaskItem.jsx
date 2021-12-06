import React, {useState} from 'react';
import {Tooltip, Tag, List, Button, Popconfirm} from 'antd';
import {CheckOutlined, PlayCircleOutlined, PauseCircleOutlined} from '@ant-design/icons'
import TaskSubitems from './TaskSubitems'
import { Divider, Card } from 'antd';
import { useAppState } from '../AppState';
import Pomodoro from '../components/Pomodoro'


const Task = ({task, onTaskRemoval, onTaskToggle}) => {
    const {state, dispatch } = useAppState();
    const [toggle, setToggle] = useState(true)
    const [showDesc, setShow] = React.useState(false)
    const [hover, setHover] = useState(false);
    
    const styles = {
        listRow: {
            width: '100%'
        },
        completed: {
            backgroundColor: '#d2f8d2',
            width: '100%'
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
    // const timer = () => {
    //     return (
    //         <h1>Timer</h1>
    //     )
    // }
    const timer = () => {
        return (
            <h1>Timer</h1>
        )
    }

    const minute = 23
    const seconds = 59

    return (
        
        <>
        <List.Item
            style={ task.completed? styles.completed : styles.listRow}
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
                // onMouseOut={() => setHover(false)}
            >
                <div className="btnToggle">
                    <Tooltip
                        name={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                        <Button type="secondary-btnToggle" shape="circle" icon={<CheckOutlined />} 
                            // checkedChildren={<CheckOutlined />}
                            // unCheckedChildren={<CloseOutlined />}
                            defaultChecked={task.completed}
                            onClick={() => onTaskToggle(task)}
                        />
                    </Tooltip>
                </div>
                <div className="task-wrap" onClick={(e) => displayDescription(e)}>
                    <Tag className="task-tag">
                        {capitalizeFirstLetter(task.name)}
                    </Tag>
                </div>
                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}} type="vertical" orientation="left" />
                <div className="subitem-wrap">
                    <TaskSubitems task={task}/>
                </div> 

                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}} type="vertical" orientation="left" />
                <div className="btnwrap">
                    <Button type={toggle ? "primary" : "danger"} shape="circle" 
                        onClick={(e) => {
                            setToggle(!toggle)
                            if(toggle === false){
                                setHover(false)
                            }
                            dispatch({ type: "workMode", payload: toggle})
                            dispatch({ type: "selectTask", payload: capitalizeFirstLetter(task.name)})
                        }}
                        icon={toggle ? <PlayCircleOutlined /> : <PauseCircleOutlined />}/> 
                </div>

                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}} type="vertical" orientation="left" />

                <div className="timerSlot">
                    {
                        state.work_mode &&  hover? <Pomodoro timer={timer}/> :
                        "0:00"
                    }
                </div>

                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}} type="vertical" orientation="left" />
                        
            </div>
        </List.Item>

        {showDesc?
            <div className="task-description" >
                <List.Item>
                    <Card size="small" style={{ width: 460, textAlign: "left", margin: '10px' }} title="Task Description">{task.description}</Card>
                </List.Item>
                <List.Item>
                    <Card size="small" style={{ width: 460, textAlign: "left", margin: '10px' }} title="Subtask">{task.subtask}</Card>
                </List.Item>
            </div>
            : null
        }
        </>                    
    )
}

export default Task;