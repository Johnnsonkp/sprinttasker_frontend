import React, {useState} from "react";
import { useAppState } from "../AppState";
import notion from "../notion-logo-1.svg";
import './sidepanel.css'
import { Layout, Menu, Divider, Avatar } from 'antd';
import {
  FormOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UnorderedListOutlined,
  BankOutlined,
  PoweroffOutlined,
  FileExcelOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import {Link, useNavigate, Redirect} from "react-router-dom";
import SidePanelTabs from "./SidePanelTabs";
import logo from "../logo.svg";
import { useLocation } from "react-router";
import { LogoBlock } from "../components/LogoBlock";
// import { Redirect } from "react-router-dom";

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
            { location.pathname !== '/data' ?
          <Layout style={{ minHeight: '100vh', minWidth: '300px', position: 'fixed', top: '0px', zIndex: '1' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse()}>
              <div className="logo" />
              {/* defaultSelectedKeys={['1']} */}
              <Menu theme="dark" defaultSelectedKeys={(e) => sliderSelectedKey(e)} mode="inline" >
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
                <Menu.Item key="5" icon={<CalendarOutlined />}>
                <Link to="/calendar">
                        Calendar
                </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<MessageOutlined />}>
                <Link to="/stand_up">
                        Stand Up
                </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<FileExcelOutlined />}>
                <Link to="/data">
                        Data
                </Link>
                </Menu.Item>
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
                    bottom: '8vh',
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
                  <img src={logo} className="App-logo title-logo" alt="logo" />
                  <h3 >TaskSprinter</h3>
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

                <Footer style={{backgroundColor: '#323439', position: "relative", left: '0px', padding: '0px', width: '65%'}}>
                  <div 
                    style={{
                      display: 'flex', 
                      justifyContent: 'space-around', 
                      alignItems: 'center',
                      color: '#fff',
                      width: '90%',
                      fontSize: '16px', 
                      cursor: 'pointer',
                      // border: '1px solid rgba(248, 72, 74, 0.48)',
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
      // }
}
    