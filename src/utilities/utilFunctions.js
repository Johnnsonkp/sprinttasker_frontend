import { format } from "date-fns";

export const reformatDate = (railsDate, dateFormat) => {
  const newDate = format(new Date(railsDate), dateFormat);
  return newDate;
};

export const updateEstimatedTimeToComplete = (e, task, updatedTask) => {
  e.target.addEventListener("focusout", () => {
    task.time_to_complete = e.target.value;
    updatedTask(task);
    console.log("task etc updated:", e.target.value);
  });
};

export const updateTaskTimer = (e, task, updatedTask) => {
  e.target.addEventListener("focusout", () => {
    task.timer = e.target.value;
    updatedTask(task);
    console.log("task timer updated:", e.target.value);
  });
};
