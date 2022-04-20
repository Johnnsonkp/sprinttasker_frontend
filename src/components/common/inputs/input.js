import React, { useEffect, useState } from "react";

export const TimerTextAreaInProgressTimer = (props) => {
  return (
    <textarea
      onChange={(e) => props.updateTaskTimer(e, props.task, props.updateTask)}
      rows="1"
      cols="10"
      style={{
        border: "1px solid transparent",
        // padding: "5px",
        width: "100%",
        height: "100%",
        background: "transparent",
        resize: "none",
        paddingTop: "8px",
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
      setTimer(props.state.inProgressTimer);
    }
  };

  useEffect(() => {
    if (!props.work_mode) {
      setTaskID(props.state.selectedTask.id);
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
        // padding: "5px",
        width: "100%",
        height: "100%",
        background: "transparent",
        resize: "none",
        paddingTop: "8px",
        fontSize: "12px",
      }}
    >
      {timer}
    </textarea>
  );
};
