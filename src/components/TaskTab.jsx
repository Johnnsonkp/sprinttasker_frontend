import React from 'react';
import {List} from 'antd';
import TaskItem from './TaskItem';
import { useAppState } from "../AppState";

const TaskTab = ({tasks, onTaskRemoval, onTaskToggle, inProgress}) => {
    const {state, dispatch} = useAppState()
    return (
    <>  
        <List 
            locale={{ emptyText: "There's nothing to do"}}
            dataSource={tasks}
            renderItem={(task, i) => (
                <TaskItem 
                    task={task}
                    inProgress={inProgress}
                    onTaskToggle={onTaskToggle}
                    onTaskRemoval={onTaskRemoval}
                />
            )}
            pagination={{
                position: "bottom",
                pageSize: 13,
            }}
        />  
    </>
    )
}

export default TaskTab;