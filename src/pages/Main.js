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
          paddingLeft: "20px",
          paddingRight: "20px",
          maxWidth: "1440px",
          margin: "auto",
        }}
      >
        <div className="menu-banner ant-col-offset-1">
          <textarea
            defaultValue={
              state.name
                ? state.name + " Main WorkSpace"
                : authToken.name + " Main WorkSpace"
            }
            className="rest-title workspace-textfield"
          ></textarea>

          <div style={{ position: "relative", top: "28px" }}>
            {/* <Pomodoro /> */}
            <TimerContainer />
          </div>
        </div>
        <Collapse
          style={{
            marginLeft: "22%",
            // marginRight: "1%",
            background: "#f0f2f5",
          }}
          // bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="Stand Up / Stand Down"
            key="1"
            className="site-collapse-custom-panel"
          >
            <StandUpComp />
          </Panel>
        </Collapse>
        <TaskList />
      </div>
    );
  };
  return <TaskList /> ? loaded() : <Loading />;
  // return state.alltasks ? loaded() : <Loading />;
}
