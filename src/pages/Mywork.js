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
  // const [refreshing, setRefreshing] = useState(false);
  // const [tasks, setTasks] = useState([]);
  // const [activeTasks, setActiveTasks] = useState([]);
  // const [completedTasks, setCompletedTasks] = useState();
  // const { state, dispatch } = useAppState();
  // const { token, alltasks, user, usertasks } = state;
  // const [fetchedTasks, setFetchedTasks] = React.useState(null);

  // const createTask = (task) => {
  //   return postTask(task);
  // };

  // const updateTask = (task) => {
  //   return update(task);
  // };

  // const deleteTask = (id) => {
  //   return destroy(id);
  // };

  // const LoadTasks = async () => {
  //   console.log("LoadTasks Tasklist");
  //   return getTask();
  // };
  // const handleFormSubmit = (task) => {
  //   console.log("task to create", task);
  //   createTask(task).then(onRefresh());
  //   message.success("Task added!");
  // };

  // const handleRemoveTask = (task) => {
  //   deleteTask(task.id).then(onRefresh());
  //   message.warn("Task removed");
  // };

  // const handleToggleTaskStatus = (task) => {
  //   task.completed = !task.completed;
  //   updateTask(task).then(onRefresh());
  //   message.info("Task status updated!");
  // };
  // const refresh = () => {
  //   setTasks(alltasks);
  // };

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   // let task = JSON.parse(window.localStorage.getItem("tasks"));
  //   // setTasks(task);
  //   console.log("on refresh task", tasks);
  //   setActiveTasks(tasks.filter((task) => task.completed === false));
  //   setCompletedTasks(tasks.filter((task) => task.completed === true));
  //   setRefreshing(false);
  //   console.log("Refreshing state", refreshing);
  // }, [refreshing]);

  // useEffect(() => {
  //   refresh();
  // }, [onRefresh]);

  const textArea = (event) => {
    console.log(event.target.value);
  };

  const loaded = () => (
    // <div className="Menu">
    //   <div className="menu-banner ant-col-offset-1">
    //     <textarea
    //       value={"Individual Sprints"}
    //       onChange={textArea}
    //       className="rest-title workspace-textfield"
    //       style={{ padding: "20px 50px" }}
    //     ></textarea>
    //   </div>
    //   <Layout className="layout">
    //     <Content style={{ padding: "0 50px" }}>
    //       <div className="tasklist">
    //         <Row>
    //           <Col span={14} offset={5}>
    //             <br />
    //             <Tabs defaultActiveKey="all">
    //               <TabPane tab="All" key="all">
    //                 <TaskTab
    //                   tasks={tasks}
    //                   onTaskToggle={handleToggleTaskStatus}
    //                   onTaskRemoval={handleRemoveTask}
    //                 />
    //               </TabPane>
    //               <TabPane tab="Active" key="active">
    //                 <TaskTab
    //                   tasks={activeTasks}
    //                   onTaskToggle={handleToggleTaskStatus}
    //                   onTaskRemoval={handleRemoveTask}
    //                 />
    //               </TabPane>
    //               <TabPane tab="Complete" key="complete">
    //                 <TaskTab
    //                   tasks={completedTasks}
    //                   onTaskToggle={handleToggleTaskStatus}
    //                   onTaskRemoval={handleRemoveTask}
    //                 />
    //               </TabPane>
    //               <TabPane tab="Create Task" key="createtask">
    //                 <TaskForm onFormSubmit={handleFormSubmit} />
    //               </TabPane>
    //             </Tabs>
    //           </Col>
    //         </Row>
    //       </div>
    //     </Content>
    //   </Layout>
    // </div>
    <h1>hello</h1>
  );
  // return refresh ? loaded() : <Loading />;

  return <h1>Mywork</h1>;
};

export default Mywork;
