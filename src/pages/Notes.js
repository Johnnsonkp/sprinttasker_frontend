import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class Notes extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Unfortunately this page isn't available just yet :(</p>
        </header>
      </div>
    );
  }
}

export default Notes;
