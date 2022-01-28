import React, { useEffect, useState } from "react";

import { DisplayBox } from "../components/DisplayBox";
import { LargeCalendar } from "../components/Calendar";
import Loading from "../pages/Loading";
import { LoadingOutlined } from "@ant-design/icons";
import Preload from "../utilities/Preload";
import { Spin } from "antd";
import { useAppState } from "../AppState";

export default function CalendarPage() {
  const { state } = useAppState();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [toggle, setToggle] = useState(false);
  const Spinner = () => {
    return (
      <div>
        <Spin
          style={{
            margin: "auto",
            position: "absolute",
            top: "45%",
            left: "55%",
            display: "block",
          }}
          indicator={antIcon}
        />
      </div>
    );
  };

  // const displayCalendar = () => {
  const showCal = async () => {
    const auth = await JSON.parse(window.localStorage.getItem("auth"));
    if (document.getElementById("calendarEmbed")) {
      var iframe = document.getElementById("calendarEmbed");
      var email = "john.nkp1@gmail.com";
      var blocker = document.getElementById("calendarEmbedBlocker");
      if (email && /.+\@.+/.test(email)) {
        iframe.src =
          "https://calendar.google.com/calendar/embed?src=" + encodeURI(email);
        blocker.style.display = "none";
      } else {
        alert("That doesn't look like a valid email...");
        blocker.style.display = "block";
      }
    }
  };

  const DisplayCalendar = () => {
    return (
      <div
        id="calendarPage"
        style={{
          paddingLeft: "100px",
          paddingRight: "0px",
          maxWidth: "1500px",
          width: "100%",
          margin: "auto",
          transition: "all 5s easeInOut",
        }}
      >
        <div className="trackList">
          <div className="dummy-side-panel"></div>
          <DisplayBox
            component={<LargeCalendar customFunction={showCal()} />}
            title={"Calendar"}
            link={"/calendar"}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToggle(!toggle);
    }, 2000);
    setToggle(false);
    return () => clearTimeout(timer);
  }, []);

  return !toggle ? Spinner() : <DisplayCalendar />;
}
