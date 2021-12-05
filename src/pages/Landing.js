import React from "react";
import { Link } from "react-router-dom";
import Wave from "../utilities/wave";
import reactLogo from "../reactLogo.svg";
import railsLogo from "../rails.svg";
import slackLogo from "../slack.svg";
import notion from "../notion-logo-1.svg";
import monday from "../monday-icon.svg";
import heroku from "../heroku-ar21.svg";
import netlify from "../netlify-ar21.svg";
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
    menuLight: {
      fontWeight: "bolder",
      textAlign: "center",
      width: "100px",
      color: "#111",
    },
    signUp: {
      cursor: "pointer",
      textDecoration: "none",
      lineHeight: "normal",
      transition: "all 0.15s ease-in-out 0s",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid rgb(255, 255, 255)",
      color: "rgb(255, 255, 255)",
      display: "flex",
      fontSize: "16px",
      fontWeight: "700",
      padding: "0.6em 0.7em",
      whiteSpace: "nowrap",
      backgroundColor: "transparent",
      textAlign: "center",
      width: "180px",
      marginTop: "55px",
      borderRadius: "8px",
    },
    demoBtn: {
      backgroundColor: "#2CEEF0",
      ursor: "pointer",
      textDecoration: "none",
      lineHeight: "normal",
      transition: "all 0.15s ease-in-out 0s",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #2CEEF0",
      color: "#111",
      display: "flex",
      fontSize: "16px",
      fontWeight: "700",
      padding: "0.6em 0.7em",
      whiteSpace: "nowrap",
      textAlign: "center",
      width: "180px",
      marginTop: "55px",
      borderRadius: "8px",
    },
    appName: {
      color: "#2CEEF0",
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
    <>
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
                <p style={styles.appText}>
                  All your favourite features from your favourite project
                  management tools combined into one. SprintTasker is the
                  project management tool of now.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "390px",
                }}
              >
                <div className="ctaBtn" style={styles.signUp}>
                  {auth ? (
                    <Link
                      className="bannerCta"
                      style={styles.menuDark}
                      to="/main"
                    >
                      Back to Work
                    </Link>
                  ) : (
                    <Link
                      className="bannerCta"
                      style={styles.menuDark}
                      to="/auth/signup"
                    >
                      Get Started
                    </Link>
                  )}
                </div>
                <div className="demoBtn" style={styles.demoBtn}>
                  <Link style={styles.menuLight} to="/auth/signup">
                    Demo Mode
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="content-inner"></div>
            <div className="logo-container">
              <img className="bannerLogo" alt="slackLogo" src={slackLogo} />
              <img className="bannerLogo" alt="notion" src={notion} />
              <img className="bannerLogo" alt="monday" src={monday} />
            </div>
          </div>
        </div>
        <Wave />
      </div>

      {/* <div className="logo-container">
        <img className="bannerLogo" alt="slackLogo" src={reactLogo} />
        <img className="bannerLogo" alt="notion" src={railsLogo} />
        <img className="bannerLogo" alt="monday" src={heroku} />
        <img className="bannerLogo" alt="monday" src={netlify} />
      </div> */}
    </>
  );
}
