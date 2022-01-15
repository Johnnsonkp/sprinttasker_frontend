import React from "react";
import { Menu, Dropdown, message, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const TaskSubitems = ({task}) => {
    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    const menu = () => (
        
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                
            </Menu.Item>
        </Menu>
    );

    return (
        <>
        <Space wrap>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            <p className="task-subitems">Comments</p>
            </Dropdown.Button>
        </Space>
        </>
    )
}

export default TaskSubitems