import React from "react";
import { Avatar } from "antd";
import { Input, Calendar } from "antd";
import TaskList from "../components/TaskList";
import SmallWave from "../wave-small.png";
import Notes from "./Notes";
import { DisplayBox } from "../components/DisplayBox";
import AllNotes from "../components/AllNotes";
import { LargeCalendar, showCal } from "../components/Calendar";
const { Search } = Input;

export default function Home() {
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const userFirstInitials = auth.name[0].toUpperCase();
  const User = auth.name.toUpperCase();

  const styles = {
    container: {
      marginLeft: "21%",
      marginTop: "20px",
      marginBottom: "50px",
    },
    containerInner: {
      width: "92%",
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
      display: "flex",
      justifyContent: "flex-start",
      padding: "90px 20px 80px 30px",
      backgroundImage: `url(${SmallWave})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundColor: "#1890ff",
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
            size={45}
            gap={0}
          >
            {userFirstInitials}
          </Avatar>
          <div>
            <h1 style={styles.h1}>Welcome, {User}</h1>
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
            marginTop: "-30px",
            marginBottom: "55px",
            // width: "100%",
            height: "310px",
            // border: "1px solid orange",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          className="projects"
        >
          <div style={{ width: "49%" }}>
            <DisplayBox title={"Announcements"} link={"/notes"} />
          </div>

          <div style={{ width: "49%" }}>
            <DisplayBox
              component={<LargeCalendar customFunction={showCal()} />}
              title={"Calendar"}
              link={"/calendar"}
            />
          </div>
        </div>
        <DisplayBox component={<TaskList />} title={"Projects"} link={"/"} />
        <DisplayBox component={<Notes />} title={"Notes"} link={"/notes"} />
      </div>
    </div>
  );
}
