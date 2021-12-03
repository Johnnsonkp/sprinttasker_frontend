import React from "react";
import {Link} from "react-router-dom";
import {DatabaseOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { SingleNote } from "../components/SingleNote";
import { useNavigate } from "react-router";
import { useAppState } from '../AppState';


export default function SidePanelTabs({notes}){
    const { Sider } = Layout;
    const Navigate = useNavigate()
    const {state, dispatch} = useAppState()

    const notesSidePanelTabs = ({note}) => {

      const selectedNote = (note) => {
        console.log("selected note:", note)
        dispatch({ type: "selectedNote", payload: note})

        if(state.selectedNote){
          Navigate('/single-note')
        }
      }

      return (
        <Sider style={{ maxWidth: 180, marginTop: "20px" }}>
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
      )

    }
    return (
        <div className="sidePanelTab">
          {notes ? notesSidePanelTabs({notes}) : defaultSidePanelTabs()}
        </div>
    );
}