import '../App.css';

import { Avatar, Breadcrumb, Dropdown, Menu, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";

import { DownOutlined } from '@ant-design/icons';
import Preload from '../utilities/Preload'
import React from "react";
import Wave from "../utilities/wave";
import logo from "../logo.svg";
import {useAppState} from '../AppState'
import { useLocation } from "react-router";

// export default function Nav(props) {
const Nav = () => {
  const {dispatch, state} = useAppState()
  const navigate = useNavigate();
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const location = useLocation();
  let workMode = state.work_mode

  const styles = {
    signUp: {
      cursor: "pointer",
      textDecoration: "none",
      lineHeight: "normal",
      transition: "all 0.15s ease-in-out 0s",
      alignItems: "center",
      border: "2px solid rgb(255, 255, 255)",
      borderRadius: "4px",
      color: "rgb(255, 255, 255)",
      display: "flex",
      fontSize: "16px",
      fontWeight: "700",
      padding: "0.5em 1.125em",
      whiteSpace: "nowrap",
      background: "none",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      boxSizing: "inherit"
    },
    menuDark: {
      color: "#fff",
      fontWeight: "bolder",
      cursor: "pointer"
    },
    header: {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 5,
      color: "#fff",
      fontWeight: "bolder"
    },
    links: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      textDecoration: "none",
      color: "#fff"
    },
    hide: {
      display: "none"
    }
  }
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="1"><Link className="inner-nav" to="/about">About</Link></Menu.Item>
          <Menu.Item key="2"><Link  className="inner-nav" to="/developer">Developers Guide</Link></Menu.Item>
        </Menu>
    );
    const DropDownMenu = () => {
      return (
        <Dropdown overlay={menu}>
          <a style={styles.menuDark} className="ant-dropdown-link nav-item" onClick={(e) => e.preventDefault()}>
          About <DownOutlined />
          </a>
        </Dropdown>
      )
    }
    const AuthBtn = () => {
      return (
        <div style={styles.signUp}>
          {auth ? 
            <Link style={styles.menuDark} to="/auth/signup">Account</Link> :
            <Link  style={styles.menuDark} to="/auth/signup">Get Started</Link>
          }
        </div>
      )
    }
    const LoginLogout = () => {
      return (
        <>
          {!state.token ? <> <Link style={styles.menuDark} to="/auth/login">Log In</Link> </> : 
            
              <div style={styles.menuDark} 
              onClick={(e) => {
                dispatch({type: "logout"})
                alert(e.target.innerText)
                navigate("/")
              }}>Log Out</div>
            
          }
        </>
      )
    }
    const BreadCrumb = () => {
      const auth = JSON.parse(window.localStorage.getItem("auth"));
      const userFirstInitials = auth.name[0].toUpperCase();

      return (
        <div className="BreadCrumb" 
            style={{height: '30px', width: '100%', position: 'sticky', top: '0px', textAlign: 'right', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#323439', color: '#fff', zIndex: '1', overflow: 'hidden', margintop: 'auto', marginBottom: 'auto'}} 
            >
         

           <div style={{position: 'sticky', height: '100%',margintop: 'auto', marginBottom: 'auto'}}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item style={{color: '#fff', marginRight: '-10px', margintop: 'auto', marginBottom: 'auto', fontWeight: 'bolder'}}>Hi, {state.name}</Breadcrumb.Item>
              <Breadcrumb.Item >
                <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle",
                      margin: 'auto',
                      marginRight: '10px'
                  
                    }}
                    size={23}
                    gap={3}
                  >
                  {userFirstInitials}
              </Avatar>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div> 
        </div>
      );
    }

    const NavComponent = () => {

      return (
        <>
        {location.pathname === "/" || location.pathname == "/auth/login" || location.pathname == "/auth/signup"  ? <></> :<BreadCrumb />}
        {location.pathname === "/" || location.pathname === "/about" || location.pathname  === "/developer" || location.pathname == "/auth/login" || location.pathname == "/auth/signup" ?  
          <header style={styles.header}>
            <div className="header-container">
              <div className="TitleBox">
                <Link style={styles.links} to="/">
                  <img src={logo} className="App-logo title-logo" alt="logo" />
                  <h3 style={styles.menuDark}>TaskSprinter</h3>
                </Link>
              </div>
              <div className="drop-down">
                <nav>
                  <DropDownMenu />
                  <div  className="nav-auth">
                    <LoginLogout />
                  </div>
                </nav>
              </div>
              <AuthBtn/>
            </div>
          </header> : null
        }
        </>
      );
    }

    // return NavComponent() 
    return <Preload timeoutLengthInSeconds={400} handleFunction={NavComponent()} />;
    // return NavComponent()
}

export default Nav;