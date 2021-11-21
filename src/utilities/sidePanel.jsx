import React from "react";
import './sidepanel.css'
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Space, Tooltip } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
  FormOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import SidePanelTabs from "./SidePanelTabs";
import { useAppState } from '../AppState';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { state, dispatch } = useAppState();
const auth = JSON.parse(window.localStorage.getItem("auth"))

export class SidePanel extends React.Component {
  
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }


    render() {
        const { collapsed } = this.state;
        console.log("this.state", this.state)
        return (
          <Layout style={{ minHeight: '100vh', minWidth: '350px', position: 'fixed' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<AppstoreOutlined />}>
                    <Link to="/main">
                        Main WorkSpace
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                    <Link to="/my_work">
                        My Sprints
                    </Link>
                </Menu.Item>
                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu> */}
                <Menu.Item key="9" icon={<FormOutlined />}>
                <Link to="/notes">
                  Notes
                  </Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<MessageOutlined />}>
                <Link to="/stand_up">
                        Stand Up
                </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>{auth ? auth.name : null}</Breadcrumb.Item>
                </Breadcrumb>
                
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <div style={{ maxWidth: 150 }}>
                      <SidePanelTabs />
                    </div>
                </div>
                {/* <div style={{ maxWidth: 150 }}>
                    <SidePanelTabs />
                  </div> */}
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
          </Layout>
        );
      }
}
    
