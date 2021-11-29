import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message, Button} from 'antd';
import './TaskList.css'
import TaskTab from './TaskTab';
import TaskForm from './TaskForm';
import { useAppState } from '../AppState';
import {postTask, destroy, update, getTasks, loadTasks} from '../services/taskService';
const { TabPane} = Tabs;
const { Content} = Layout;


const TaskList = (auth) => {
    const [refreshing, setRefreshing] = useState(false);
    // const [tasks, setTasks] = React.useState([]);
    const [tasks, setLoadTask] = React.useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { state, dispatch } = useAppState();
    const { token, alltasks, user, usertasks } = state;
    const [fetchedTasks, setFetchedTasks] = React.useState([]);
    const [alert, setAlert] = useState(false);
    let mounted = true;

    const createTask = (task) => {
        return postTask(task)
    };

    const updateTask = (task) => {
        return update(task)
    };
      
    const deleteTask = (id) => {
        return destroy(id)
    };

    const handleFormSubmit = (task) => {
        console.log('task to create', task);
        createTask(task).then(() => {
            message.success('Task added!');
            setAlert(true);
            setRefreshing(true)
        })
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id)
        message.warn('Task removed');
        setRefreshing(true)
    }

    const handleToggleTaskStatus = (task) => {
        task.completed = !task.completed;
        updateTask(task)
        setRefreshing(true)
        message.info('Task status updated!');
    }
    
    const refresh = () => {
        loadTasks()
            .then((json) => {
                setLoadTask(json);
                setActiveTasks(json.filter(task => task.completed === false))
                setCompletedTasks(json.filter(task => task.completed === true))
            }).then((console.log('fetch completed')))
    };


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let loadedTasks = await loadTasks();
        setLoadTask(loadedTasks);
        setActiveTasks(loadedTasks.filter(task => task.completed === false))
        setCompletedTasks(loadedTasks.filter(task => task.completed === true))
        console.log(tasks);
        setRefreshing(false);
        console.log("Refreshing state", refreshing);
    }, [refreshing]);

    useEffect(() => {
        console.log("useEffect()");
        refresh();
    }, [onRefresh]);

    return (
        <>
        <Layout className="layout" style={{overFlowX: 'hidden'}}>
            <Content style={{ padding: '0 50px'}}>
                <div className="tasklist">
                    <Row>
                        <Col span={14} offset={5}>
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
        </>
    )
}

export default TaskList