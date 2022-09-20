import Preload from "../utilities/Preload";
import React from "react";
import StandUpComp from "../components/slideDashboard/SlideDashboard.jsx";
// import TaskList from "../components/TaskList";
import TaskList from "../components/tasklist/TaskList";
import { WorkSpaceHeader } from "../components/workspaceHeader/WorkspaceHeader";
import { useAppState } from "../AppState";
import { useWindowSize } from "../utilities/utilFunctions";

export default function Main(props) {
  const { state } = useAppState();
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
  const size = useWindowSize();

  const loaded = () => {
    return (
      <div
        id="main"
        style={{
          paddingLeft: "100px",
          paddingRight: "0px",
          maxWidth: "1500px",
          width: "100%",
          margin: "auto",
          transition: "all 5s easeInOut",
          transform:
            size.width > 1400
              ? null
              : size.width < 1200
              ? "scaleX(0.75)"
              : "scaleX(0.9)",
        }}
      >
        <WorkSpaceHeader title={"Main WorkSpace"} />
        <div className="standup-section">
          <StandUpComp tasks={state.alltasks} />
        </div>
        <TaskList />
      </div>
    );
  };
  return <Preload timeoutLengthInSeconds={2000} handleFunction={loaded()} />;
}
