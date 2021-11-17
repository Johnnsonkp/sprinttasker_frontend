import React, { useState, useCallback, useEffect } from "react";
import TaskList from "../components/TaskList";
import { Tabs, Layout, Row, Col, Input, message } from "antd";
import TaskTab from "../components/TaskTab";
import TaskForm from "../components/TaskForm";
import { useAppState } from "../AppState";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import {
  createTask,
  deleteTask,
  updateTask,
  LoadTasks,
} from "../services/taskService";

const { TabPane } = Tabs;
const { Content } = Layout;

const Main = (props) => {
  const [fetchedTasks, setFetchedTasks] = React.useState(null);
  const { state, dispatch } = useAppState();

  const getTasks = async () => {
    try {
      const tasks = await axios.get(state.url + "/tasks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      });
      setFetchedTasks(tasks.data); // set State
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
    if (fetchedTasks) {
      dispatch({
        type: "getTasks",
        payload: { alltasks: fetchedTasks },
      });
    }
    window.localStorage.setItem(
      "getTasks",
      JSON.stringify({
        alltasks: fetchedTasks,
      })
    );
    console.log("state.alltasks useEffect)", state.alltasks);

    const interval = setInterval(() => {
      getTasks();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const storedTasks = JSON.parse(window.localStorage.getItem("getTasks"));
  console.log("storedTasks", storedTasks);

  const handleFormSubmit = (task) => {
    // console.log("task to create", task);
    // createTask(task).then(onRefresh());
    // message.success("Task added!");
    return "hello";
  };

  const handleRemoveTask = (task) => {
    // deleteTask(task.id).then(onRefresh());
    // message.warn("Task removed");
    return "hello";
  };

  const handleToggleTaskStatus = (task) => {
    // task.completed = !task.completed;
    // updateTask(task).then(onRefresh());
    // message.info("Task status updated!");

    return "hello";
  };

  const loaded = () => (
    <div className="Menu">
      <div
        className="menu-banner"
        style={{
          backgroundImage: "url(/img/rest-banner.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          // backgroundColor: "#fff",
          // backgroundBlendMode: "overlay",
        }}
      >
        <h1 className="rest-title">
          {state.name ? state.name + "Workspace" : null}
        </h1>
      </div>

      <div className="outer-wrap">
        <div className="menu-add-meal-wrap">
          <h3>Menu</h3>
          {state.name ? (
            <Link to="/admin/new">
              <button>Add a meal</button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* <Route
        path="/admin/:action"
        render={(rp) => <Form {...rp} getMeals={getMeals} />}
      /> */}

      <div className="menu-list-order">
        <ul className="meal-list-side">
          {state.alltasks
            ? Object.entries(state.alltasks).map((task, i) => {
                const key = task[0];
                const taskValue = task[1].name;
                const complete = task[1].completed;
                console.log("state.alltasks)", state.alltasks);
                return (
                  <div className="menuList" key={key}>
                    <div className="meal-picture"></div>
                    <div className="meal-info">
                      <h2 className="meal-name">Task name"{taskValue}</h2>
                      <h4 className="meal-name">Task name"{complete}</h4>
                    </div>
                  </div>
                );
              })
            : Object.entries(storedTasks.alltasks).map((task, i) => {
                const key = task[0];
                const taskValue = task[1].name;
                // const complete = task[1].completed;
                console.log("state.alltasks)", state.alltasks);
                return (
                  <div className="menuList" key={key}>
                    <div className="meal-picture"></div>
                    <div className="meal-info">
                      <h2 className="meal-name">Task name"{taskValue}</h2>
                      {/* <h4 className="meal-name">Task name"{complete}</h4> */}
                    </div>
                  </div>
                );
              })}

          {state.alltasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
        {state.name || state.username ? (
          <div className="order-tab">
            <h2>User: {state.name}</h2>
            <h3>Your Order</h3>
            <div className="order-items"></div>
            <div className="total"></div>
          </div>
        ) : null}
      </div>

      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className="tasklist">
            <Row>
              <Col span={14} offset={5}>
                <h1>Task Lists</h1>
                <TaskForm onFormSubmit={handleFormSubmit} />
                <br />
                <Tabs defaultActiveKey="all">
                  <TabPane tab="All" key="all">
                    <TaskTab
                      tasks={
                        state.alltasks ? state.alltasks : storedTasks.alltasks
                      }
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Active" key="active">
                    <TaskTab
                      tasks={
                        state.alltasks ? state.alltasks : storedTasks.alltasks
                      }
                      onTaskToggle={handleToggleTaskStatus}
                      onTaskRemoval={handleRemoveTask}
                    />
                  </TabPane>
                  <TabPane tab="Complete" key="complete">
                    <TaskTab
                      tasks={state.alltasks.filter(
                        (task) => task.completed === true
                      )}
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
  return state.alltasks ? loaded() : <h1>Loading...</h1>;
};

export default Main;
