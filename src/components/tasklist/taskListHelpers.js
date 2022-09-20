export const dummyData = [
  {
    completed: false,
    created_at: "2022-01-06T22:28:39.283Z",
    description: "Create a new task",
    id: 222,
    name: "Tasklist is empty",
    subtask: null,
    time_to_complete: null,
    timer: "00:00",
    updated_at: "2022-01-13T03:59:54.250Z",
    user_id: 8,
  },
];

export const taskInProgress = () => {
  return <h1>Task in progress</h1>;
};

//Local storage helpers
export const getDataFromLocalStorage = (dataNameString) => {
  const dataStringified = localStorage.getItem(dataNameString);
  return (
    (dataStringified && dataStringified && JSON.parse(dataStringified)) || null
  );
};
export const setDataToLocalStorage = (dataNameString, data) => {
  localStorage.setItem(dataNameString, JSON.stringify(data));
};
export const removeLocalStorageItem = (itemAsString) => {
  localStorage.removeItem(itemAsString);
};
