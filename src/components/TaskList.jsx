import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './TaskList.css'
import TaskTab from './TaskTab';
import InProgressTab from './inProgressTab'
import TaskForm from './TaskForm';
import { useAppState } from '../AppState';
import {postTask, destroy, update, loadTasks} from '../services/taskService';
import Preload from '../utilities/Preload'

const { TabPane} = Tabs;
const { Content} = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setLoadTask] = React.useState();
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { state, dispatch } = useAppState();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const taskInProgress = () => {

        return (
            <h1>Task in progress</h1>
        )
    }

    const createTask = (task) => {
        return postTask(task)
    };

    const updateTask = (task) => {
        return update(task).then(onRefresh())
    };
      
    const deleteTask = (id) => {
        return destroy(id)
    };

    const handleFormSubmit = (task) => {
        // console.log('task to create', task);
        createTask(task).then(onRefresh())
        message.success('Task added!');
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh())
        message.warn('Task removed');
    }

    const handleToggleTaskStatus = (task) => {
        task.completed ? task.completed = false : task.completed = true
        updateTask(task)
        message.info('task.completed ? ', task.completed);
        message.info('Task status updated!');
    }
    
    const refresh = async () => {
        const loadedTask = await loadTasks()
        console.log("loadedTask await", loadedTask)
        setLoadTask(loadedTask);
        // setActiveTasks(loadedTask.filter(parsedTask => parsedTask.completed === false))
        // setCompletedTasks(loadedTask.filter(parsedTask => parsedTask.completed === true))
        setActiveTasks(loadedTask)
        setCompletedTasks(loadedTask)
        dispatch({type: "getTasks", payload: tasks});
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // console.log("useCallback", "useCallback")
        let loadedTasks = await loadTasks()
        dispatch({type: "getTasks", payload: loadedTasks});
        const parsedTask = loadedTasks.filter(parsedTask => parsedTask.user_id === state.user_id)
        setLoadTask(parsedTask);
        // setActiveTasks(parsedTask.filter(task => task.completed === false))
        // setCompletedTasks(parsedTask.filter(task => task.completed === true))
        setActiveTasks(parsedTask)
        setCompletedTasks(parsedTask)
        // console.log(tasks);
        setRefreshing(false);
        // console.log("Refreshing state", refreshing);
    }, [refreshing]);

    useEffect(() => {
        console.log("useEffect()");
        refresh()
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
                                { state.work_mode ? 
                                    <TabPane type="danger" tab="In Progress" key="Inprogress">
                                        <InProgressTab onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}  /> 
                                    </TabPane> : null
                                }
                                <TabPane tab="All" key="all">
                                    <TaskTab tasks={tasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TaskTab tasks={activeTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TaskTab tasks={completedTasks} inProgress={taskInProgress} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />   
                                </TabPane>
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
    return <Preload timeoutLengthInSeconds={500} handleFunction={loaded()} />
}

export default TaskList