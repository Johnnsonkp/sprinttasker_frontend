import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import { App } from "./App";
import Landing from "./pages/Landing.js";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Auth";

test("Renders landing page when user isn't auth", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
  const landingPageText = screen.getByText("Remain On Task");
  expect(landingPageText).toBeInTheDocument();
});

describe("Test App Entry point", function () {
  it("should have a header tag with Hello world React!", function () {
    const wrapper = shallow(<App />);
    expect(wrapper.find("h1").text()).toEqual("Hello world React!");
  });
});

// test("Landing page displays the login and get started buttons when user isn't auth", () => {
//   render(
//     <Router>
//       <App />
//     </Router>
//   );
//   const button = screen.getByRole("button", { name: "Get Started" });
//   expect(button).toBeInTheDocument();
// });

// describe("Sign in process", () => {
//   test("Its can load auth form", () => {
//     render(<Auth />);
//     const button = screen.getByRole("submit");
//     expect(button).toBeInTheDocument();
//   });
// });

// describe("componentDidMount", () => {
//   it("should call fetchUsers function", () => {
//     const match = {
//       params: {
//         name: "name",
//         username: "new username",
//         password: "new",
//         email: "new@gmail.com",
//       },
//       isExact: true,
//       path: "",
//       url: "",
//     };
//     const fetchUserFn = jest.fn(match);
//     const wrapper = shallow(
//       <UserDetailsScreen match={match} fetchUsers={fetchUserFn} />,
//       {
//         disableLifecycleMethods: true,
//       }
//     );
//     expect(
//       wrapper.containsMatchingElement(<textarea>MAIN WORKSPACE</textarea>)
//     ).toBeTruthy();
//   });
// });
