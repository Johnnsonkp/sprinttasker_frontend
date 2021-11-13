import React, {useEffect} from 'react';
import {Tabs, Layout, Row, Col, List} from 'antd';
import TaskItem from '.TaskItem';

const TaskTab = ({Tasks, onTaskRemoval, onTaskToggle}) => {
    return (
        <>
        <List 
            local={{ emptyText: "There's nothing to do :(",}}
            dataSource={tasks}
            renderItem={(task) => {
                <TaskItem 
                    task={task}
                    onTaskToggle={onTaskToggle}
                    onTodoRemoval={onTodoRemoval}
                />
            }}
            pagination={{
                position: "bottom",
                pageSie: 10,
            }}
            />
        </>
    )
}

export default TaskTab;