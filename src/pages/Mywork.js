import React, { useEffect, useState } from "react";
import {
  createSprintComponent,
  loadSprintComponent,
} from "../services/taskService";

import { DefaultProgresSteps } from "../components/progressSteps/ProgressSteps";
import Loading from "./Loading";
import StandUpComp from "../components/SlideDashboard";
import TaskList from "../components/TaskList";
import TimerContainer from "../components/TimerContainer";
import { useAppState } from "../AppState";

// src / components / progressSteps / ProgressSteps.jsx;

const Mywork = () => {
  const { state } = useAppState();
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
  const baseUrl = process.env.REACT_APP_DEV_API_URL;
  const [sprints, setSprints] = useState();

  // const createSprintComponent = async () => {
  //   return fetch(baseUrl + "sprints", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + authToken.token,
  //     },
  //     body: JSON.stringify({
  //       name: "sprints component",
  //       objective: "to create a sprints component",
  //     }),
  //   }).then((res) => console.log("res", res));
  // };

  // const loadSprintComponent = async () => {
  //   return await fetch(baseUrl + "sprints", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + authToken.token,
  //     },
  //   }).then((data) => {
  //     console.log("data", data);
  //     console.log("data json", data.json());
  //     setSprints(data);
  //   });
  // };
  const createTask = () => {
    return createSprintComponent();
  };
  const refresh = async () => {
    await loadSprintComponent().then((res) => {
      console.log("res:", res);
      if (res.length > 0) {
        // dispatch({ type: "getTasks", payload: res });
        // // let sortTaskById = res.sort((a, b) => (a.id < b.id) ? 1 : -1)
        // let sortTaskById = res.sort((a, b) => (a.order < b.order ? -1 : 1));
        // setActiveTasks(
        //   sortTaskById.filter((parsedTask) => parsedTask.completed === false)
        // );
        // setCompletedTasks(
        //   sortTaskById.filter((parsedTask) => parsedTask.completed === true)
        // );
        // setLoadTask(
        //   sortTaskById
        //     .filter((parsedTask) => parsedTask.completed === true)
        //     .concat(res.filter((parsedTask) => parsedTask.completed === false))
        // );
        setSprints(res);
      } else {
        console.log("not okay res", res);
      }
    });
  };

  const loaded = () => (
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
              ? state.name + "'s Sprints"
              : authToken.name + "Sprints"}
          </div>
          <div style={{ position: "relative", top: "-20px", left: "75%" }}>
            <TimerContainer />
          </div>
        </div>
      </div>
      <div className="standup-section">
        {/* <StandUpComp tasks={state.alltasks} /> */}
        <div id="menu-banner" className="trackList">
          <div className="dummy-side-panel"></div>
          <div className="tasklist ">
            <DefaultProgresSteps />
          </div>
        </div>
      </div>
      {/* <TaskList /> */}

      {/* {sprints &&
        sprints.map((sprint) => {
          console.log(sprints);
          return <h1 key={sprint.id}>{sprint.name}</h1>;
        })} */}
      <TaskList sprints={sprints} />

      <button onClick={() => createTask()}>+</button>
      <button onClick={() => refresh()}>Load Sprint</button>
    </div>
  );

  return loaded() ? loaded() : <Loading />;
};

export default Mywork;
