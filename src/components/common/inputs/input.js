import React, { useEffect, useState } from "react";

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
        fontSize: "12px",
      }}
      value={props.state.inProgressTimer}
    ></textarea>
  );
};

export const TimerTextArea = (props) => {
  const defaultValueAtt = () => {
    return props.state.inProgressTimer !== null &&
      parseInt(props.state.inProgressTimer) !== 0
      ? props.state.inProgressTimer
      : props.task.timer;
  };
  let [timer, setTimer] = useState(defaultValueAtt);
  let [selectedTaskID, setTaskID] = useState();

  const updateTimerOnStop = () => {
    if (!props.work_mode && parseInt(props.state.inProgressTimer) !== 0) {
      // console.log("if seclected task", selectedTaskID);
      // console.log("taskId", props.task.id);
      // console.log("otherKey", props.otherKey);
      // console.log("seclected task = taskId", selectedTaskID === props.otherKey);
      setTimer(props.state.inProgressTimer);
    }
  };

  useEffect(() => {
    if (!props.work_mode) {
      setTaskID(props.state.selectedTask.id);
      // console.log("taskId", props.task.id);
      // console.log("setTaskID", selectedTaskID);
    }
    updateTimerOnStop();
    return function cleanup() {
      updateTimerOnStop();
    };
  }, [props.work_mode, props.state.selectedTask]);

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
        fontSize: "12px",
      }}
    >
      {timer}
    </textarea>
  );
};
