import React from "react";
import { useAppState } from "../AppState";
import { Avatar } from "antd";
import { Input, Calendar } from "antd";
import TaskList from "../components/TaskList";
import TaskItem from "../components/TaskItem";
import { useLocation, useNavigate } from "react-router";
import SmallWave from "../wave-small.png";
import Notes from "./Notes";
import { DisplayBox } from "../components/DisplayBox";
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
      justifyContent: "flex-start",
      alignItems: "center",
    },
    h1: {
      fontWeight: "bolder",
      margin: "0px",
    },
    searchField: {
      marginTop: "20px",
      marginBottom: "30px",
      // border: "1px solid #2CEEF0",
      display: "flex",
      justifyContent: "flex-start",
      padding: "90px 20px 50px 30px",
      backgroundImage: `url(${SmallWave})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundColor: "#2CEEF0",
      backgroundColor: "#1890ff",
      borderLeft: "1px solid #cbd4db",
      borderRight: "1px solid #cbd4db",
      borderTop: "1px solid #cbd4db",
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
            size={50}
            gap={1}
          >
            {userFirstInitials}
          </Avatar>
          <div>
            <h1 style={styles.h1}>Good Morning, {User}</h1>
          </div>
        </div>

        <div style={styles.searchField} className="searchfield">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: "100%", maxWidth: "450px" }}
          />
        </div>

        <div
          style={{
            marginTop: "30px",
            // marginBottom: "20px",
            width: "100%",
            height: "310px",
            // border: "1px solid orange",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          className="projects"
        >
          <DisplayBox title={"Announcements"} link={"/notes"} />
          <DisplayBox
            component={
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            }
            title={"Calendar"}
            link={"/notes"}
          />
        </div>
        <DisplayBox
          component={<TaskList />}
          title={"Projects"}
          link={"/main"}
        />
        <DisplayBox component={<Notes />} title={"Notes"} link={"/notes"} />
      </div>
    </div>
  );
}
