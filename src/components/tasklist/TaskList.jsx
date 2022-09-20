import './TaskList.css'

import {Col, Layout, Row, Spin, Tabs, message} from 'antd';
import React, { useEffect, useState } from 'react';
import {destroy, loadTasks, postTask, update} from '../../services/taskService';
import {dummyData, getDataFromLocalStorage, removeLocalStorageItem, setDataToLocalStorage, taskInProgress}  from './taskListHelpers.js'

import InProgressTab from '../inProgressTab'
import { SkeletonTemplate } from '../../utilities/skeleton/skeleton';
import TaskForm from './TaskForm';
import TaskTab from './TaskTab';
import { useAppState } from '../../AppState';
import { useLocation } from 'react-router-dom';

const { TabPane} = Tabs;
const { Content} = Layout;

const TaskList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setLoadTask] = React.useState(null);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { state, dispatch } = useAppState();
    const location = useLocation()

    const sortDummyData = async (res) => {        
        setActiveTasks(res)
        setLoadTask(res)
        setCompletedTasks(res)
    }
      
    //Tasklist CRUD actions
    const updateTask = (task) => {
        return update(task).then(() => {
            removeLocalStorageItem('taskData')
            setRefreshing(false)
        })
    };
    
    const handleFormSubmit = (task) => {
        postTask(task).then(() => {
            removeLocalStorageItem('taskData')
            setRefreshing(false)
        })
        message.success('Task added!');
    }
    const handleRemoveTask = (task) => {
        destroy(task.id).then(() => {
            removeLocalStorageItem('taskData')
            setRefreshing(false)
        })
        message.warn('Task removed');
    }

    const handleToggleTaskStatus = (task) => {
        task.completed ? task.completed = false : task.completed = true
        updateTask(task)
        message.info('Task status updated!')
    }
    const handleTimer = (task, updateTimer) => {
        task.timer = updateTimer
        updateTask(task)
        message.info('Timer update? ', task.timer);
    }


    // Sorting tasks into task tabs
    const sortTaskDataAction = async (res) => {        
        let sortTaskById = res.sort((a, b) => (a.order < b.order) ? -1 : 1) || sortTaskById
        
        setActiveTasks(sortTaskById.filter(parsedTask => parsedTask.completed === false))
        setCompletedTasks(sortTaskById.filter(parsedTask => parsedTask.completed === true))
        setLoadTask(sortTaskById.filter(parsedTask => parsedTask.completed === true).concat(sortTaskById.filter(parsedTask => parsedTask.completed === false)));

        setRefreshing(true)
    }

    useEffect(async () => {
        const localStorageData = getDataFromLocalStorage("taskData")
        // On page refresh, if local storage data isn't present and 
        // Refreshing value set to default(false)
        if(!refreshing && !localStorageData){
            await loadTasks().then((res) => {
                if(res.length > 0) {
                    sortTaskDataAction(res)
                }else{
                    sortDummyData(dummyData)
                }
            })
        }
        // set data to local storage after its been fetched
        if(refreshing){
            setDataToLocalStorage("taskData", tasks)
            dispatch({ type: "alltasks", payload: tasks });
        }
        // fetch local storage data if present
        if(!refreshing && localStorageData){
            sortTaskDataAction(localStorageData)
        }
    }, [refreshing]);
   


    const loaded = () => {
        return (
            <div id="trackList" className="trackList">
                <div className="dummy-side-panel">
                </div>
                <Layout className="layout">
                    <Content style={{ }}>
                    <div className="tasklist">
                        <Row>
                            <Col span={14} offset={0}>
                            <br />
                            <Tabs defaultActiveKey={state.work_mode ? "Inprogress" : "all"}>
                                
                                { state.selectedTask && state.work_mode ? 
                                    <TabPane type="danger" tab="In progress" key="Inprogress">
                                        <InProgressTab onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}  updateTask={updateTask} createTask={handleFormSubmit} handleTimer={handleTimer}/> 
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="All" key="all">
                                        <TaskTab tasks={tasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTimer={handleTimer} updateTask={updateTask} createTask={handleFormSubmit} handleTimer={handleTimer}/>
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="Active" key="active">
                                        <TaskTab tasks={activeTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTimer={handleTimer}  updateTask={updateTask} handleTimer={handleTimer} createTask={handleFormSubmit}/>
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="Complete" key="complete">
                                        <TaskTab tasks={completedTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTimer={handleTimer}  updateTask={updateTask} createTask={handleFormSubmit} handleTimer={handleTimer}/>   
                                    </TabPane> : null
                                }
                                { location.pathname === '/my_work' ?
                                    <TabPane tab="All" key="all">
                                        <TaskTab tasks={props.sprints} />   
                                    </TabPane> : null
                                }
                                    <TabPane tab="Create Task" key="createtask">
                                        <TaskForm onFormSubmit={handleFormSubmit} />
                                    </TabPane>
                            </Tabs>
                            </Col>
                        </Row>
                    </div>
                    </Content>
                </Layout>
            </div>
        )
    }
    return tasks? loaded() : <SkeletonTemplate />
}

export default TaskList