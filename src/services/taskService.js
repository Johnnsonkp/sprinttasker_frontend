const baseUrl = process.env.REACT_APP_DEV_API_URL;

export async function loadTasks() {
  const authToken = await JSON.parse(window.localStorage.getItem("auth"));
  return await fetch(baseUrl + "tasks", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        console.log("res:", res);
        return await res
          .clone()
          .json()
          .catch(() => res.text());
      }
      return false;
    })
    .catch((err) => {
      console.error("api", "_fetch", "err", err);
      return false;
    });
}

const authToken = JSON.parse(window.localStorage.getItem("auth"));

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

export const createSprintComponent = async () => {
  return fetch(baseUrl + "sprints", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      name: "sprints component",
      objective: "to create a sprints component",
    }),
  }).then((data) => data.json());
};

export const loadSprintComponent = async () => {
  return await fetch(baseUrl + "sprints", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  }).then((data) => data.json());
};

export function postTask(task) {
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
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
      reward: task.reward,
      subitems: task.subitems,
      time_to_complete: task.time_to_complete,
      timer: "00:00",
      completed: task.completed,
      order: task.order,
    }),
  }).then((res) => res.json());
}

export const update = (task) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
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
      description: task.description,
      reward: task.reward,
      subitems: task.subitems,
      completed: task.completed,
      timer: task.timer,
      time_to_complete: task.time_to_complete,
      order: task.order,
    }),
  }).then((res) => res.json());
};

export const destroy = (id) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
  return fetch(`${baseUrl}tasks/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  });
};

export function postNote(note) {
  return fetch(baseUrl + "notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      title: note.title,
      body: note.body,
    }),
  }).then((res) => res.json());
}

// export function getNotes() {
//   return fetch(baseUrl + "notes", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + authToken.token,
//     },
//   }).then((data) => data.json());
// }

export async function getNotes() {
  const authToken = await JSON.parse(window.localStorage.getItem("auth"));
  return await fetch(baseUrl + "notes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return await res
          .clone()
          .json()
          .catch(() => res.text());
      }
      return false;
    })
    .catch((err) => {
      console.error("api", "_fetch", "err", err);
      return false;
    });
}
export async function destroyNote(id) {
  return await fetch(`${baseUrl}notes/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
  });
}

export const updateNote = (note) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth"));
  return fetch(`${baseUrl}notes/${note.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
    },
    body: JSON.stringify({
      id: note.id,
      title: note.title,
      body: note.body,
    }),
  }).then((res) => res.json());
};
