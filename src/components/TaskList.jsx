import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import './TaskList.css'
import TaskTab from './TaskTab';
import TaskForm from './TaskForm';
import {createTask, deleteTask, loadTasks, updateTask} from '../services/taskService';
const { TabPane} = Tabs;
const { Content} = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState([]);
    const [completedTasks, setCompletedTasks] = useState();

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
        message.infor('Task status updated!');
    }


}

export default TaskList