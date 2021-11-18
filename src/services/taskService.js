// const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`; // Url defined in .env file
import userEvent from "@testing-library/user-event";
import React from "react";
import { useAppState } from "../AppState";
import Task from "../components/TaskItem";
import TaskList from "../components/TaskList";
import axios from "axios";

const baseUrl = "http://localhost:3000/tasks";
const authToken = JSON.parse(window.localStorage.getItem("auth"));

export const getTask = async () => {
  try {
    const tasks = await axios.get(baseUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken.token,
      },
    });
    // set State
    console.log("tasks.data", tasks.data);
    return tasks.data;
  } catch (err) {
    console.error(err.message);
  }
};

export function postTask(task) {
  console.log("authToken", authToken.token);
  console.log("authToken", authToken);

  return fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      name: task.name,
      completed: task.completed,
    }),
  }).then((res) => res.json());
}

export const update = (task) => {
  return fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      id: task.id,
      name: task.name,
      completed: task.completed,
    }),
  }).then((res) => res.json());
};

export const destroy = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  }).then((res) => res.json());
};
