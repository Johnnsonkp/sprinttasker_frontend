import {List} from 'antd';
import React from 'react';
import TaskItem from './TaskItem';

const TaskTab = ({tasks, onTaskRemoval, onTaskToggle, inProgress, updateTimer, updateTask, createTask}) => {
    return (
    <>  
        <List 
            locale={{ emptyText: "There's nothing to do"}}
            dataSource={tasks}
            renderItem={(task, i) => (
                <TaskItem 
                    key={task.id}
                    task_id={task.id}
                    task={task}
                    createTask={createTask}
                    // inProgress={inProgress}
                    onTaskToggle={onTaskToggle}
                    onTaskRemoval={onTaskRemoval}
                    updateTimer={updateTimer}
                    updateTask={updateTask}
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