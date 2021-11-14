// const baseUrl = `${process.env.REACT_APP_API_URL}/tasks`; // Url defined in .env file
const baseUrl = "http://localhost:3000/tasks";

export const loadTasks = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getTask = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const createTask = (task) => {
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

export const updateTask = (task) => {
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

export const deleteTask = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
