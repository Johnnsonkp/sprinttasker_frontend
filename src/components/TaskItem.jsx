import React, {useState} from 'react';
import {Tooltip, Tag, List, Button, Popconfirm, Switch} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import TaskSubitems from './TaskSubitems'

const Task = ({task, onTaskRemoval, onTaskToggle}) => {

    const styles = {
        listRow: {
            width: '100%'
        }
    }
    return (
        <List.Item
            style={styles.listRow}
            actions={[
                <Tooltip
                    name={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTaskToggle(task)}
                        defaultChecked={task.completed}
                    />
                </Tooltip>,
                <Popconfirm
                name={'Are you sure you want to delete?'}
                onConfirm={() => {
                    onTaskRemoval(task);
                }}>

                    <Button className="remove-task-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={task.id}
        >
            <div className="task-item">
                <div className="task-wrap">
                    <Tag className="task-tag">
                        {task.name}
                    </Tag>
                </div>
                <div className="btn-wrap">
                    <Button className="descriptionBtn" type="primary">
                        Description
                    </Button>
                </div>
                <div className="subitem-wrap">
                    <TaskSubitems/>
                </div>  
            </div>
        </List.Item>
    )
}

export default Task;