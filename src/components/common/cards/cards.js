import "./cards.css";

import { Button, Card } from "antd";
import React, { useState } from "react";

import { update } from "../../../services/taskService";

export const FullPageOverlayCard = (props) => {
  const styles = {
    ShowCard: {
      height: "550px",
      width: "85%",
      margin: "0 auto",
      position: "relative",
      top: "10%",
      left: "2%",
      right: "0",
      zIndex: "10",
      display: "none",
      border: "5px solid #cccccc",
      borderRadius: "10px",
      display: "block",
      opacity: "2",
    },
    cover: {
      position: "fixed",
      top: "0",
      left: "0",
      background: "rgba(0,0,0,0.6)",
      zIndex: "5",
      width: "100%",
      height: "100%",
      display: "block",
      opacity: "2",
    },
    cancel: {
      position: "relative",
      top: "-60px",
      left: "47%",
    },
    activeCell: {
      backgroundColor: "#c4c4c4",
      position: "relative",
      height: "100%",
      height: "45px",
      padding: "0 8px",
      textAlign: "left",
      fontSize: "12px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "15px",
    },
    completeCell: {
      backgroundColor: "#d2f8d2",
      backgroundColor: "rgb(0, 200, 117)",
      position: "relative",
      height: "60px",
      height: "45px",
      padding: "0 8px",
      textAlign: "left",
      fontSize: "12px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      margin: "15px",
    },
  };
  const [description, setDescription] = useState(false);
  const handleChange = (e) => {
    setDescription(e.target.value);
    e.target.addEventListener("focusout", () => {
      setTimeout(() => {
        props.task.description = description;
        console.log("description:", description);
        update(props.task);
      }, 2000);
    });
  };
  const onMouseOver = (e) => {
    props.task.description = description;
    update(props.task);

    console.log("onMouseOver:", onMouseOver);
  };
  return (
    <div style={styles.cover}>
      <Card style={styles.ShowCard} size="large" title="Task Card">
        <Button
          style={styles.cancel}
          onClick={() => props.setShowTaskCard(false)}
          className="remove-task-button"
          type="primary"
          danger
        >
          X
        </Button>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: "400px",
          }}
        >
          <div
            style={{
              width: "57%",
              height: "100%",
              border: "1px solid #f0f0f0",
              //   background: "#f4f4f4",
              //   padding: "10px",
            }}
          >
            <div style={{ textAlign: "left", margin: "30px" }}>
              <h2>{props.task.name}</h2>
            </div>
            <div style={{ textAlign: "left", margin: "30px" }}>
              <hr style={{ backgroundColor: " #f0f0f0" }}></hr>
              <h4>Description</h4>
              <div
                style={{
                  border: "1px solid #f5f6f8",
                  background: "#f5f6f8",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <textarea
                  onChange={(e) => handleChange(e)}
                  rows="8"
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
                  {props.task.description}
                </textarea>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              //   border: "1px solid lightGray",
              //   background: "#f4f4f4",
              height: "400px",
            }}
          >
            <div
              style={{
                width: "100%",
                border: "1px solid #f0f0f0",
                height: "400px",
                // background: "#f4f4f4",
              }}
            >
              <div
                className="task-status"
                style={
                  props.taskStatus ? styles.completeCell : styles.activeCell
                }
              >
                {props.taskStatus ? "Complete" : "status"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
