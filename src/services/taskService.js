// const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`; // Url defined in .env file
import userEvent from "@testing-library/user-event";
import React from "react";
import { useAppState } from "../AppState";
import Task from "../components/TaskItem";
import TaskList from "../components/TaskList";
import axios from "axios";

// const baseUrl = "http://localhost:3000/tasks";
const baseUrl = process.env.REACT_APP_DEV_API_URL;
const authToken = JSON.parse(window.localStorage.getItem("auth"));

export const getTask = async () => {
  try {
    const tasks = await axios.get(baseUrl + "tasks", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken.token,
      },
    });
    console.log("tasks.data", tasks.data);
    return tasks.data;
  } catch (err) {
    console.error(err.message);
  }
};

export function postTask(task) {
  console.log("Mywork", task);
  return fetch(baseUrl + "tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      name: task.name,
      description: task.description,
      completed: task.completed,
    }),
  }).then((res) => res.json());
}

export const update = (task) => {
  return fetch(`${baseUrl}tasks/${task.id}`, {
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
  return fetch(`${baseUrl}tasks/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  });
};
