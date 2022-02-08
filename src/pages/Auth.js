import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Wave from "../utilities/wave";
import { useAppState } from "../AppState";

const Auth = ({ name, username, password, email }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const type = useParams().form;

  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const [userData, setUserData] = React.useState(null);
  const { state, dispatch } = useAppState();
  let navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);

  React.useEffect(() => {
    if (userData) {
      const { token, user } = userData;
      dispatch({
        type: "auth",
        payload: {
          token,
          user_id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          user_id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        })
      );
      navigate("/");
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(state.url + "/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    login: () => {
      return fetch(state.url + "/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setShowSpinner(true);
    const loadAction = await actions[type];
    loadAction().then((data) => {
      console.log("data:", data);
      if (!data.error) {
        setShowSpinner(false);
        setUserData(data);
      } else {
        alert(`${data.error} please try again !`);
        setShowSpinner(false);
        navigate(`/auth/${type}`);
        setFormData({
          name: "",
          username: "",
          password: "",
          email: "",
        });
      }
    });
  }

  return (
    <div className="auth-container">
      <div className="banner">
        <Wave />
      </div>
      <div className="form-wrapper">
        <h1>{type.toUpperCase()}</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {type === "LOGIN" ? (
              <></>
            ) : (
              <>
                <label className="usernameLabel" htmlFor="name">
                  Name:
                </label>
                <input
                  className="usernameInput"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />
              </>
            )}
            <label className="usernameLabel" htmlFor="username">
              Username:
            </label>
            <input
              className="usernameInput"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={true}
            />

            <label className="passwordLabel" htmlFor="password">
              Password:
            </label>
            <input
              className="passwordInput"
              type="password"
              name="password"
              inputlabelprops={{
                shrink: true,
              }}
              value={formData.password}
              onChange={handleChange}
              required={true}
            />
            {type === "LOGIN" ? (
              <></>
            ) : (
              <>
                <label className="usernameLabel" htmlFor="email">
                  Email:
                </label>
                <input
                  className="usernameInput"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </>
            )}
            <Button
              className="button-submit"
              type="primary"
              shape="round"
              size="large"
            >
              {showSpinner ? (
                <Spin style={{ color: "#fff" }} indicator={antIcon} />
              ) : (
                <input
                  className="submitBtn"
                  type="submit"
                  value={type.toUpperCase()}
                />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
