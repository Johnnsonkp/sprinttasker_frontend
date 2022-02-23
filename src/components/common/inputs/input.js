import React from "react";

export const TimerTextAreaInProgressTimer = (props) => {
  return (
    <textarea
      onChange={(e) => props.updateTaskTimer(e, props.task, props.updateTask)}
      rows="1"
      cols="10"
      style={{
        border: "1px solid transparent",
        padding: "5px",
        width: "100%",
        height: "100%",
        background: "transparent",
        resize: "none",
        paddingTop: "12px",
      }}
      value={
        props.state.work_mode &&
        props.state.inProgressTimer &&
        props.state.selectedTask.id === props.task.id
          ? props.state.inProgressTimer
          : props.task.timer
      }
    >
      {props.state.work_mode &&
      props.state.inProgressTimer &&
      props.state.selectedTask.id === props.task.id
        ? props.state.inProgressTimer
        : props.task.timer}
    </textarea>
  );
};

export const TimerTextArea = (props) => {
  return (
    <textarea
      onChange={(e) => props.updateTaskTimer(e, props.task, props.updateTask)}
      rows="1"
      cols="10"
      style={{
        border: "1px solid transparent",
        padding: "5px",
        width: "100%",
        height: "100%",
        background: "transparent",
        resize: "none",
        paddingTop: "12px",
      }}
    >
      {props.state.work_mode &&
      props.state.inProgressTimer &&
      props.state.selectedTask.id === props.task.id
        ? props.state.inProgressTimer
        : props.task.timer}
    </textarea>
  );
};
