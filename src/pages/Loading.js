import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class Loading extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#fff" }} className="App loading">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  }
}

export default Loading;
