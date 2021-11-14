import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
