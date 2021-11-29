import React from "react";
import {Link} from "react-router-dom";
import {DatabaseOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';


export default function SidePanelTabs(){
    const { Sider } = Layout;
    return (
        <div className="sidePanelTab">
          <Sider style={{ maxWidth: 180, marginTop: "20px" }}>
              <div className="logo" />
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DatabaseOutlined />}>
                    <Link to="/my_work">
                        Board 1
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DatabaseOutlined />}>
                    <Link to="/main">
                        Board 2
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DatabaseOutlined />}>
                    <Link to="/my_work">
                        Board 3
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<DatabaseOutlined />}>
                    <Link to="/main">
                        Board 4
                    </Link>
                </Menu.Item>
                </Menu>
            </Sider>
        </div>
    );
}