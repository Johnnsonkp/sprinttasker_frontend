import React, { useState } from "react";
import "../App.css";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import InputListComponent from "../components/InputList.component.jsx";
import { format, formatRelative, subDays } from "date-fns";
import {
  StandUpComponent,
  StandDownComponent,
  CheckinHeader,
} from "../components/standUp.jsx";

const Standup = () => {
  const start = Date.now();
  const newDate = formatRelative(subDays(new Date(), 0), new Date());
  let [data, setData] = useState();

  return (
    //   <Container
    //     style={{
    //       paddingTop: "50px",
    //       paddingRight: "0px",
    //       paddingLeft: "320px",
    //       display: "flex",
    //       justifyContent: "space-around",
    //       border: "1px solid red",
    //       width: "100%",
    //       margin: "auto",
    //     }}
    //   >
    //     {/* <Header as="h1" textAlign="left">
    //       Check in - [{newDate}]
    //     </Header>
    //     <Divider /> */}
    //     {/* <Header as="h3" textAlign="left">
    //       Stand Up:
    //     </Header>
    //     <Segment style={{ minHeight: "100px", margin: "10px" }}>
    //       <InputListComponent
    //         data={[
    //           "Enter the first task you're working on today",
    //           "Enter the second task you're working on",
    //           "Enter the third task you're working on",
    //         ]}
    //       />
    //     </Segment>
    //     <Header as="h3" textAlign="left">
    //       Stand Down:
    //     </Header>
    //     <Segment style={{ minHeight: "100px", margin: "10px" }}>
    //       <InputListComponent
    //         data={[
    //           "Enter the first task that was completed",
    //           "Enter the second task that was completed",
    //         ]}
    //       />
    //     </Segment> */}
    //     <div style={{ width: "100%", margin: "auto" }}>
    //       <CheckinHeader />
    //       <div style={{ display: "flex", width: "100%" }}>
    //         <StandUpComponent />
    //         <StandDownComponent />
    //       </div>
    //     </div>
    //   </Container>
    // );

    <h1>Stand Up</h1>
  );
};

export default Standup;
