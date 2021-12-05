import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, message} from 'antd';
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

    const createTask = (task) => {
        return postTask(task)
    };

    const updateTask = (task) => {
        return update(task).then(setRefreshing(!refreshing))
    };
      
    const deleteTask = (id) => {
        return destroy(id)
    };

    const handleFormSubmit = (task) => {
        console.log('task to create', task);
        createTask(task).then(() => {
            message.success('Task added!');
            setRefreshing(!refreshing)
        })
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id)
        message.warn('Task removed');
        setRefreshing(!refreshing)
    }

    const handleToggleTaskStatus = (task) => {
        task.completed = !task.completed;
        updateTask(task)
        setRefreshing(!refreshing)
        message.info('Task status updated!');
    }
    
    const refresh = async () => {
        loadTasks()
            .then((json) => json.filter(parsedTask => parsedTask.user_id === state.user_id))
            .then((parsedTask) =>  {
                console.log('task',parsedTask)
                setLoadTask(parsedTask)
                setActiveTasks(parsedTask.filter(task => task.completed === true))
                setCompletedTasks(parsedTask.filter(task => task.completed === true))
                setRefreshing(!refreshing)
                dispatch({ type: 'getTasks', payload: parsedTask})
            })
    };


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        console.log("useCallback", "useCallback")
        let loadedTasks = await refresh()
        console.log("loadedTasks", loadedTasks)
        setLoadTask(loadedTasks);
        setActiveTasks(loadedTasks.filter(task => task.completed === false))
        setCompletedTasks(loadedTasks.filter(task => task.completed === true))
        console.log(tasks);
        setRefreshing(false);
        console.log("Refreshing state", refreshing);
    }, [refreshing]);

    // useEffect(() => {
    //     console.log("useEffect()");
    //     setRefreshing(true)
    //     refresh();
    // }, [onRefresh]);

    useEffect(() => {
        console.log("useEffect()");
        setRefreshing(false)
        refresh();
    }, [onRefresh]);

    const loaded = () => {
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

    // return tasks ? loaded() : <Loading />
    return loaded() 
}

export default TaskList