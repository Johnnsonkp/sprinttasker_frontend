import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import InputListComponent from "../components/InputList.component.jsx";

// class Standup extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>Unfortunately this page isn't available just yet :(</p>
//         </header>
//       </div>
//     );
//   }
// }

const Standup = () => {
  return (
    <Container style={{ paddingTop: "50px", paddingRight: "20px" }}>
      <Header as="h1" textAlign="left">
        Check in
      </Header>
      <Divider />
      <Header as="h3" textAlign="left">
        Tomorrow's Plan:
      </Header>
      <Segment style={{ minHeight: "100px", margin: "10px" }}>
        <InputListComponent data={["One", "Two"]} />
      </Segment>
      <Header as="h3" textAlign="left">
        What was accomplished:
      </Header>
      <Segment style={{ minHeight: "100px", margin: "10px" }}>
        <InputListComponent data={["No Work Done", "Mucho work"]} />
      </Segment>
    </Container>
  );
};

export default Standup;
