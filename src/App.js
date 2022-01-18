import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { useAppState } from "./AppState";
import { SidePanel } from "./utilities/sidePanel";
import { useLocation } from "react-router-dom";
import Notes from "./pages/Notes";
import {
  Landing,
  Auth,
  Developer,
  About,
  Mywork,
  Standup,
  Main,
  Home,
  CalendarPage,
} from "./pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SingleNote } from "./components/SingleNote";
import { TaskCards } from "./pages/TaskCards";
import { Data } from "./pages/Data";

export const App = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const notes = state.notes;

  const checkIfAuth = () => {
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      navigate("/main");
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
          location.pathname !== "/task-cards" ? (
            <SidePanel />
          ) : location.pathname === "/notes" ||
            location.pathname === "/single-note" ? (
            <SidePanel notes={notes} />
          ) : (
            <></>
          )}
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/main" element={<Main />} />
            <Route path="/auth/:form" element={<Auth />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/about" element={<About />} />
            <Route path="/my_work" element={<Mywork />} />
            <Route path="/stand_up" element={<Standup />} />
            <Route path="/notes/" element={<Notes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/single-note" element={<SingleNote />} />
            <Route path="/task-cards" element={<TaskCards />} />
            <Route path="/data" element={<Data />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
