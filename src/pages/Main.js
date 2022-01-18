import React from "react";
import TaskList from "../components/TaskList";
import { useAppState } from "../AppState";
import StandUpComp from "../components/SlideDashboard";
import TimerContainer from "../components/TimerContainer";
import Preload from "../utilities/Preload";

export default function Main(props) {
  const { state } = useAppState();
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
          transition: "all 5s easeInOut",
        }}
      >
        <div id="menu-banner" className="trackList ">
          <div className="dummy-side-panel"></div>
          <div className="tasklist ">
            <div className="rest-title workspace-textfield">Main WorkSpace</div>
            <div style={{ position: "relative", top: "-20px", left: "75%" }}>
              <TimerContainer />
            </div>
          </div>
        </div>
        <div className="standup-section">
          <StandUpComp tasks={state.alltasks} />
        </div>
        <TaskList />
      </div>
    );
  };
  return <Preload timeoutLengthInSeconds={600} handleFunction={loaded()} />;
  // return loaded();
}
