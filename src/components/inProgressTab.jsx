import React from 'react';
import {List} from 'antd';
import TaskItem from './TaskItem';
import { useAppState } from "../AppState";


const InProgressTab = ({ onTaskRemoval, onTaskToggle}) => {
    const {state, dispatch} = useAppState()
    let arr = 
    [
        state.selectedTask 
    ]

    let defaultArr = [{test: "test name", testindex: "text Index"}]
    return (
    <>  
        { state.selectedTask ? 
        <List 
            locale={{ emptyText: "There's nothing to do"}}
            dataSource={arr || []}
            renderItem={(task, i) => (
                <TaskItem 
                    task={task}
                    onTaskToggle={onTaskToggle}
                    onTaskRemoval={onTaskRemoval}
                />
            )}
            pagination={{
                position: "bottom",
                pageSize: 2,
            }}
        /> : null
        }
    </>
    )
}

export default InProgressTab;