import React, { useEffect } from "react";
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
    <div
      style={{
        paddingLeft: "100px",
        paddingRight: "0px",
        maxWidth: "1500px",
        width: "100%",
        margin: "auto",
      }}
    >
      <div id="menu-banner" className="trackList ">
        <div className="dummy-side-panel"></div>
        <div className="tasklist ">
          <div className="rest-title workspace-textfield">
            {state.name
              ? state.name + " Main WorkSpace"
              : authToken.name + " Main WorkSpace"}
          </div>
          <div style={{ position: "relative", top: "-20px", left: "75%" }}>
            <TimerContainer />
          </div>
        </div>
      </div>
      <div className="standup-section">
        <StandUpComp tasks={state.alltasks} />
      </div>
      <TaskList />
    </div>;
  };
  // const preLoaded = () => {
  //   return (
  //     const timer = setTimeout(() => {
  //       loaded();
  //     }, [3000]);
  //   )
  // };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     preLoaded();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return <TaskList /> ? loaded() : <Loading />;
  // return state.alltasks ? loaded() : <Loading />;
  // return loaded();
}
