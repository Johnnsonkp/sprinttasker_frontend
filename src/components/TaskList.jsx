import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import './TaskList.css'
import TaskTab from './TaskTab';
import TaskForm from './TaskForm';
import { useAppState } from '../AppState';
import {createTask, deleteTask, updateTask, LoadTasks} from '../services/taskService';
const { TabPane} = Tabs;
const { Content} = Layout;


const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState();
    const { state, dispatch } = useAppState();
    const { token, alltasks, user, usertasks } = state;

    // const getTask = (id) => {
    //     return fetch(state.url + id).then((res) => res.json());
    // };

    // const createTask = (task) => {
    //     return fetch(state.url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         name: task.name,
    //         completed: task.completed,
    //       }),
    //     }).then((res) => res.json());
    // };

    // const updateTask = (task) => {
    //     return fetch(state.url + task.id, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         id: task.id,
    //         name: task.name,
    //         completed: task.completed,
    //       }),
    //     }).then((res) => res.json());
    //   };
      
    // const deleteTask = (id) => {
    // return fetch(state.url + id, {
    //     method: "DELETE",
    // }).then((res) => res.json());
    // };


    const handleFormSubmit = (task) => {
        console.log('task to create', task);
        createTask(task).then(onRefresh());
        message.success('Task added!');
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh());
        message.warn('Task removed');
    }

    const handleToggleTaskStatus = (task) => {
        task.completed = !task.completed;
        updateTask(task).then(onRefresh());
        message.info('Task status updated!');
    }
    // const LoadTasks = async () => {
    //     const response = await fetch(state.url + "/tasks/", {
    //         method: "GET",
    //         headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + state.token,
    //         },
    //    }).then((res) => console.log("LoadTasks res:", res))
    // }

    const refresh = async () => {
        const response = await fetch(state.url + "/tasks/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + state.token,
            },
        }).then((res) => res.json())
        .then((res) => {
            console.log("LoadTasks res:", res)
            dispatch({ type: "getTasks", payload: { alltasks: res },});
            console.log("state.alltasks:", state.alltasks)
            setTasks(res)
            setActiveTasks(res.filter(json => json.completed === false))
            setCompletedTasks(res.filter(json => json.completed === true))
        }).then(console.log('fetch completed'));

        // LoadTasks(token).then((res) => {
        //     console.log("LoadTasks res:", res)
        //     setTasks(res)
            // setTasks(res)
            // setActiveTasks(res.filter(json => json.completed === false))
            // setCompletedTasks(res.filter(json => json.completed === true))
            
            
        // })
        // const updatedTask = tasks
        // dispatch({ type: "getTasks", payload: tasks });
    }

    const onRefresh = useCallback( async () => {
        setRefreshing(true)
        // let data = await LoadTasks();
        // let data = await refresh();
        setTasks(state.alltasks);
        // setTasks(state.alltasks);
        setActiveTasks(state.alltasks.filter(task => task.completed === false))
        setCompletedTasks(state.alltasks.filter(task => task.completed === true))
        setRefreshing(false);
        console.log('Refreshing state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px'}}>
                <div className="tasklist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Task Lists</h1>
                            <TaskForm onFormSubmit={handleFormSubmit} />
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
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>

        </Layout>
    )
}

export default TaskList