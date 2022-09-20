import "../App.css";

import { Container, Divider, Header, Segment } from "semantic-ui-react";
import React, { useState } from "react";
import { format, formatRelative, subDays } from "date-fns";

import InputListComponent from "../components/InputList.component.jsx";
import { Notification } from "../components/NotificationSlider";
// import {
//   StandUpComponent,
//   // StandDownComponent,
//   CheckinHeader,
// } from "../components/StandUp.jsx";
// import StandUpComp from "../components/SlideDashboard";
import StandUpComp from "../components/slideDashboard/SlideDashboard";

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
