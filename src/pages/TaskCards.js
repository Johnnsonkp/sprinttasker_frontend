import React from "react";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

export const TaskCards = () => {
  return (
    <div>
      <Link to="/main">Return</Link>
      <h2>Task Cards</h2>
      <TaskList />
    </div>
  );
};
