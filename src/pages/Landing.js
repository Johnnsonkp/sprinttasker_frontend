import React from "react";
// import Background from "../public/landing-background.svg";
import Background from "../landing-background.svg";
import Background2 from "../wave2.svg";
import { Link, useNavigate } from "react-router-dom";
import Rainbow from "../rainbow.png";
import { useAppState } from "../AppState";
import Wave from "../utilities/wave";
import "../App.css";

export default function Landing() {
  const { dispatch, state } = useAppState();
  const styles = {
    landingPage: {
      color: "#fff",
    },
    menuDark: {
      color: "#fff",
      fontWeight: "bolder",
      textAlign: "center",
      width: "100px",
    },
    signUp: {
      cursor: "pointer",
      textDecoration: "none",
      lineHeight: "normal",
      transition: "all 0.15s ease-in-out 0s",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid rgb(255, 255, 255)",
      borderRadius: "4px",
      color: "rgb(255, 255, 255)",
      display: "flex",
      fontSize: "16px",
      fontWeight: "700",
      padding: "1em 1.125em",
      whiteSpace: "nowrap",
      background: "none",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      width: "300px",
      marginTop: "30px",
    },
  };
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  return (
    <div className="hero" style={styles.landingPage}>
      <div className="landing-background bg-wave"></div>

      <div className="content">
        <div className="left">
          {/* <h1>TaskSpinter</h1> */}
          <div className="content-inner">
            <div className="cta-text">
              <h1>Stay Focused</h1>
              <h1>Stay On Task</h1>
            </div>
            <div className="text">
              <p>
                SingleStore is The Database of Now TM. Built for data-intensive
                applications that runs anywhere from bare metal to hybrid cloud.
              </p>
            </div>

            <div style={styles.signUp}>
              {auth ? (
                <Link style={styles.menuDark} to="/auth/signup">
                  Account
                </Link>
              ) : (
                <Link style={styles.menuDark} to="/auth/signup">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <h1>TaskSpinter</h1>
          <div className="content-inner">
            <h1>Stay On Task</h1>
          </div>
        </div>
      </div>
      <Wave />
    </div>
  );
}
