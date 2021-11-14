import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppState } from "./AppState";

function App() {
  return (
    <AppState>
      <Router>
        <div className="App">
          <Nav />
          <div className="content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/main" element={<Main />} />
              <Route path="/auth:form" element={<Auth />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/about" element={<About />} />
              <Route path="/my_work" element={<Mywork />} />
              <Route path="/stand_up" element={<Standup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppState>
  );
}

export default App;
