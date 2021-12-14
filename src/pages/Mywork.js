import React from "react";
import Loading from "./Loading";
import StandUpComp from "../components/Standupcomponent";
import { useAppState } from "../AppState";
import TimerContainer from "../components/TimerContainer";

const Mywork = () => {
  const { state } = useAppState();
  const authToken = JSON.parse(window.localStorage.getItem("auth"));

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
    </div>
  );

  return loaded() ? loaded() : <Loading />;
};

export default Mywork;
