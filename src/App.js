import "./App.css";

import {
  About,
  Auth,
  CalendarPage,
  Developer,
  Home,
  Landing,
  Main,
  Mywork,
  Standup,
} from "./pages";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AuthPage } from "./pages/authPage/index";
import { Data } from "./pages/Data";
import Nav from "./components/Nav";
import Notes from "./pages/Notes";
import { SidePanel } from "./utilities/sidePanel";
import { SingleNote } from "./components/SingleNote";
import { TaskCards } from "./pages/TaskCards";
import { TaskCompleted } from "./pages/TaskCompletePage/TaskComplete";
import { Wrapper } from "./components/common/container/container";
import { useAppState } from "./AppState";
import { useLocation } from "react-router-dom";

export const App = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const notes = state.notes;

  const checkIfAuth = () => {
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      navigate("/main");
      // navigate("/authlogin");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkIfAuth();
  }, []);

  const location = useLocation();
  return (
    <>
      <div className="App">
        <Nav />
        <div className="main-content">
          {auth &&
          location.pathname !== "/" &&
          location.pathname !== "/about" &&
          location.pathname !== "/developer" &&
          location.pathname !== "/notes" &&
          location.pathname !== "/auth/login" &&
          location.pathname !== "/auth/signup" &&
          location.pathname !== "/single-note" &&
          location.pathname !== "/task-cards" &&
          location.pathname !== "/authlogin" ? (
            <SidePanel />
          ) : location.pathname === "/notes" ||
            location.pathname === "/single-note" ? (
            <SidePanel notes={notes} />
          ) : (
            <></>
          )}
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/main" element={<Wrapper component={<Main />} />} />
            <Route path="/auth/:form" element={<Auth />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/my_work"
              element={<Wrapper component={<Mywork />} />}
            />
            <Route
              path="/stand_up"
              element={<Wrapper component={<Standup />} />}
            />
            <Route path="/notes/" element={<Wrapper component={<Notes />} />} />
            <Route path="/home" element={<Wrapper component={<Home />} />} />
            <Route
              path="/single-note"
              element={<Wrapper component={<SingleNote />} />}
            />
            <Route path="/task-cards" element={<TaskCards />} />
            <Route path="/data" element={<Data />} />
            <Route path="/completed-tasks" element={<TaskCompleted />} />
            <Route
              path="/calendar"
              element={<Wrapper component={<CalendarPage />} />}
            />
            <Route path="/authlogin" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
