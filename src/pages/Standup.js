import React, { useState } from "react";
import "../App.css";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import InputListComponent from "../components/InputList.component.jsx";
import { format, formatRelative, subDays } from "date-fns";
// import {
//   StandUpComponent,
//   // StandDownComponent,
//   CheckinHeader,
// } from "../components/StandUp.jsx";
import StandUpComp from "../components/Standupcomponent";
import { Notification } from "../components/NotificationSlider";

const Standup = () => {
  const start = Date.now();
  const newDate = formatRelative(subDays(new Date(), 0), new Date());
  let [data, setData] = useState();

  return (
    <div>
      <h1>Stand Up</h1>
      <Notification />
      <div
        style={{
          width: "800px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <StandUpComp />
        {/* <StandDownComponent /> */}
      </div>
    </div>
  );
};

export default Standup;
