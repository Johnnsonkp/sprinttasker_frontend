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
import { SidePanel } from "./utilities/sidePanel";
import { postTask, destroy, update, getTask } from "./services/taskService";
import { useLocation } from "react-router-dom";
import Notes from "./pages/Notes";

export const App = (props) => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const auth = JSON.parse(window.localStorage.getItem("auth"));

  const checkIfAuth = () => {
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      navigate("/my_work");
    } else {
      navigate("/");
    }
  };

  React.useEffect(() => {
    checkIfAuth();
  }, []);

  const location = useLocation();
  console.log(location.pathname);
  // return <span>Path : {location.pathname}</span>

  console.log("App.js State:", state);
  return (
    <>
      <div className="App">
        <Nav />
        <div className="content">
          {auth && location.pathname != "/" ? <SidePanel /> : <></>}
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/main" element={<Main />} />
            <Route path="/auth/:form" element={<Auth />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/about" element={<About />} />
            <Route path="/my_work" element={<Mywork />} />
            <Route path="/stand_up" element={<Standup />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
