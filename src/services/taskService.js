// const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`; // Url defined in .env file

// const baseUrl = "http://localhost:3000/tasks";
const baseUrl = process.env.REACT_APP_DEV_API_URL;
const authToken = JSON.parse(window.localStorage.getItem("auth"));

export const loadTasks = () => {
  return fetch(baseUrl + "tasks", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  }).then((res) => res.json());
};

export function getTasks() {
  return fetch(baseUrl + "tasks", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  }).then((data) => data.json());
}

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
