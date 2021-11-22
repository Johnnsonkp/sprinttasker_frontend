import React, { useState, useCallback, useEffect } from "react";
import TaskList from "../components/TaskList";
import { Tabs, Layout, Row, Col, Input, message, Button } from "antd";
import TaskTab from "../components/TaskTab";
import TaskForm from "../components/TaskForm";
import { useAppState } from "../AppState";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { postTask, destroy, update, getTask } from "../services/taskService";
import Loading from "./Loading";

const { TabPane } = Tabs;
const { Content } = Layout;

const Main = (props) => {
  const [fetchedTasks, setFetchedTasks] = useState();
  const { state, dispatch } = useAppState();
  const [refreshing, setRefreshing] = useState(false);
  // const [fetchedTasks, setFetchedTasks] = React.useState({
  //   alltasks: [],
  // });

  const getTasks = async () => {
    console.log("Main.js state:", state);
    try {
      const tasks = await axios.get(state.url + "/tasks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      });
      window.localStorage.setItem("tasks", tasks);
      setFetchedTasks(tasks.data.reverse()); // set State
      console.log("tasks.data", tasks.data);
      // console.log("fetchedTasks", fetchedTasks);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let data = await getTasks();
    setRefreshing(false);
    console.log("Refreshing state", refreshing);
  }, [refreshing]);

  useEffect(() => {
    getTasks();
    if (fetchedTasks) {
      // console.log("fetchedTasks", fetchedTasks);
      dispatch({ type: "getTasks", payload: fetchedTasks });
    }
    console.log("Interval", state.alltasks);
    const interval = setInterval(() => {
      getTasks();
    }, 10000);

    return () => clearInterval(interval);
  }, [onRefresh]);

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
    return getTask();
  };

  const refresh = async () => {
    return getTask();
  };

  const handleFormSubmit = (task) => {
    createTask(task).then(onRefresh());
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
  const textArea = (event) => {
    console.log(event.target.value);
  };

  const loaded = () => (
    <div className="Menu">
      <div className="menu-banner ant-col-offset-1">
        <textarea
          value={"Main WorkSpace"}
          onChange={textArea}
          className="rest-title workspace-textfield"
        ></textarea>
      </div>

      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className="tasklist">
            <Row>
              <Col span={14} offset={5}>
                {/* <h1>Task Lists</h1> */}
                {/* <TaskForm onFormSubmit={handleFormSubmit} /> */}
                <br />
                <Tabs defaultActiveKey="all">
                  <TabPane tab="All" key="all">
                    <TaskTab
                      tasks={fetchedTasks}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Active" key="active">
                    <TaskTab
                      tasks={fetchedTasks}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Complete" key="complete">
                    <TaskTab
                      tasks={fetchedTasks.filter(
                        (task) => task.completed === true
                      )}
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Create Task" key="createtask">
                    <TaskForm onFormSubmit={handleFormSubmit} />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
  return fetchedTasks ? loaded() : <Loading />;
};

export default Main;
