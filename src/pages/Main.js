import React from "react";
import TaskList from "../components/TaskList";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useAppState } from "../AppState";
import Loading from "./Loading";
import StandUpComp from "../components/Standupcomponent";
import Pomodoro from "../components/Pomodoro";
import TimerContainer from "../components/TimerContainer";

export default function Main(props) {
  const { state } = useAppState();
  const { Panel } = Collapse;
  const authToken = JSON.parse(window.localStorage.getItem("auth"));

  const loaded = () => {
    return (
      <div
        style={{
          paddingLeft: "100px",
          paddingRight: "0px",
          maxWidth: "1500px",
          width: "100%",
          margin: "auto",
        }}
      >
        <div className="menu-banner">
          <div className="rest-title workspace-textfield">
            {state.name
              ? state.name + " Main WorkSpace"
              : authToken.name + " Main WorkSpace"}
          </div>

          <div style={{ position: "relative", top: "28px" }}>
            <TimerContainer />
          </div>
        </div>
        <div className="standup-section">
          <StandUpComp />
        </div>
        <TaskList />
      </div>
    );
  };
  return <TaskList /> ? loaded() : <Loading />;
  // return state.alltasks ? loaded() : <Loading />;
}
