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

    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const size = {
        size: 'Large'
    }

    const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="1"><Link className="inner-nav" to="/about">About</Link></Menu.Item>
          <Menu.Item key="2"><Link className="inner-nav" to="/developer">Developers Guide</Link></Menu.Item>
        </Menu>
    );

    const style = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textDecoration: "none",
        color: "#fff",
    };
    const divBtn = {
      cursor: "pointer"
    }
      return (
        <header>
          <div className="header-container">
            <div className="TitleBox">
              <Link style={style} to="/">
                <img src={logo} className="App-logo title-logo" alt="logo" />
                <h3>TaskSprinter</h3>
              </Link>
            </div>
            <div className="drop-down">
              <nav>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link nav-item" onClick={e => e.preventDefault()}>
                    About <DownOutlined />
                    </a>
                </Dropdown>
                <div className="nav-auth">
                    {!state.token ? <> <Link to="/auth/login">Log In</Link> </> : 
                      <>
                        <div style={divBtn} to="/" onClick={() => {
                          dispatch({type: "logout"})
                          navigate("/")
                        }}>Log Out</div>
                      </>
                    }
                    <>
                    <Link to="/main">main</Link> 
                    <br/>
                    <Link to="/my_work">my_work</Link> 
                    </>
                </div>
              </nav>
            </div>
            <Button type="primary" shape="round" size={size}>
                <Link className="inner-nav" to="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </header>
      );
}