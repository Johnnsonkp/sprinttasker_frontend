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

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Divider = () => {
  return (
    <hr style={{ border: "2px solid #fff", height: "48px", margin: "0px" }} />
  );
};
