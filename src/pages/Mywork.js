import React from "react";
import Loading from "./Loading";
import StandUpComp from "../components/Standupcomponent";
import { useAppState } from "../AppState";
import TimerContainer from "../components/TimerContainer";
import TaskList from "../components/TaskList";

const Mywork = () => {
  const { state } = useAppState();
  const authToken = JSON.parse(window.localStorage.getItem("auth"));

  const TaskDisplay = () => {
    console.log("state.alltasks:", state.alltasks);
    // return (
    //   <select>
    //     <option>
    //       {Object.entries(state.alltasks).map(([key, value]) => {
    //         return value;
    //       })}
    //     </option>
    //   </select>
    // );
  };

  const consoleLog = () => {
    return console.log("state.alltasks:", state.alltasks);
  };

  const loaded = () => (
    // <div className="Menu">
    //   <Loading />;
    // </div>

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
              ? state.name + " My Sprints"
              : authToken.name + " My Sprints"}
          </div>
          <div style={{ position: "relative", top: "-20px", left: "75%" }}>
            <TimerContainer />
          </div>
        </div>
      </div>
      <div className="standup-section">
        <StandUpComp tasks={state.alltasks} />
      </div>
      {/* <TaskList /> */}

      <h1>Select a task</h1>
      <TaskList />
    </div>
  );

  return loaded() ? loaded() : <Loading />;
};

export default Mywork;
