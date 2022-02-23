export const TimerSlot = (props) => {
  return (
    <div
      className="timerSlot"
      style={{ width: "90px", display: "flex", justifyContent: "space-around" }}
    >
      <p
        style={{
          fontSize: "14px",
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <h5
          style={{ fontWeight: "400", marginTop: "auto", marginBottom: "auto" }}
        >
          ETC:
        </h5>
        <textarea
          onChange={(e) =>
            props.updateEstimatedTimeToComplete(e, props.task, props.updateTask)
          }
          rows="1"
          cols="10"
          style={{
            border: "1px solid transparent",
            padding: "5px",
            width: "100%",
            height: "100%",
            background: "transparent",
            resize: "none",
          }}
        >
          {props.task.time_to_complete ? props.task.time_to_complete : "00:00"}
        </textarea>
      </p>
    </div>
  );
};
