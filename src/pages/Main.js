import React, { useState } from "react";
import TaskList from "../components/TaskList";
import { message, Button, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TaskForm from "../components/TaskForm";
import { useAppState } from "../AppState";
import { postTask } from "../services/taskService";
import Loading from "./Loading";
import StandUpComp from "../components/Standupcomponent";
import Pomodoro from "../components/Pomodoro";

export default function Main(props) {
  const [refreshing, setRefreshing] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { state, dispatch } = useAppState();
  const { token, alltasks, user, usertasks } = state;
  const { Panel } = Collapse;

  const textArea = (event) => {
    console.log(event.target.value);
  };

  const createTask = (task) => {
    return postTask(task);
  };

  const handleFormSubmit = (task) => {
    console.log("task to create", task);
    createTask(task).then(() => {
      message.success("Task added!");
      setRefreshing(true);
    });
  };

  const loaded = () => {
    return (
      <div>
        <div className="menu-banner ant-col-offset-1">
          <textarea
            value={state.name + " Main WorkSpace"}
            onChange={textArea}
            className="rest-title workspace-textfield"
          ></textarea>

          <div style={{ width: "50%" }}>
            <Pomodoro />
          </div>
        </div>
        {/* <div style={{ marginLeft: "22%", marginRight: "1%" }}> */}
        <Collapse
          style={{
            marginLeft: "22%",
            marginRight: "1%",
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
        {/* </div> */}
        <TaskList />
      </div>
    );
  };
  return <TaskList /> ? loaded() : <Loading />;
}
