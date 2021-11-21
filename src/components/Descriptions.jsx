import React from "react";

import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const Descriptions = (props) => {

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
    }
    const customMenuItem = {
        textarea: {
            minWidth: "350px",
            minHeight: "250px",
        }
        
    }

    const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item style={customMenuItem.textarea} size="large" key="1" >
        {props.description}
        </Menu.Item>
    </Menu>
    );

    return (
        <>
        <Space wrap>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu} arrow="true" size="large">
            Description
            </Dropdown.Button>
        </Space>
        </>
    )
}

export default Descriptions