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
    console.log("arr", arr)
    return (
    <>  
        { state.work_mode ?
            <List 
                locale={{ emptyText: "There's nothing to do"}}
                dataSource={arr}
                renderItem={(task, i) => (
                    <TaskItem 
                        task={task}
                        onTaskToggle={onTaskToggle}
                        onTaskRemoval={onTaskRemoval}
                    />
                )}
                pagination={{
                    position: "bottom",
                    pageSize: 13,
                }}
            />  : 
            <List 
                locale={{ emptyText: "No task in progress"}}
                pagination={{
                    position: "bottom",
                    pageSize: 13,
                }}
            />
        }
    </>
    )
}

export default InProgressTab;