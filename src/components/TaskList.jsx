import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './TaskList.css'
import TaskTab from './TaskTab';
import TaskForm from './TaskForm';
import { useAppState } from '../AppState';
import {postTask, destroy, update, loadTasks} from '../services/taskService';
import Loading from '../pages/Loading';

const { TabPane} = Tabs;
const { Content} = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setLoadTask] = React.useState();
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { state, dispatch } = useAppState();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
        console.log('task to create', task);
        createTask(task).then(onRefresh())
        message.success('Task added!');
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh())
        message.warn('Task removed');
        // setRefreshing(true)
    }

    const handleToggleTaskStatus = (task) => {
        
        // task.completed = !task.completed;
        task.completed ? task.completed = false : task.completed = true
        // updateTask(task).then(onRefresh())
        updateTask(task)
        message.info('task.completed ? ', task.completed);
        message.info('Task status updated!');
    }
    
    const refresh = async () => {
        const loadedTask = await loadTasks()
        console.log("loadedTask await", loadedTask)
        setLoadTask(loadedTask);
        setActiveTasks(loadedTask.filter(parsedTask => parsedTask.completed === false))
        setCompletedTasks(loadedTask.filter(parsedTask => parsedTask.completed === true))
    };


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        console.log("useCallback", "useCallback")
        let loadedTasks = await loadTasks()
        const parsedTask = loadedTasks.filter(parsedTask => parsedTask.user_id === state.user_id)
        setLoadTask(parsedTask);
        setActiveTasks(parsedTask.filter(task => task.completed === false))
        setCompletedTasks(parsedTask.filter(task => task.completed === true))
        console.log(tasks);
        setRefreshing(false);
        console.log("Refreshing state", refreshing);
    }, [refreshing]);

    useEffect(() => {
        console.log("useEffect()");
        refresh()
    }, [onRefresh]);

    const loaded = () => {
        return (
            <div className="trackList">
                <div className="dummy-side-panel">
                </div>
                <Layout className="layout" style={{backgroundColor: '#fff'}}>
                    <Content style={{ }}>
                    <div className="tasklist">
                        <Row>
                            {/* <Col span={14} offset={0}> */}
                            <Col span={14} offset={0}>
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TaskTab tasks={tasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TaskTab tasks={activeTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TaskTab tasks={completedTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>   
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
    return tasks ? loaded() : <Spin indicator={antIcon} />
}

export default TaskList