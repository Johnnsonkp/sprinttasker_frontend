import './TaskList.css'

import {Col, Layout, Row, Spin, Tabs, message} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {destroy, loadTasks, postTask, update} from '../services/taskService';

import InProgressTab from './inProgressTab'
import { LoadingOutlined } from '@ant-design/icons';
import Preload from '../utilities/Preload'
import { SkeletonTemplate } from '../utilities/skeleton/skeleton';
import TaskForm from './TaskForm';
import TaskTab from './TaskTab';
import { useAppState } from '../AppState';
import { useLocation } from 'react-router-dom';

const { TabPane} = Tabs;
const { Content} = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setLoadTask] = React.useState(null);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { state, dispatch } = useAppState();
    const location = useLocation()
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const dummyData = [
        {   
            completed: true,
            created_at: "2022-01-06T22:28:39.283Z",
            description: "Create a new task",
            id: 222,
            name: "Tasklist is empty, create a new task here",
            subtask: null,
            time_to_complete: null,
            timer: "00:00",
            updated_at: "2022-01-13T03:59:54.250Z",
            user_id: 8
        }
    ]

    const taskInProgress = () => {
        return (
            <h1>Task in progress</h1>
        )
    }

    const createTask = (task) => {
        return postTask(task)
    };

    const updateTask = (task) => {
        update(task).then(onRefresh())
    };
      
    const deleteTask = (id) => {
        return destroy(id)
    };

    const handleFormSubmit = (task) => {
        createTask(task).then(onRefresh())
        message.success('Task added!');
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh())
        message.warn('Task removed');
    }

    const handleToggleTaskStatus = (task) => {
        task.completed ? task.completed = false : task.completed = true
        updateTask(task).then(onRefresh())
        message.info('Task status updated!')
    }
    const handleTimer = (task, updateTimer) => {
        console.log("handleTimer function", task, "updateTimer:", updateTimer)
        task.timer = updateTimer.toString()
        console.log("task.timer:", task.timer)
        updateTask(task)
        message.info('Timer update? ', task.timer);
    }

    const refresh = async () => {
        await loadTasks().then((res) => {
            console.log("res:", res)
            if(res.length > 0){
                dispatch({ type: "getTasks", payload: res})
                let sortTaskById = res.sort((a, b) => (a.id < b.id) ? 1 : -1)
                setActiveTasks(sortTaskById.filter(parsedTask => parsedTask.completed === false))
                setCompletedTasks(sortTaskById.filter(parsedTask => parsedTask.completed === true))
                setLoadTask(sortTaskById.filter(parsedTask => parsedTask.completed === true).concat(res.filter(parsedTask => parsedTask.completed === false)));               
            }
            else {
                setActiveTasks(dummyData)
                setLoadTask(dummyData)
                setCompletedTasks(dummyData)
            }
        })
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await loadTasks().then((res) => {
            console.log("useCallback:", res)
            if(res.length > 0){
                dispatch({ type: "getTasks", payload: res})
                let sortTaskById = res.sort((a, b) => (a.id < b.id) ? 1 : -1)
                console.log("sortby:", sortTaskById)
                setActiveTasks(sortTaskById.filter(parsedTask => parsedTask.completed === false))
                setCompletedTasks(sortTaskById.filter(parsedTask => parsedTask.completed === true))
                setLoadTask(sortTaskById.filter(parsedTask => parsedTask.completed === true).concat(res.filter(parsedTask => parsedTask.completed === false)));
            }
            else {
                setActiveTasks(dummyData)
                setLoadTask(dummyData)
                setCompletedTasks(dummyData)
            }
        })
        setRefreshing(false)
    }, [refreshing]);

    useEffect(() => {
        console.log("useEffect()");
        refresh().catch(e => {
            console.log("this is the error:", e)  // returns a promise
          })
    }, [onRefresh]);

    const loaded = () => {
        return (
            <div id="trackList" className="trackList">
                <div className="dummy-side-panel">
                </div>
                <Layout className="layout" style={{backgroundColor: '#fff'}}>
                    <Content style={{ }}>
                    <div className="tasklist">
                        <Row>
                            <Col span={14} offset={0}>
                            <br />
                            <Tabs defaultActiveKey={state.work_mode ? "Inprogress" : "all"}>
                                
                                { state.selectedTask && state.work_mode ? 
                                    <TabPane type="danger" tab="In Progress" key="Inprogress">
                                        <InProgressTab onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}  updateTask={updateTask}/> 
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="All" key="all">
                                        <TaskTab tasks={tasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTimer={handleTimer} updateTask={updateTask}/>
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="Active" key="active">
                                        <TaskTab tasks={activeTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTask={updateTask}/>
                                    </TabPane> : null
                                }
                                { location.pathname !== '/my_work' ?
                                    <TabPane tab="Complete" key="complete">
                                        <TaskTab tasks={completedTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} updateTask={updateTask}/>   
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
    // return tasks ? loaded() : <Spin indicator={antIcon} />
    // return <Preload timeoutLengthInSeconds={500} handleFunction={loaded()} />
    // return loaded()
    // return tasks && loaded() || <Spin indicator={antIcon} />
    return tasks? loaded() : <SkeletonTemplate />
}

export default TaskList