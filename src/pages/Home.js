import { Calendar, Input } from "antd";
import { LargeCalendar, showCal } from "../components/Calendar";

import AllNotes from "../components/AllNotes";
import { Avatar } from "antd";
import { DisplayBox } from "../components/DisplayBox";
import { LogoBlock } from "../components/LogoBlock";
import Main from "./Main";
import Notes from "./Notes";
import { PrimaryContainer } from "../components/common/container/container";
import React from "react";
import SmallWave from "../wave-small.png";
import TaskList from "../components/TaskList";
import banner from "../std-banner.svg";
import monday from "../monday-icon.svg";
import notion from "../notion-logo-1.svg";
import slackLogo from "../slack.svg";

const { Search } = Input;

export default function Home() {
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  const userFirstInitials = auth.name[0].toUpperCase();
  const User = auth.name.toUpperCase();

  const styles = {
    container: {
      // marginLeft: "21%",
      // marginTop: "20px",
      // marginBottom: "50px",

      paddingLeft: "100px",
      paddingRight: "0px",
      maxWidth: "1500px",
      width: "100%",
      margin: "auto",
    },
    containerInner: {
      // width: "92%",
      // margin: "auto",
      // paddingTop: "50px",
      // paddingDown: "50px",
    },
    welcomeBanner: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: "10px",
      paddingBottom: "20px",
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
      padding: "50px 20px 80px 30px",
      // backgroundImage: `url(${SmallWave})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      // backgroundColor: "#1890ff",
    },
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  const onSearch = (value) => console.log(value);

  const WelcomeBanner = () => {
    return (
      <>
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
      </>
    );
  };
  const SearchField = () => {
    return (
      <div style={styles.searchField} className="searchfield">
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: "100%", maxWidth: "450px" }}
        />
      </div>
    );
  };

  return (
    <>
      <PrimaryContainer
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "30px",
        }}
        component={<WelcomeBanner />}
        backgroundImage={banner}
      />

      <PrimaryContainer
        componentMulti1={<SearchField />}
        componentMulti2={
          <LogoBlock
            backgroundColor={"transparent"}
            iconWidth={"55px"}
            iconBorder={"1px solid lightGrey"}
            firstLogo={slackLogo}
            secondLogo={notion}
            thirdLogo={monday}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"110px"}
            marginTop={"40px"}
            boxShadow={false}
            containerWidth={"250px"}
            iconBorder={"1px solid #555"}
            iconBackground={"#555"}
          />
        }
        // style={{ backgroundImage: `url(${banner})`, marginBottom: "30px" }}
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/6445381/pexels-photo-6445381.jpeg?auto=compress&cs=tinysrgb&fit=crop&fp-y=0.38&h=500&sharp=15&w=1500)",
          marginBottom: "30px",
        }}
      />

      <PrimaryContainer
        style={{
          paddingBottom: "0px",
          border: "none",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
        componentMulti1={
          <DisplayBox
            component={<TaskList />}
            title={"Annoucements"}
            link={"/calendar"}
          />
        }
        componentMulti2={
          <DisplayBox
            component={<LargeCalendar customFunction={showCal()} />}
            title={"Calendar"}
            link={"/calendar"}
          />
        }
      />

      <PrimaryContainer
        style={{
          paddingBottom: "25px",
          border: "none",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
        componentMulti1={
          <DisplayBox component={<TaskList />} title={"Projects"} link={"/"} />
        }
        componentMulti2={
          <DisplayBox component={<Notes />} title={"Notes"} link={"/notes"} />
        }
      />
    </>
  );
}
