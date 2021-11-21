import React, { useState, useCallback, useEffect } from "react";
import TaskList from "../components/TaskList";
import { Tabs, Layout, Row, Col, Input, message } from "antd";
import TaskTab from "../components/TaskTab";
import TaskForm from "../components/TaskForm";
import { useAppState } from "../AppState";
import Loading from "./Loading";
import { postTask, destroy, update, getTask } from "../services/taskService";
const { TabPane } = Tabs;
const { Content } = Layout;

const Mywork = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState();
  const { state, dispatch } = useAppState();
  const { token, alltasks, user, usertasks } = state;
  const [fetchedTasks, setFetchedTasks] = React.useState(null);

  const createTask = (task) => {
    return postTask(task);
  };

  const updateTask = (task) => {
    return update(task);
  };

  const deleteTask = (id) => {
    return destroy(id);
  };

  const LoadTasks = async () => {
    console.log("LoadTasks Tasklist");
    return getTask();
  };

  // const refresh = async () => {
  //   return getTask();
  // };
  const handleFormSubmit = (task) => {
    console.log("task to create", task);
    createTask(task).then(onRefresh());
    message.success("Task added!");
  };

  const handleRemoveTask = (task) => {
    deleteTask(task.id).then(onRefresh());
    message.warn("Task removed");
  };

  const handleToggleTaskStatus = (task) => {
    task.completed = !task.completed;
    updateTask(task).then(onRefresh());
    message.info("Task status updated!");
  };
  const refresh = () => {
    let fetchedTasks = JSON.parse(window.localStorage.getItem("getTasks"));
    const { id, task_id, user_id, description, name } = fetchedTasks;
    console.log("task.name", name);
    setTasks(fetchedTasks);
    console.log("refresh task", fetchedTasks);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let task = JSON.parse(window.localStorage.getItem("getTasks"));
    setTasks(task);
    console.log("on refresh task", task);

    // setActiveTasks(data.reverse().filter((task) => task.completed === false));
    // setCompletedTasks(data.reverse().filter((task) => task.completed === true));
    setRefreshing(false);
    console.log("Refreshing state", refreshing);
  }, [refreshing]);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  const textArea = (event) => {
    console.log(event.target.value);
  };

  const loaded = () => (
    <div className="Menu">
      <div className="menu-banner">
        <textarea
          value={"Individual Sprints"}
          onChange={textArea}
          className="rest-title workspace-textfield"
        ></textarea>
      </div>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className="tasklist">
            {/* <textarea
              value={"Individual Sprints"}
              onChange={textArea}
              className="rest-title workspace-textfield"
            ></textarea> */}
            <Row>
              <Col span={14} offset={5}>
                {/* <div className="heading">
                  <h1>Individual Sprints</h1>
                </div> */}
                <TaskForm onFormSubmit={handleFormSubmit} />
                <br />
                <Tabs defaultActiveKey="all">
                  <TabPane tab="All" key="all">
                    <TaskTab
                      tasks={tasks}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Active" key="active">
                    <TaskTab
                      tasks={activeTasks}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Complete" key="complete">
                    <TaskTab
                      tasks={completedTasks}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
  return refresh ? loaded() : <Loading />;
};

export default Mywork;
