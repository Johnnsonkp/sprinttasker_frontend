import React, {useState, useEffect} from "react";
import { useAppState } from "../AppState";

import './sidepanel.css'
import { Layout, Menu, message, Divider } from 'antd';
import {
  FormOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UnorderedListOutlined,
  BankOutlined,
  
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import SidePanelTabs from "./SidePanelTabs";
import logo from "../logo.svg";
import { useLocation } from "react-router";



export function SidePanel() {
  const { Header, Content, Sider } = Layout;
  const location = useLocation();
// export class SidePanel extends React.Component {
  const [collapsed, setCollapsed] = useState(true)
  const onCollapse = () => {
    console.log(collapsed);
    return (setCollapsed(!collapsed))
  };
  const sliderSelectedKey = (e) => {
    let workSpaces = {
      1: "/home",
      2: '/main',
      3: '/my_work',
      4: '/notes',
      5: '/stand_up',
      6: '/'
    }
    for (const [key, value] of Object.entries(workSpaces)){
      if(location.pathname === value){
        return key
      }
    }
  }
        
        return (
          <div className="sidePanel">
          <Layout style={{ minHeight: '100vh', minWidth: '300px', position: 'fixed', top: '0px' }}>
            {/* <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}> */}
            <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}>
              <div className="logo" />
              {/* defaultSelectedKeys={['1']} */}
              <Menu theme="dark" defaultSelectedKeys={(e) => sliderSelectedKey(e)} mode="inline" onClick={(e) => console.log(e)}>
                  <Menu.Item key="1" icon={<BankOutlined />} >
                      <Link to="/home">
                          Home
                      </Link>
                  </Menu.Item>
                <Menu.Item key="2" icon={<AppstoreOutlined />}>
                    <Link to="/main">
                        Main WorkSpace
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                    <Link to="/my_work">
                        My Sprints
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FormOutlined />}>
                <Link to="/notes">
                  Notes
                  </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<MessageOutlined />}>
                <Link to="/stand_up">
                        Stand Up
                </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    <Link to="/">
                        Landing Page
                    </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            {collapsed ? 
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>

              {collapsed ?   
                <Link to="/" className="sideNavLogo">
                  <img src={logo} className="App-logo title-logo" alt="logo" />
                  <h3 >TaskSprinter</h3>
                </Link> : <></>
              }
                <Divider />
                
                {collapsed ? 
                <div className="site-layout-background" style={{ padding: 5, minHeight: 360 }}>
                    <div style={{ maxWidth: 150 }}>
                        <SidePanelTabs /> 
                      </div>
                </div>
                :
                <></> 
                }
              </Content>
            </Layout>
              : <></>
            }
          </Layout>
          </div>
        );
      // }
}
    