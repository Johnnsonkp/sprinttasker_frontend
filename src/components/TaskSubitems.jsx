import React from "react";

import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const TaskSubitems = (props) => {

    function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
    }

    function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
    }

    const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
        {props.menu1}
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
        </Menu.Item>
    </Menu>
    );

    return (
        <>
        <Space wrap>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            Subitems
            </Dropdown.Button>
        </Space>
        </>
    )
}

export default TaskSubitems