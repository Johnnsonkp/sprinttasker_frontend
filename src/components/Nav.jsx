import React from "react";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';
import logo from "../logo.svg";
import { Menu, Dropdown, message, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useAppState} from '../AppState'

export default function Nav(props) {
  const {dispatch, state} = useAppState()
  const navigate = useNavigate();
  const auth = JSON.parse(window.localStorage.getItem("auth"));
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
      color: "#fff",
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
          <a style={styles.menuDark} className="ant-dropdown-link nav-item" onClick={e => e.preventDefault()}>
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
            <>
              <div style={styles.menuDark} to="/" onClick={() => {
                dispatch({type: "logout"})
                navigate("/")
              }}>Log Out</div>
            </>
          }
        </>
      )
    }
    return (
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
      </header>
    );
}