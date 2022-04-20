import './sidepanel.css'

import {
  AppstoreOutlined,
  BankOutlined,
  CalendarOutlined,
  FileExcelOutlined,
  FormOutlined,
  MessageOutlined,
  PoweroffOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Avatar, Divider, Layout, Menu } from 'antd';
import {Link, Redirect, useNavigate} from "react-router-dom";
import React, {useState} from "react";

import { LogoBlock } from "../components/LogoBlock";
import SidePanelTabs from "./SidePanelTabs";
import logo from "../logo.svg";
import notion from "../notion-logo-1.svg";
import { useAppState } from "../AppState";
import { useEffect } from 'react';
import { useLocation } from "react-router";

export function SidePanel({notes}) {
  const {dispatch} = useAppState()
  const navigate = useNavigate();
  const { Header, Content, Sider, Footer } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true)
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const userFirstInitials = auth.name[0].toUpperCase();
  const userName = auth.name.toUpperCase();

  const onCollapse = () => {
    console.log(collapsed);
    // return (setCollapsed(!collapsed))
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
  useEffect(() => {
      console.log('location.pathname', location.pathname)
      console.log('window.location.pathname', window.location.pathname)
  }, [window.location.pathname])

        
        return (
          <div className="sidePanel">
            { location.pathname !== '/data' ?
          <Layout style={{ minHeight: '100vh', minWidth: '300px', position: 'fixed', top: '31px', zIndex: '1' }}>
            {/* <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}> */}
            <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}>
              <div className="logo" />
              {/* defaultSelectedKeys={['1']} */}
              <Menu theme="dark" defaultSelectedKeys={(e) => sliderSelectedKey(e)} mode="inline" selectedKeys={location.pathname}>
                  <Menu.Item key="/home" icon={<BankOutlined />} >
                      <Link to="/home">
                          Home
                      </Link>
                  </Menu.Item>
                <Menu.Item key="/main" icon={<AppstoreOutlined />}>
                    <Link to="/main">
                        Main WorkSpace
                    </Link>
                </Menu.Item>
                <Menu.Item key="/my_work" icon={<UnorderedListOutlined />}>
                    <Link to="/my_work">
                        My Sprints
                    </Link>
                </Menu.Item>
                <Menu.Item key="/notes" icon={<FormOutlined />}>
                <Link to="/notes">
                  Notes
                  </Link>
                </Menu.Item>
                <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
                <Link to="/calendar">
                        Calendar
                </Link>
                </Menu.Item>
                {/* <Menu.Item key="6" icon={<MessageOutlined />}>
                <Link to="/stand_up">
                        Stand Up
                </Link>
                </Menu.Item> */}
                {/* <Menu.Item key="7" icon={<FileExcelOutlined />}>
                <Link to="/data">
                        Data
                </Link>
                </Menu.Item> */}
                <Menu.Item key="8" icon={<AppstoreOutlined />}>
                    <Link to="/">
                        Landing Page
                    </Link>
                </Menu.Item>
                <Menu.Item key="9" >
                  <LogoBlock
                    backgroundColor={"transparent"}
                    iconWidth={"30px"}
                    iconBorder={"1px solid transparent"}
                    firstLogo={notion}
                  />
                    <Link to="#" onClick={() => {
                      return window.location.href = 'https://www.notion.so/Main-Workspace-7defe116a35c4356a86d9924b417779b'
                    }} >
                        Notion
                    </Link>
              </Menu.Item>
              </Menu>
              <div>
              
              <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    verticalAlign: "middle",
                    margin: 'auto',
                    marginLeft: "11px",
                    marginRight: "10px",
                    position: 'absolute',
                    bottom: '12vh',
                    left: collapsed ? '0vw' : '4.8vw' 
                  }}
                  size={collapsed ? 40 : 45 }
                  gap={2}
                >
                  {collapsed ? userFirstInitials : userName }
                </Avatar>
              </div>
            </Sider>
            {collapsed ? 
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>

              {collapsed ?   
                <Link to="/" className="sideNavLogo">
                  <img src={logo} className="App-logo title-logo" alt="logo"/>
                  <h3 style={{ marginLeft: '0px', marginRight: '-40px', position: 'absolute'}}>TaskSprinter</h3>
                </Link> : <></>
              }
                <Divider />
                {collapsed ? 
                <div className="site-layout-background" style={{ padding: 5, minHeight: 360 }}>
                    <div style={{ maxWidth: 150 }}>
                        <SidePanelTabs notes={notes}/> 
                      </div>
                </div>
                :
                <></> 
                }

                <Footer 
                  style={{
                    backgroundColor: '#323439', 
                    position: "relative", 
                    left: '0px', 
                    padding: '0px', 
                    width: '65%',
                    bottom: '30px'
                  }}>
                  <div 
                    style={{
                      display: 'flex', 
                      justifyContent: 'space-around', 
                      alignItems: 'center',
                      color: '#fff',
                      width: '85%',
                      height: '37px',
                      fontSize: '16px', 
                      cursor: 'pointer',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: '18px',
                      backgroundColor: 'rgb(248 72 74 / 48%)'
                    }}
                    className="logoutBtn"
                    onClick={() => {
                    dispatch({type: "logout"})
                    navigate("/")
                  }}><PoweroffOutlined /><span>Log Out</span>
                  </div>
                </Footer>
              </Content> 
            </Layout>
              : <></>
            }
          </Layout>: null
          }
          </div>
        );
}
    