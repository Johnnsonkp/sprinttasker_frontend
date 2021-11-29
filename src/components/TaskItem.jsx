import React, {useState} from 'react';
import {Tooltip, Tag, List, Button, Popconfirm, Switch, Input} from 'antd';
import {CloseOutlined, CheckOutlined, CheckCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import TaskSubitems from './TaskSubitems'
import Descriptions from './Descriptions'
import { Collapse, Space, Divider, Popover, Card } from 'antd';
import { useAppState } from '../AppState';
const {TextArea} = Input;


const Task = ({task, onTaskRemoval, onTaskToggle}) => {
    const { state, dispatch } = useAppState();
    // const [toggle, setToggle] = React.useState(false)
    const [toggle, setToggle] = React.useState(false)
    const [display, setDisplay] = React.useState(false)
    const [showDesc, setShow] = React.useState(false)
    
    const setToggleFunction = (e) => {
        // e.preventDefault()
        // setToggle(!toggle)
        console.log("toggle", toggle)
        // dispatch({ type: "workMode", payload: toggle})
    }
    const setDisplayFunction = (e) => {
        setDisplay(!display)
        console.log("display", display)
        // dispatch({ type: "workMode", payload: toggle})
    }
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


    const menu1 = "testing menu"
    return (
        <>
        <List.Item
            style={ task.completed? styles.completed : styles.listRow}
            itemLayout="horizontal"
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
            <div className="task-item">
                <div className="btnToggle">
                    <Tooltip
                        name={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                        <Button type="secondary-btnToggle" shape="circle" icon={<CheckOutlined />} 
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
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
                    <TaskSubitems menu1={menu1}/>
                </div> 

                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}} type="vertical" orientation="left" />
                <div className="btnwrap">
                    <Button type="primary" shape="circle" 
                        onClick={(e) => {
                            setToggle(!toggle)
                            dispatch({ type: "workMode", payload: toggle})
                        }}
                        icon={<PlayCircleOutlined />}/>
                </div>

                <Divider style={{borderTop: "3px solid #cbd4db", height: "48px"}}       type="vertical" orientation="left" />
                        
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