import { Layout, Menu } from 'antd';

import {DatabaseOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import React from "react";
import { useAppState } from '../AppState';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

export default function SidePanelTabs({notes}){
    const { Sider } = Layout;
    const Navigate = useNavigate()
    const {state, dispatch} = useAppState()
    const location = useLocation();

    const notesSidePanelTabs = ({note}) => {

      const selectedNote = (note) => {
        console.log("selected note:", note)
        dispatch({ type: "selectedNote", payload: note})

        if(state.selectedNote){
          Navigate('/single-note')
        }
      }

      return (
        <Sider style={{ maxWidth: 180, marginTop: "5px" }}>
              <div className="logo" />
              <Menu theme="light" defaultSelectedKeys={['0']} mode="inline">
                  <Menu.Item key={0} icon={<DatabaseOutlined />}>
                        <Link to="/notes">
                          All Notes
                        </Link>
                  </Menu.Item>
                {notes.map((note) => (
                  <Menu.Item key={note.id} icon={<DatabaseOutlined />} onClick={() => selectedNote(note)}>
                          {note.title}
                  </Menu.Item>
                ))}
                </Menu>
        </Sider>
      )
    }
    const defaultSidePanelTabs = () => {
      return (
        <Sider style={{ maxWidth: 180, marginTop: "20px" }}>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DatabaseOutlined />}>
                {location.pathname === "/main" || location.pathname ===  "/my_work" ? <Link to="/completed-tasks">Task History</Link> : 
                location.pathname === "/home"? <Link to="/calendar">Calendar</Link> : "Board 1"
                }
            </Menu.Item>
            <Menu.Item key="2" icon={<DatabaseOutlined />}>
              {location.pathname === "/main" || location.pathname ===  "/my_work" ? <Link to="/countdown-timer">Countdown Timer</Link> : 
               location.pathname === "/home"? <Link to="/main">Projects</Link> : "Board 2"
              }
            </Menu.Item>
            <Menu.Item key="3" icon={<DatabaseOutlined />}>
              {location.pathname === "/main" || location.pathname ===  "/my_work" ? <Link to="/standup">Stand Up - Stand Down</Link> : 
                location.pathname === "/home"? <Link to="/notes">Notes</Link> : "Board 3"
              }
            </Menu.Item>
            {location.pathname === "/home"? null :
            <Menu.Item key="4" icon={<DatabaseOutlined />}>
              {location.pathname === "/main" || location.pathname ===  "/my_work" ? <Link to="/task-cards">Task Cards</Link> : "Board 4"}
            </Menu.Item>
            }
            </Menu>
        </Sider>
      )

    }
    return (
        <div className="sidePanelTab">
          {notes ? notesSidePanelTabs({notes}) : defaultSidePanelTabs()}
        </div>
    );
}