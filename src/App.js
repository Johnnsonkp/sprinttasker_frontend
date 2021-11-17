import React, { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import Nav from "./components/Nav";
import {
  Landing,
  Auth,
  Developer,
  About,
  Mywork,
  Standup,
  Main,
} from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AppState, useAppState } from "./AppState";

export const App = (props) => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const checkIfAuth = () => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  // React.useState(() => {
  //   checkIfAuth();
  // }, []);

  React.useEffect(() => {
    checkIfAuth();
  }, []);

  console.log("App.js State:", state);
  return (
    <>
      <div className="App">
        <Nav />
        {/* <div className="content"> */}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/auth/:form" element={<Auth />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/about" element={<About />} />
          <Route path="/my_work" element={<Mywork />} />
          <Route path="/stand_up" element={<Standup />} />
        </Routes>
        {/* </div> */}
      </div>
    </>
  );
};
