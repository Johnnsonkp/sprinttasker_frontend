import "../App.css";

import React, { Component } from "react";

import logo from "../logo.svg";

class Loading extends Component {
  render() {
    return (
      <div
        style={{ backgroundColor: "#fff", backgroundColor: "transparent" }}
        className="App loading"
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  }
}

export default Loading;
