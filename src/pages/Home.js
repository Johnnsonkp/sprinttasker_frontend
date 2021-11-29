import React from "react";
import { useAppState } from "../AppState";
import { Avatar } from "antd";
import { Input, Space, Calendar } from "antd";
import TaskList from "../components/TaskList";
import TaskItem from "../components/TaskItem";
import { useLocation, useNavigate } from "react-router";
const { Search } = Input;

export default function Home() {
  const { state, dispatch } = useAppState();
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const userFirstInitials = auth.name[0].toUpperCase();
  const User = auth.name.toUpperCase();
  const navigate = useNavigate();

  const styles = {
    container: {
      marginLeft: "21%",
      marginTop: "20px",
      marginBottom: "20px",
    },
    containerInner: {
      width: "82%",
      margin: "auto",
    },
    welcomeBanner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    h1: {
      fontWeight: "bolder",
      margin: "0px",
    },
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  const onSearch = (value) => console.log(value);

  return (
    <div style={styles.container} className="home-container">
      <div style={styles.containerInner}>
        <div style={styles.welcomeBanner} className="welcome-banner">
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              marginLeft: "15px",
              marginRight: "15px",
            }}
            size={60}
            gap={1}
          >
            {userFirstInitials}
          </Avatar>
          <div>
            <h1 style={styles.h1}>Good Morning, {User}</h1>
          </div>
        </div>

        <div
          style={{ marginTop: "20px", marginBottom: "20px" }}
          classname="searchfield"
        >
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: "100%" }}
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "100%",
            height: "330px",
            // border: "1px solid orange",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          classname="projects"
        >
          <div
            style={{
              width: "100%",
              height: "330px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
            }}
            id="announcements"
          >
            <h3>Announcements</h3>
          </div>
          <div
            style={{
              width: "100%",
              height: "330px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
            }}
            id="calender"
          >
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "100%",
            height: "250px",
            border: "1px solid lightgrey",
            borderRadius: "5px",
            overflow: "hidden",
          }}
          id="projects"
          onClick={() => {
            navigate("/main");
          }}
        >
          <div className="inner">
            <h3>Projects</h3>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
