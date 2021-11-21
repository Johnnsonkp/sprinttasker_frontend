import React, {useState} from 'react';
import {Tooltip, Tag, List, Button, Popconfirm, Switch} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import TaskSubitems from './TaskSubitems'
import Descriptions from './Descriptions'
import { Collapse, Space } from 'antd';


const Task = ({task, onTaskRemoval, onTaskToggle}) => {

    const { Panel } = Collapse;
    function callback(key) {
        console.log(key);

    }
    const styles = {
        listRow: {
            width: '100%'
        }
    }

    const menu1 = "testing menu"
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
                <div className="btnwrap">
                    <Space wrap>
                    <Descriptions description={task.description}/>
                    </Space>
                </div>
                <div className="subitem-wrap">
                    <TaskSubitems menu1={menu1}/>
                </div>  
            </div>
        </List.Item>
    )
}

export default Task;