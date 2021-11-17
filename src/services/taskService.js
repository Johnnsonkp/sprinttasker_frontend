// const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`; // Url defined in .env file
import userEvent from "@testing-library/user-event";
import React from "react";
import { useAppState } from "../AppState";
import Task from "../components/TaskItem";
import TaskList from "../components/TaskList";
import axios from "axios";

const baseUrl = "http://localhost:3000/tasks";

// export const LoadTasks = async () => {
// return fetch(baseUrl).then((res) => res.json());

const LoadTasks = async () => {
  const { state, dispatch } = useAppState();

  return fetch(baseUrl, {
    // const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.token,
    },
  }).then((res) => console.log("LoadTasks res:", res));
};

const getTask = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

const createTask = (task) => {
  console.log("baseUrl:", baseUrl);
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: task.name,
      completed: task.completed,
    }),
  }).then((res) => res.json());
};

const updateTask = (task) => {
  return fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: task.id,
      name: task.name,
      completed: task.completed,
    }),
  }).then((res) => res.json());
};

const deleteTask = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export { LoadTasks, deleteTask, updateTask, createTask, getTask };
