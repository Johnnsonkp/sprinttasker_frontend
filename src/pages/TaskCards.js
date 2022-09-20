import { Link } from "react-router-dom";
import React from "react";
// import TaskList from "../components/TaskList";
import TaskList from "../components/tasklist/TaskList";

export const TaskCards = () => {
  return (
    <div>
      <Link to="/main">Return</Link>
      <h2>Task Cards</h2>
      <TaskList />
    </div>
  );
};
