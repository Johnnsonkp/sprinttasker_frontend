import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import './TaskList.css'
import TaskTab from './TaskTab';
import TaskForm from './TaskForm';
import { useAppState } from '../AppState';
import axios from "axios";
import {postTask, destroy, update, getTask} from '../services/taskService';
const { TabPane} = Tabs;
const { Content} = Layout;


const TaskList = (auth) => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState();
    const { state, dispatch } = useAppState();
    const { token, alltasks, user, usertasks } = state;
    const [fetchedTasks, setFetchedTasks] = React.useState(null);



    const createTask = (task) => {
        return postTask(task)
    };

    const updateTask = (task) => {
        return update(task)
    };
      
    const deleteTask = (id) => {
        return destroy(id)
    };

    const LoadTasks = async () => {
        console.log("LoadTasks Tasklist");
      return getTask()
    }

    const refresh = async () => {
        return getTask()
    }
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
    const onRefresh = useCallback( async () => {
        setRefreshing(true)
        let data = await LoadTasks();
        setTasks(data.reverse())
        console.log("refresh data", data)
        setActiveTasks(data.reverse().filter(task => task.completed === false))
        setCompletedTasks(data.reverse().filter(task => task.completed === true))
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
                            {/* <h1>Task Lists</h1> */}
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