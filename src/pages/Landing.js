import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Wave from "../utilities/wave";
import reactLogo from "../reactLogo.svg";
import railsLogo from "../rails.svg";
import "../App.css";

export default function Landing() {
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
      padding: "0.6em 0.7em",
      whiteSpace: "nowrap",
      background: "none",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      width: "180px",
      marginTop: "55px",
    },
    appName: {
      fontWeight: "bold",
      boxSizing: "inherit",
      color: "rgb(255, 0, 255)",
      fontFamily: "Lato, sans-serif",
      fontWeight: "700",
      margin: "0px",
      position: "relative",
      fontSize: "22px",
      lineHeight: "28px",
      boxSizing: "inherit",
      textTransform: "uppercase",
      marginBottom: "18px",
    },
    appNamelg: {
      color: "rgb(255, 255, 255)",
      fontFamily: "Lato, sans-serif",
      fontWeight: "600",
      margin: "0px",
      position: "relative",
      fontSize: "40px",
      lineHeight: "50px",
      boxSizing: "inherit",
    },
    appText: {
      color: "rgb(255, 255, 255)",
      fontFamily: "Lato, sans-serif",
      margin: "0px",
      lineHeight: "28px",
      boxSizing: "inherit",
      fontWeight: "400",
      letterSpacing: "-0.2px",
      fontSize: "19px",
      marginTop: "0px",
      maxWidth: "44rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };
  const auth = JSON.parse(window.localStorage.getItem("auth"));
  return (
    <div className="hero" style={styles.landingPage}>
      <div className="landing-background bg-wave"></div>

      <div className="content">
        <div className="left">
          <h1 style={styles.appName} className="app-name">
            TaskSprinter
          </h1>
          <div className="content-inner">
            <div className="cta-text">
              <h1 style={styles.appNamelg}>Stay Focused</h1>
              <h1 style={styles.appNamelg}>Remain On Task</h1>
            </div>
            <div className="text">
              {/* <p style={styles.appText}>
                SingleStore is The Database of Now TM. Built for data-intensive
                applications that runs anywhere from bare metal to hybrid cloud.
              </p> */}
              <p style={styles.appText}>
                SingleStore is The Database of Now TM. Built for data-intensive
                applications that runs anywhere from bare metal to hybrid cloud.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "370px",
              }}
            >
              <div style={styles.signUp}>
                {auth ? (
                  <Link
                    className="bannerCta"
                    style={styles.menuDark}
                    to="/main"
                  >
                    Back to Work
                  </Link>
                ) : (
                  <Link style={styles.menuDark} to="/auth/signup">
                    Get Started
                  </Link>
                )}
              </div>
              <div style={styles.signUp}>
                <Link style={styles.menuDark} to="/auth/signup">
                  Demo Mode
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="content-inner">
            {/* <img className="bannerLogo" src={reactLogo} />
            <img className="bannerLogo" src={railsLogo} />
            <img className="bannerLogo" src={railsLogo} />
            <img className="bannerLogo" src={reactLogo} /> */}
          </div>
        </div>
      </div>
      <Wave />
    </div>
  );
}
