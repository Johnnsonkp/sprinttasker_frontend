import React, { Component, useState, useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";

const Notes = () => {
  const styles = {
    textArea: {
      width: "78.8%",
      height: "98vh",
      background: "#323439",
      padding: "100px",
      border: "3px solid #1b1a21",
      marginLeft: "20.83333333%",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "#323439",
    },
  };

  const initialText = "Enter Notes Here...";
  const [text, setText] = useState(initialText);

  const textFieldValue = (e) => {
    console.log("Textfield:", e.target.value);
    setText(e.target.value);
  };

  useEffect(() => {
    setText();
  }, [textFieldValue]);

  return (
    <div style={styles.container} className="text-container">
      <textarea
        id="textareaId"
        style={styles.textArea}
        placeholder={text}
        // onChange={(e) => textFieldValue(e)}
        onKeyUp={(e) => textFieldValue(e)}
      ></textarea>
    </div>
  );
};

export default Notes;
