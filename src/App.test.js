import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import Landing from "./pages/Landing.js";
import { BrowserRouter as Router } from "react-router-dom";

test("Renders landing page when user isn't auth", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
  // User not auth is met with the landing page
  const landingPageText = screen.getByText("Remain On Task");
  expect(landingPageText).toBeInTheDocument();

  //User that isn't auth is met with the get started button
  const ctaButton = screen.getByRole("link", { name: "Get Started" });
  expect(ctaButton.textContent).toBe("Get Started");
  expect(ctaButton).toHaveAttribute("href", "/auth/signup");

  //User that isn't auth is met with the demo button
  const demoButton = screen.getByRole("link", { name: "Demo Mode" });
  expect(demoButton.textContent).toBe("Demo Mode");
});

describe("Read data from API", () => {
  test("User login", () => {
    const formData = {
      name: "james4",
      username: "james4@gmail.com",
      password: "0000",
      email: "james4@gmail.com",
    };
    const url = "https://sprinttaskerbackend.herokuapp.com";
    return fetch(url + "/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      expect(response).toBeDefined();
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
    });
  });

  test("User sign up", () => {
    const formData = {
      name: "test",
      username: "test@gmail.com",
      password: "0000",
      email: "test@gmail.com",
    };
    const url = "https://sprinttaskerbackend.herokuapp.com";
    return fetch(url + "/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      expect(response).toBeDefined();
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
    });
  });
});
