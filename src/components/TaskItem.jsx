import {Button, Card, Dropdown, List, Menu, Popconfirm, Tag, Tooltip} from 'antd';
import {CheckOutlined, DownOutlined, MessageOutlined, PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react';
import { TimerTextArea, TimerTextAreaInProgressTimer } from './common/inputs/input';
import { taskTimerUpdate, updateEstimatedTimeToComplete, updateTaskTimer } from '../utilities/utilFunctions';

import { Divider } from '../utilities/utilFunctions';
import { DuplicateTask } from './common/buttons/buttons';
import { FullPageOverlayCard } from './common/cards/cards';
import { InputNumber } from 'antd';
import { OverlayVisible } from './common/dropdown/dropdown';
import {TimerSlot} from './timedisplay/timeSlotDisplay'
import { capitalizeFirstLetter } from '../utilities/utilFunctions';
import { styles } from './styles/task.styles';
import { useAppState } from '../AppState';

const Task = ({task, onTaskRemoval, onTaskToggle, updateTimer, updateTask, key, task_id, createTask}) => {
    const {state, dispatch } = useAppState();
    const [toggle, setToggle] = useState(true)
    const [hover, setHover] = useState(false);
    const [buttonColor, setButtonColor] = useState(false)
    const [showTaskCard, setShowTaskCard] = useState(false)
    let [orderValue, setOrderValue] = useState(task.order)

    const updateTaskOrder = (task) => {
        if(task_id === task.id){
            task.order = orderValue
            updateTask(task)
        }
    }

    const updateTaskTimerOnClick =  (task) => {
        if(!state.work_mode && state.selectedTask.id === task.id){
            task.timer = state.inProgressTimer
            updateTask(task)
        }
    }

    useEffect(() => {
        setButtonColor(state.work_mode && state.selectedTask.id === task.id ? true : false)
            updateTaskTimerOnClick(task)
            return function cleanup() {
                updateTaskTimerOnClick(task)
            }
    }, [state.work_mode, state.selectedTask])

    return (
        <>
        {showTaskCard?
        <FullPageOverlayCard 
            task={task}
            taskStatus={task.completed}
            setShowTaskCard={setShowTaskCard} 
            description={task.description} 
            name={task.name}/> :
        <List.Item
            style={task.completed? styles.completeListRow : styles.listRow}
            actions={[
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Divider task={task}/>
                    <Popconfirm
                        name={'Are you sure you want to delete?'}
                        onConfirm={() => {
                            onTaskRemoval(task);
                        }}>
                        <Button className="remove-task-button" type="primary" danger>
                            X
                        </Button>
                    </Popconfirm>
                </div>
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
                        />
                    </Tooltip>
                </div>
                <Divider task={task}/>
                <div style={{width: '45px', marginRight: '0px'}}>
                    <InputNumber min={0} max={10} defaultValue={task.order || 0} 
                        style={{width: '100%', float: 'left'}}
                        keyboard={true}
                        bordered={false}
                        value={orderValue}
                        size={'small'}
                        controls={true}
                        onChange={setOrderValue}
                        onPressEnter={() => updateTaskOrder(task)}
                    />
                </div>
                <Divider task={task}/>
                    <div className="task-wrap" onClick={() => setShowTaskCard(true)}>
                        <Tag className="task-tag">
                            {task ? capitalizeFirstLetter(task.name) : task.name}
                        </Tag>
                        {task.description && <MessageOutlined style={{color: '#7e8386'}}/>}
                    </div>
                <Divider task={task}/>
                    <div className="subitem-wrap">
                        <Button
                            onClick={() => setShowTaskCard(true)}
                            style={{fontSize: '11px'}}
                        >Expand</Button>
                    </div> 
                <Divider task={task}/>
                    <div 
                        className="task-status" 
                        style={task.completed ? styles.completeCell : styles.activeCell}>
                        {task.completed ? "Complete" : "status"}
                    </div>
                <Divider task={task}/>
                <div className="btnwrap"
                    style={{
                        width: '165px', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginLeft: '5px',
                    }}
                >
                    
                    <Button 
                        style={{marginRight: '5px'}}
                        size="small" 
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
                    
                    <Divider task={task}/>
                    
                    <div 
                        style={{
                            backgroundColor: '#1890ff29', 
                            width: '75%', 
                            width: '100%',
                            overflow: 'hidden',
                            marginRight: '0px',
                            borderTopLeftRadius: '8%',
                            borderTopRightRadius: '8%',
                            borderBottomLeftRadius: '8%',
                            borderBottomRightRadius: '8%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', 
                            // margin: '10px',
                            padding: '0px',
                            margin: 'auto',
                            // marginLeft: '10px'
                        }}
                    >
                        <div 
                            className="timerSlot" 
                            style={{color: parseFloat(task.timer) > parseFloat(task.time_to_complete)? 'red' : null, width: '120px' 
                            }}
                            >
                            {state.work_mode && state.inProgressTimer && state.selectedTask.id === task.id?
                                <TimerTextAreaInProgressTimer 
                                    task={task}
                                    updateTask={updateTask}
                                    state={state}
                                    updateTaskTimer={updateTaskTimer}
                                    key={task.id}
                                    otherKey={task.id}
                                /> 
                                : 
                                <TimerTextArea 
                                    task={task_id === task.id && task}
                                    updateTask={updateTask}
                                    state={state}
                                    updateTaskTimer={updateTaskTimer}
                                    taskTimerUpdate={taskTimerUpdate}
                                    buttonColor={buttonColor}
                                    key={task.id}
                                    otherKey={task.id}
                                />
                            } 
                        </div> / 

                        <TimerSlot 
                                updateEstimatedTimeToComplete={updateEstimatedTimeToComplete}
                                task={task}
                                updateTask={updateTask}
                            /> 
                    </div>
                </div>
                    <Divider task={task}/>
                        <div className="timerSlot"
                            style={{width: '70px', display: 'flex', justifyContent: 'space-around'}}
                        >   
                            {task.reward && <OverlayVisible task={task}/>}
                        </div>
                    <Divider task={task}/>
                        <div className="timerSlot"
                                style={{width: '40px', display: 'flex', justifyContent: 'space-around'}}
                            > 
                            <DuplicateTask 
                                updateTask={updateTask}
                                task={task}
                                createTask={createTask}
                            />
                        </div>
                    <Divider task={task}/>
            </div>
        </List.Item>
        }
        </>                           
    )
}
export default Task;