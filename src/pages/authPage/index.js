import { DefaultForm } from "../../components/common/defaultForm";
import React from "react";

export const AuthPage = () => {
  const styles = {
    authContainer: {
      //   height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.authContainer} className="auth-page-container">
      <div style={{ width: "50%" }}>
        <h1>Testing</h1>
      </div>
      <div style={{ width: "50%" }}>
        <DefaultForm />
      </div>
    </div>
  );
};
